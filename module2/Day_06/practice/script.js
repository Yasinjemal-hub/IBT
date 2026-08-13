// a price that stays fixed
const vatRate = 0.15; // 15% VAT
// a running total that changes
let basketTotal = 0;
basketTotal = 480; // ETB
//vatRate = 0.10; // ✗ TypeError: const

//ptimitive types
const city = 'Addis Ababa'; // string
const price = 480; // number
const inStock = true; // boolean
let chosen; // undefined
const middle = null;

//converter and inspecting

typeof 480; // "number"
typeof 'birr'; // "string"
// input from a form is ALWAYS a string
const raw = '480'; // from <input>
Number(raw) + 20; // 500 ✓
raw + 20; // '48020' ✗
String(480); // "480"
Boolean(0); // false

//falsy& truth 
// === checks value AND type (use this)
480 === 480; // true
480 === '480'; // false ✓ correct
// == coerces first (avoid)
480 == '480'; // true ✗ surprising
if (basketTotal) {
    if(!0){
        console.log("run")
    }
    else{
        console.log("not run")
    }
}

//operator and assignment

let total = 480;
total += 120; // total = total + 120
total -= 50; // 550
total *= 2; // 1100
const vat = total * 0.15; // 165
console.log(vat)

let sum=450
sum+=200
sum-=40
sum*=4
const result=sum * vat

console.log(result)

//comparison and logical operator

const tota = 1200; // ETB
const isMember = true;
// free delivery over 1000 OR member
const freeDelivery =
total >= 1000 || isMember; // true
const bigMember = total > 1000 && isMember;

//template literal

const name = 'Almaz';
const tot = 480;
// old way — clumsy + joins
'Hi ' + name + ', pay ' + tot + ' ETB'
// template literal — readable
console.log(`Hi ${name}, pay ${tot} ETB`)
// "Hi Almaz, pay 480 ETB

//ternary operator

const to = 1200;
// if / else — four lines
let fee;
if (to >= 1000) { fee = 0; }
else { fee = 60; }
// ternary — one line
const fee2 = to >= 1000 ? 0 : 60;

//bracnhing if /else

const score = 74; // module mark
if (score >= 70) {
console.log("Pass — progress");
} else if (score >= 50) {
console.log("Remedial plan");
} else {
console.log("Retake the module");
}

//switch for many case

switch (method) {
case 'telebirr':
fee = total * 0.005;
break;
case 'cbebirr':
case 'awash': // fall-through
fee = total * 0.01;
break;
default:
fee = total * 0.02;
}