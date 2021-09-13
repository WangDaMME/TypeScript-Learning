// 1. 数组Array 与 元组

let arr1 : number[] = [1,2,3]; 
let arr2 : Array<number> = [1,2,3,4] ; // 方法2 . 泛型 Generics 填充 Array 中element 的类型
//let arr2 : Array<number> = [1,2,"3",4] ; // 不行了 “3”

// 混用
let arr3 = [1,"aaa"];
let arr4: any[] = [1,"aaa"];


// Tuple 元组 类型 ts 提供， js 没有
// 类型 定义了 类型不能改 长度不能改

let person : [string, number] = ["alex", 18]
// person[1] = "ddd" // 类型冲突



//2. Union  联合类型 & 文献类型Literal
let union : string | number;
union = 2;
union ="asda";

// union = true; // 不对

let union2 : string | number | boolean | string[] | number[] 


function merge(n1: string | number , n2: string |number)
{
    if (typeof n1 === "string" || typeof n2 === "string")
        return n1.toString() + n2.toString(); // concat
    else
        return n1 + n2; //确定是数字
}

let mergeNumber1 = merge(2,5)
let mnergeString = merge("hello ","world")

// 取值范围 联合
let union3 : 0|1|2 ;// --> literal 字面量类型


const number3 = 3; // 他的类型 就是3 并不是number，而是number中的数字3


// literal 字面量 顾名思义 就是按自己字面写的 定义出来的类型
// 这里 resulttype： 就是按 字面literal 定义
function merge2(n1: string | number , n2: string |number, resultType: "as-number" | "as-string")
{
    // 选了 as-string 都按concat 处理
    if(resultType === "as-string"){
        return n1.toString() + n2.toString();
    }
    if (typeof n1 === "string" || typeof n2 === "string")
        return n1.toString() + n2.toString(); // concat
    else
        return n1 + n2; //确定是数字
}


console.log(merge2(1,2,"as-string"));



// Enum 枚举类型
enum Color
{
    red =5,     //默认值 为 0，改为5 后面就是5，6，7
    green,   //默认值 为 1
    yellow   //默认值 为 2
}

console.log(Color.green) ; 

enum Color2
{
    red = 5,
    green = "ggg",
    yellow = 1.2 // 不行： [1,2,3], true/false 不允许 computed values
}



// 3. Any & Unknown

// 3.1 any
let randomVal : any  = 6;
randomVal = true
randomVal = {} ; // object
randomVal() ; //可以是 function
randomVal.toUpperCase(); //调用inbuilt 函数 compile 不会报错 但是 会有runtime error

//3.2 unknown
let randomVal2 : unknown  = 6; // 不保证类型
randomVal2 = true
randomVal2 = {} ; // object

/** 下面报错 unknown: 不保证类型， 但是保证类型安全  当前确定了变量类型才能使用 */
// randomVal2() ; //可以是 function
// randomVal2.toUpperCase(); //调用inbuilt 函数 compile 不会报错 但是 会有runtime error

if(typeof randomVal2 ==='function') 
{
    randomVal2()
}

if(typeof randomVal2 === 'string') randomVal2.toUpperCase()

// 4. void , undefined, never

// 所有 void vs undefined , 
// void: 压根不存在
// undefined: 有，但没经过初始化

function printResult() : void  // 默认void
{
    console.log("xxx")
}
function printResult2() : undefined  // 默认void
{
    console.log("xxx")
    return  ; //加一个return就好了
}

// never ：一个函数 永远执行不完， usecases: throw, / while 死循环

function throwError(message: string , errorCode : number) : never // 类型为never 永远执行不完
{
    throw {
        message,
        errorCode
    }
}   

throwError("not found", 404);

function whileLoop()
{
    while(true)
    {
        console.log("haha")
    }
}


//5. 类型适配 (类型断言) Type Assertions

let message : any;

message = "abc";
message.endWith("c"); // 编译器没有内置函数的匹配

// 方法1. （<强转> 适配） 圆括号 圈起来
let dd = (<string> message).endsWith("c"); // （<强转> 适配） 圆括号 圈起来
// 方法2. as 关键字
let dd2 = (message as string).endsWith("c");


//6. 函数类型

// 1.可以给形参 绑定类型
let fLog1 = function(message : string)
{
    console.log(message)
}
let fLog2 = ()=>     // es6 emascript 引入 箭头函数
{
    console.log(message)
}

// 6.2 可以用 "?" 表示参数的 可选性

let fLog3 = (nessage: string , code?: number, status: number =0)=> // status默认值为0
{
    console.log(message)
}
fLog3("httpOk")



//7. Object 对象类型 
// 类型就是自己， 而且会 自动匹配 key的 类型, eg. age: number
const student = { // : object
    firstname : "xiao",
    lastname : "ming",
    age: 18
}

// console.log(student.nickname) // 【报错】 调用一个不存在的key 不会报错, 但是 typescript 更安全 所以会在compile 报错


//7.2 【显示定义 object 类型】
const studentB : {
    firstname : string,
    lastname : string,
    age: number

} ={
    firstname : "aaa",
    lastname : "bbb",
    age: 8
}


//8. Interface 
interface Point{
    x: number;
    y: number;
}

let drawPoint = (point: Point) =>{
    console.log( {x: point.x , y: point.y}) //x ， y 是point 2个属性
}

//问题 是 可以传入不相关的逻辑
drawPoint( {x:105, y:24})
// drawPoint( {x:"你", y:"好"})  // 报错
// drawPoint( {weather: "干燥", temperature:"5 celcius"})  // 报错

// 面对对象接口 来对 point 加以限制



// 9. class 封装 -> implements interface

interface IPoint
{
    x: number;
    y: number;
    drawPoint: ()=> void; // 函数类型 返回值 为void  （）里为形参类型
    getDistance : (p:IPoint) => number; // （）: 传入一个point  返回number 和另一个点的距离
}

// 实现接口
class Point implements IPoint
{
    x: number;
    y: number;

    // constructor 构造函数
    constructor(x: number, y: number)  // x?: number 可选项
    {
        this.x = x;
        this.y = y;
    }


    // override 方法
    drawPoint = ()=>{
        console.log("x: ", this.x, " y: ", this.y);
    }

    getDistance = (p:IPoint) =>{
        return Math.pow(p.x - this.x,2) + Math.pow(p.y - this.y,2);
    }
}

const p1 = new Point( 2,3); // 是一个instance
// 初始化 x , y   ----> construtor 函数
// p1.x = 2;
// p1.y = 3;
p1.drawPoint() ; // 调用
