// // declare and calling a function
// // define once
// function addVat(amount) {
// return amount * 1.15; // 15% VAT
// }
// // call many times
// addVat(480); // 552
// addVat(1000); // 1150


// function sum(num){
//  return num + 30
// }

// console.log(sum(80))
// console.log(sum(70))

// // function declaration & expression with hioisted
// // declaration — hoisted, callable above
// greet(); // ✓ works
// function greet() {
// return "Selam!";
// }

// // expression — NOT hoisted
// const greet = function () {
// return "Selam!";
// };
// greet(); // call AFTER the line

// parameter defualt $ reset

// default value when none passed
function deliveryFee(total, rate = 0.05) {
return total * rate;
}
deliveryFee(1000); // 50 (uses 0.05)
deliveryFee(1000, 0.10); // 100
// rest — collect many args into an array
function totalBill(...prices) {
let sum = 0;
for (const p of prices) sum += p;
return sum;
}
; // 480
console.log(totalBill(120, 200, 160))

function totalpay(...pays){
    let sum=0;
    for(const p of pays)
        sum +=p;
        return sum
  

}

console.log(totalpay(200,760,780))

// arrow function