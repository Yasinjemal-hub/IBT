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