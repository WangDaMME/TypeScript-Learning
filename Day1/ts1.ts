// var button = document.querySelector("button");
// var num1 = document.getElementById("num1");
// var num2 = document.getElementById("num2");

// function add(num1, num2)
// {
//     return num1.value + num2.value;
// }

// button.addEventListener("click", function(){
//     console.log(add(num1, num2));
// })


// js 改成 ts

var button = document.querySelector("button");
var num1 = document.getElementById("num1") as HTMLInputElement; // 确保代码准确性 eg. getElementById("num3")  num3 没有 就会 得到null 结果
var num2 = document.getElementById("num2") as HTMLInputElement;

function add(num1 : number, num2: number)
{
    return num1 + num2;
}

button.addEventListener("click", function(){  // 也可以把function 换成箭头函数 ()=>{}
    console.log(add( +num1.value, +num2.value));  // 字符串转换位数  parseInt  或者 + 的方法
})


// tsc ts1.js  编译