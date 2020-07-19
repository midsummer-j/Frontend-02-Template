let plusMinus = 1;
let af = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
}
// 字符串转数字
function stringToNumber(s) {
    // 正负判断,去除空格，将大写转为小写 
    let str = plus(s).trim().toLowerCase()
    if (!str) {
        // 不为空
        return NaN;
    } else if (typeof str !== 'string') {
        // 非字符串
        return '非字符串！';
    } else if ((/^\d*$/).test(str)) {
        // 纯数字 清除前面的0后 返回
        return clearStart0(str) * plusMinus
    } else if (str.startsWith('0b')) {

        let repStr = str.replace('0b', '')
        // 二进制每个数字小于2
        if (/^[0-1]*$/.test(repStr)) {
            let after = clearStart0(repStr) + '';
            let num = 0
            for (let i = 0; i < after.length; i++) {
                num += after[i] * 2 ** (after.length - i - 1);
            }
            return num * plusMinus;
        } else {
            return NaN;
        }
        // return /^[0-1]*$/.test(repStr) ;
    } else if (str.startsWith('0o')) {
        let repStr = str.replace('0o', '')
        // 8进制
        if (/^[0-7]*$/.test(repStr)) {
            let after = clearStart0(repStr) + '';
            let num = 0
            for (let i = 0; i < after.length; i++) {
                num += after[i] * 8 ** (after.length - i - 1);
            }
            return num * plusMinus;
        } else {
            return NaN;
        }
    } else if (str.startsWith('0x')) {
        let repStr = str.replace('0x', '')
        // 16进制
        if (/^[0-9a-f]*$/.test(repStr)) {
            let after = clearStart0(repStr) + '';
            let num = 0
            for (let i = 0; i < after.length; i++) {
                if (af[after[i]] === void 0) {
                    num += after[i] * 16 ** (after.length - i - 1);
                } else {
                    num += af[after[i]] * 16 ** (after.length - i - 1);
                }

            }
            return num * plusMinus;
        } else {
            return NaN;
        }
    } else if (/^[0-9.e+-]*$/.test(str)) {

        let e = str.match(/e/g)
        let d = str.match(/\./g)
        let sum = str.match(/\+/g)
        let sub = str.match(/\-/g)
        // plusMinus = plus(str)
        if (e && e.length === 1 && str[0] !== 'e' && str[str.length - 1] !== 'e') {
            let chars = str.split('e')
            let num = 0
            if (chars[1][0] === '-') {
                num = retrunNum('-', chars)
            } else {
                num = retrunNum('+', chars)
            }
            return num * plusMinus;
        } else if (d && d.length === 1 && str[0] !== '.' && str[str.length - 1] !== '.') {
            return str * plusMinus
        }
        // return e;
    }
}
//科学计数法后是正或者负
function retrunNum(type, chars) {
    if (type === '+') {
        return chars[0] * 10 ** chars[1].replace('+', '')
    } else {
        return chars[0] / 10 ** chars[1].replace('-', '')
    }
}
// 清除进制后的0
function clearStart0(newStr) {
    if ((/^\d*$/).test(newStr)) {
        return +newStr;
    } else {
        return newStr;
    }

}
// 判断正负
function plus(str) {
    if (str[0] === '+') {
        plusMinus = 1
        return str.substr(1);
    } else if (str[0] === '-') {
        plusMinus = -1
        return str.substr(1);
    } else {
        plusMinus = 1
        return str;
    }
}
// 数字转字符串
function numberToString(s) {
    if (typeof s === 'number') {
        return s + '';
    } else {
        return '非数字！';
    }
}
console.log(stringToNumber('00001')) // should print 1
console.log(stringToNumber(' ')) // 52
console.log(stringToNumber('-98')) // -98
console.log(stringToNumber('0086')) // 86
console.log(stringToNumber('-0')) // -0
console.log(stringToNumber('-0O76')) // -62
console.log(stringToNumber('0x35')) // 53
console.log(stringToNumber('0B111101')) //61
console.log(stringToNumber('12.5')); //-12.5
console.log(stringToNumber('-12.5e-5')); //-0.000125