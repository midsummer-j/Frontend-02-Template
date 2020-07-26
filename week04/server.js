const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error',(err) => {
        console.error(err);
    }).on('data',(chunk) =>{
        body.push(chunk)
    }).on('end',()=>{
        body = Buffer.concat(body).toString();
        // console.log('body:',body)
        response.setHeader('Content-Type','text/html');
        response.setHeader('X-Foo','bar');
        response.writeHead(200,{'Content-Type':'text/plain'});
        // <div style='width:200px;height:200px;background:red'>123</div>
        response.end(
`<html maaa=a >
<head>
    <style>
    body div #container{
        width: 100px;
        background-color: #ff0000;
    }
    body div img{
        width: 30px;
        background-color: #ff1111;
    }
    </style>
</head>
<body>
    <div>
        <img id="container" />
        <img />
    </div>
</body>
</html>`)
    })
}).listen(3000);
    
console.log('server started');
/*1
* 设计一个HTTP请求的类
* content type是一个必要的字段，要有默认值
* body是KV格式
* 不同的content-type影响body的格式
*/