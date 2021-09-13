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