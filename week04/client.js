//server文件中.on('data'里面改为body.push(chunk)或者注释on('end'里面body的赋值，要不然运行报错
const net = require("net");
const parser = require('./parser')

class Request {
    constructor(option) {
        this.method = option.method || 'GET';
        this.host = option.host;
        this.port = option.port || 80;
        this.path = option.path || '/';
        this.body = option.body || {};
        this.headers = option.headers || {};

        if (!this.headers["Content-Type"]) {// 一定要有Content-Type，否则没有办法解析
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }

        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
            //name='Midsummer'&age= 26
        }

        this.headers["Content-Length"] = this.bodyText.length;
    }
    
    /*2
        * 在Request的构造器中收集必要的信息
        * 设计一个send函数，把请求真实发送到服务器
        * send函数应该是异步的，所以返回Promise
    */
    send(connection) {
        return new Promise((resolve, reject) => {
            /*3
            *设计支持已有的connection或者自己新建connection
            *收到数据传给parser
            *根据parser的状态resolve Promise
            */
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString())
            } else {
                //如果没有传参数，就会根据构造函数里传进来的host和port，去创建一个新的TCP连接
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    //  创建连接后写入
                    connection.write(this.toString())
                })
            }
            // 监听connection的data
            connection.on('data', (data) => {
                // console.log(data.toString());
                // 把data变成字符串传给parser
                parser.receive(data.toString())
                // parser.isFinished === true 执行resolve 结束promise
                if (parser.isFinished) {
                    resolve(parser.response)
                    connection.end();
                }
            })
            // 监听connection的错误信息并结束
            connection.on('error', (err) => {
                console.log(err.toString());
                reject(err)
                connection.end()
            })
            // resolve('')
        });
    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key=>`${key}:${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
    }
}
/*4
*Response必须分段构造，所以我们要用一个ResponseParser来“装配” 
* ResponseParser分段处理ResponseText，我们用状态机来分析文本的结构
*/
class ResponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE; //当前状态
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        };
    }
    // 接收一个字符串并循环
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char) {
        if (this.current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END
            } else {
                this.statusLine += char
            }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE
            } else if (char === "\r") {
                this.current = this.WAITING_HEADER_BLOCK_END
                // node的默认值chunked 可以是多个结构
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new TrunkedBodyParser();
                }
            } else {
                this.headerName += char
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                // 改变状态 出现键值对 赋值后清空
                this.current = this.WAITING_HEADER_LINE_END
                this.headers[this.headerName] = this.headerValue
                this.headerName = ''
                this.headerValue = ''
            } else {
                this.headerValue += char
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY
            }
        } else if (this.current === this.WAITING_BODY) {
            // console.log(char);
            this.bodyParser.receiveChar(char)
        }
    }
}
/*5
 *Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
 *以TrunkedBodyParser为例，我们同样用状态机来处理body的格式
*/ 

class TrunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1; //trunk长度为零，结束
        this.READING_TRUNK = 2; //等待长度 计数
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char) {
        if (this.current === this.WAITING_LENGTH) { //155
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current === this.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH
            }
        }
    }
}

void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "3000",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: 'Midsummer',
            age: 26
        }
    })

    let response = await request.send();

    let dom = parser.parseHTML(response.body)
    console.log(dom);
}()