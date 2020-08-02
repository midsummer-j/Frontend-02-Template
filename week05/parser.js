const css = require('css');

const EOF = Symbol("EOF");

const layout = require("./layout")
// 在状态机中，除了状态迁移，我们还会要加入业务逻辑
// 我们在标签结束状态提交标签token
let currentToken = null;
let currentAtttribute = null;

let stack = [{type:"document",children:[]}];
let currentTextNode = null;

/*
 *遇到style标签时，我们把CSS规则保存起来
 *这里我们调用CSS Parser来分析CSS规则
 *这里我们必须要仔细研究此库分析CSS规则的格式
 */
// 加入一个新的函数，addCSSRules,把css规则暂存数组
let rules = [];
function addCSSRules(text){
    var ast = css.parse(text);
    // console.log(JSON.stringify(ast,null,"   "));
    rules.push(...ast.stylesheet.rules)
}
/**
 * 根据选择器的类型和元素属性，计算是否与当前元素匹配
 * 这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
 */

function match(element,selector){
    if (!selector || !element.attributes) {
        return false;
    }
    // + , > []未实现
    // 多个选择器分开
    var selectorArr = selector.match(/(#|.)?[\w]+/g);
    // 确定是多个
    if (selectorArr.length > 1) {
        // 重新走一遍match函数
        for (let i = 0; i < selectorArr.length; i++) {
            if(!match(element, selectorArr[i])){
                return false;
            }
        }
        // 不返回false
        return true;
    }

    if(selector.charAt(0) == "#"){
        var attr = element.attributes.filter(attr=>attr.name === "id")[0];
        if(attr && attr.value === selector.replace("#","")){
            return true;
        }
    }else if (selector.charAt(0) == ".") {
        var attr = element.attributes.filter(attr=>attr.name === "class")[0];
        // if(attr && attr.value === selector.replace(".","")){
        //     return true;
        // }
        if (attr) {
            return attr.value.split(" ").some((value) => {
                return value === selector.replace(".", '');
            });
        }
    }else{
        if(element.tagName === selector){
            return true;
        }
    }
    return false;
}
// 计算优先级specificationy
// [inline,id,class,tagName]
function specificity(selector){
    var p =[0,0,0,0];
    var selectorParts = []
    selector.split(" ").map((part) => {
        let parts = part.match(/(#|.)?[\w]+/g);
        for (let i = 0; i < parts.length; i++) {
            selectorParts.push(parts[i]);
        }
    });
    for (var part of selectorParts) {
        if(part.charAt(0) == "#"){
            p[1] += 1;
        }else if (part.charAt(0) == ".") {
            p[2] += 1;
        }else{
            p[3] += 1;
        }
    }
    return p;
}
function compare(sp1,sp2){
    if(sp1[0] - sp2[0]){
        return sp1[0] - sp2[0];
    }
    if(sp1[1] - sp2[1]){
        return sp1[1] - sp2[1];
    }
    if(sp1[2] - sp2[2]){
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}
/*
 *当我们创建一个元素后，立即计算CSS
 *理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
 *在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，这里我们忽略
 */
function computeCSS(element){
    /*
     *在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
     * 我们从上一步骤的stack，可以获取本元素所有的父元素
     * 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外
     */
    // 用栈构建DOM树的过程中整个stack里面存储了所有当前元素的父元素
    // slice 栈是不断变化的，随着后续解析，栈里面的元素会发生变化，可能被污染，
    // 不传参默认复制数组
    // reverse 标签匹配从当前元素往外匹配，首先获取当前元素
    // 检查一个选择器是否匹配当前元素，需要一级一级往父元素去找
    var elements = stack.slice().reverse();
    /**
     * 选择器也要从当前元素向外排列
     * 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
     */
    if(!element.computedStyle){
        element.computedStyle = {}
    }

    for(let rule of rules){
        var selectorParts = rule.selectors[0].split(" ").reverse();

        if(!match(element,selectorParts[0])){
            continue;
        }

        let matched = false;

        var j = 1;//当前选择器的位置
        for (var i = 0; i < elements.length; i++) {//当前元素的位置
            if(match(elements[i],selectorParts[j])){
                j++;
            }
            
        }
        if(j>=selectorParts.length){
            matched = true;
        }
        // specificationy优先级
        // 一旦选择匹配，就应用选择器到元素上，形成computedStyle
        /**
         * CSS规则根据specificity和后来优先规则覆盖
         * specificity是个四元组，越左边权重越高
         * 一个CSS规则的specificity根据包含的简单选择器相加而成
         */
        if(matched){
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for(var declaration of rule.declarations){
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {};
                }
                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else if(compare(computedStyle[declaration.property].specificity,sp) <= 0){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
                
            }
            // return element.computedStyle;
        }

    }
    console.log(element.computedStyle);

}
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
            if(p != "type" && p!= "tagName"){
                element.attributes.push({
                    name:p,
                    value:token[p]
                })
            }
        }
        computeCSS(element)
        top.children.push(element)
        // element.parent = top;
        

        if(!token.isSelfClosing){
            stack.push(element)
        }
        currentTextNode = null
    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!")
        }else{
            // 遇到style标签，添加css规则操作
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content)
            }
            layout(top)
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
        return selfClosingStartTag;
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
        // return afterAttributeName;
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
    if(c == "\"" || c =="\'" ){
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
        return singleQuotedAttributeValue;
        // return doubleQuotedAttributeValue;
    }
}
function afterQutedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if (c == '/') {
        return selfClosingStartTag;
    }else if (c == ">") {
        currentToken[currentAtttribute.name] = currentAtttribute.value
        emit(currentToken)
        return data;
    }else if(c == EOF) {
        
    }else{
        currentAtttribute.value += c;
        return doubleQuotedAttributeValue;
        // return beforeAttributeName(c);
    }
}
function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAtttribute.name] = currentAtttribute.value
        return beforeAttributeName;
    }else if (c == '/') {
        currentToken[currentAtttribute.name] = currentAtttribute.value
        return selfClosingStartTag;
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
function selfClosingStartTag(c) {
    if(c == '>'){
        // add
        currentToken.isSelfClosing = true;
        
        emit(currentToken);
        return data;
    }else if (c == "EOF") {
        
    }else{

    }
}
function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if (c == '/') {
        return selfClosingStartTag;
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