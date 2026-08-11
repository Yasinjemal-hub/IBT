// function greet(...param){
//  console.log(`hi ${params}`)
// }

// greet() function declaration

// const greet=function greet(...param){
//  console.log(`hi ${params}`)
// }

// greet() function exprssion

//parameter is placeholder

//rest is operater parameter define .... with array []

// //declaration
// function fun(){
//     console.log("hello")
// }

// // expression
// const name=function fun(){
//     console.log("hello")
// } 

//arrow

// const arr=(x)=> x*15
// arr()

// console.log(arr(3))

// function makeGreeter(city) {
// // inner function "closes over" city
// return function (name) {
// return `Selam ${name}, from ${city}`;
// };
// }
// const addis = makeGreeter("Addis Ababa");
// addis("Almaz")
// console.log(addis("Almaz"))

// function makeQueue() {
// let number = 0; // private
// return {
// next() { number++; return number; },
// current() { return number; },
// };
// }
// const bank = makeQueue(); // CBE counter
// bank.next(); // 1 (Almaz)
// bank.next(); // 2 (Dawit)
// bank.current(); // 2

// function mukera(){
//  let num=3

// return function mchmer( x=1){
//  console.log(x+=num)
// }

// }

// const wetet=mukera()
// wetet()


// function myfun(num1, num2, fun){
//  return fun(num1,num2)
// }

// const adder=(num1,num2)=> num1 + num2



// console.log(myfun(35,67,adder))

const subtotal=(...price)=>{
    let total=0;
    for(price of prices){
        total+=price
    }
    return total
}

const discountby=(rate)=>{
    return price * rate
}

const withVat =(n)=>{
    return n *1.15
}

const toETB=(n)=>{
    return n.toFixed(2)
}

function makeReceiptMaker(){
    let orderNo=0;
    const memeberoff=discountby(0.1)

    return function(...item){
        orderNo++
        subtotal()
    }
}
