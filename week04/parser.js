// 在状态机中，除了状态迁移，我们还会要加入业务逻辑
// 我们在标签结束状态提交标签token
let currentToken = null;
let currentAtttribute = null;

let stack = [{type:"document",children:[]}];
let currentTextNode = null;

function emit(token){
    // if(token.type === "text") return;
    let top = stack[stack.length - 1];

    if(token.type == "startTag"){
        let element = {
            type:"element",
            children:[],
            attributes:[]
        };

        element.tagName = token.tagName

        for(let p in token){
            if(p != "type" && p!= "tabName"){
                element.attributes.push({
                    name:p,
                    value:token[p]
                })
            }
        }

        top.children.push(element)
        element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element)
        }
        currentTextNode = null
    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!")
        }else{
            stack.pop()
        }
        currentTextNode = null
    }else if (token.type == "text") {
        if(currentTextNode == null){
            currentTextNode = {
                type:"text",
                content:""
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content;
    }
}
/*
 * 为了方便文件管理，我们把parser单独拆到文件中
 * parser接受HTML文本作为参数，返回一颗DOM树
 */
const EOF = Symbol("EOF");
// 主要的标签有：开始标签，结束标签和自封闭标签
// 在这一步我们暂时忽略属性
function data(c){
    if(c == '<'){
        return tagOpen;//无法判断是三种标签的哪一种
    }else if(c == EOF) {
        emit({
            type:"EOF"
        })
        return ;
    }else{
        emit({
            type:"text",
            content:c
        })
        return data;
    }
}
function tagOpen(c){
    if(c == '/'){//判断是不是结束标签
        return endTagOpen;
    }else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    }else {
        return ;
    }
}
function endTagOpen(c) {
    // 如果是英文字母 要么是开始标签 要么自封闭标签
    if (c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    }else if (c == ">") {
        
    }else if (c == EOF) {
        
    }else {
        
    }
}
// <tag attribute> </tag>自封闭标签
function tagName(c) {
    // 4种有效的空白符 tab符 换行符 禁止符 空格
    if (c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if (c == '/') {
        return selfCloseStartTag;
    }else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName;
    }else if (c == '>') {
        emit(currentToken)
        return data;
    }else {
        return tagName;
    }
}
function beforeAttributeName(c){
    if (c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if (c == '>' || c == '/' || c == EOF) {
        return afterAttributeName(c);
    }else if (c == '=') {
        
    }else {
        currentAtttribute = {
            name:"",
            value:""
        }
        return attributeName(c);
    }
}
function attributeName(c){
    if (c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF){
        return afterAttributeName(c);
    }else if (c == "=") {
        return beforeAttributeValue;
    }else if (c == "\u0000") {
        
    }else if (c == "\"" || c == "'" || c == "<") {
        
    }else{
        currentAtttribute.name +=c;
        return attributeName;
    }
}
function beforeAttributeValue(c){
    if (c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF){
        return beforeAttributeValue;
    }else if (c == "\"") {
        return doubleQuotedAttributeValue;//双引号
    }else if (c == "\'") {
        return singleQuotedAttributeValue;//单引号
    }else if (c ==">") {
        
    }else{
        return UnquotedAttributeValue(c);
    }
}
/*
 * 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
 * 处理属性的方式跟标签类似
 * 属性结束时，我们把属性加到标签Token上 
*/
function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAtttribute.name] = currentAtttribute.value
        return afterQutedAttributeValue;
    }else if (c == "\u0000") {
        
    }else if (c == EOF) {
        
    }else{
        currentAtttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAtttribute.name] = currentAtttribute.value
        return afterQutedAttributeValue;
    }else if (c == "\u0000") {
        
    }else if (c == EOF) {
        
    }else{
        currentAtttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
function afterQutedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if (c == '/') {
        return selfCloseStartTag;
    }else if (c == ">") {
        currentToken[currentAtttribute.name] = currentAtttribute.value
        emit(currentToken)
        return dat;
    }else if(c == EOF) {
        
    }else{
        currentAtttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAtttribute.name] = currentAtttribute.value
        return beforeAttributeName;
    }else if (c == '/') {
        currentToken[currentAtttribute.name] = currentAtttribute.value
        return selfCloseStartTag;
    }else if (c == '>') {
        currentToken[currentAtttribute.name] = currentAtttribute.value
        emit(currentToken)
        return data;
    }else if (c == "\u0000") {
        
    }else if ( c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {
        
    }else if (c == EOF) {
        
    }else{
        currentAtttribute.value += c;
        return UnquotedAttributeValue;
    }
}
function selfCloseStartTag(c) {
    if(c == '>'){
        currentToken.isSelfClosing = true;
        return data;
    }else if (c == "EOF") {
        
    }else{

    }
}
function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if (c == '/') {
        return selfCloseStartTag;
    }else if (c == '=') {
        return beforeAttributeValue;
    }else if (c == ">") {
        currentToken[currentAtttribute.name] = currentAtttribute.value
        emit(currentToken)
        return data;
    }else if (c == EOF) {
        
    }else{
        currentToken[currentAtttribute.name] = currentAtttribute.value
        currentAtttribute = {
            name:"",
            value:""
        }
        return attributeName(c);
    }
}
/*
*我们用FSM来实现HTML的分析
* 在HTML标准中，已经规定了HTML的状态
* Toy-Browser只挑选其中一部分状态，完成一个最简版本
*/
module.exports.parseHTML = function parseHTML(html) {
    // console.log(html);
    let state = data;
    for(let c of html){
        state = state(c)
    }
    // html最后有一个文件终结，文件终结位置，
    // 比如说文本节点，可能面临没有结束的这种状态
    // 需要额外给出一个字符，而且这个字符不能是任何一个有效字符
    // 创建symbol
    // 强制节点终结
    state = state(EOF)
    // console.log(stack[0]);
    return stack[0];
};