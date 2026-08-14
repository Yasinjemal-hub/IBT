//creating and accessing array

const menu = ['Doro Wat', 'Tibs', 'Shiro'];
menu[0]; // "Doro Wat" (zero-based)
menu.length; // 3
menu[menu.length - 1]; // last item
menu.push("Firfir"); // add to end
menu.pop(); // remove from end
menu.includes("Tibs"); // true
menu.indexOf("Shiro"); // 2
menu.shift()
menu.unshift("karya")
console.log(menu)

// map method 
const prices = [120, 200, 160]; // ETB
// add 15% VAT to each — returns a NEW array
const withVat = prices.map(p => p * 1.15);
// [138, 230, 184]
// build labels for the screen
const labels = menu.map(d => ` ${d}`);

console.log(withVat)
console.log(labels)

const name=["yasin", "ebarhim", "mahir", "amira"]
const father="wake"
const fnmae=name.map((n)=> n + " " + father )

console.log(fnmae)

//filter and find 
const dishes = [
{ name: "Tibs", price: 200, veg: false },
{ name: "Shiro", price: 120, veg: true },
{ name: "Misir", price: 110, veg: true },
];
// keep items where the test is true
dishes.filter(d => d.veg); // 2 items
dishes.filter(d => d.price < 150);
// first match only
dishes.find(d => d.name === "Shiro");
const price = [120, 200, 160];
// fold a list into ONE value
const total = price.reduce(
(sum, p) => sum + p, 0); // 480

//reduce method

const p = [120, 200, 160];
// fold a list into ONE value
const t = p.reduce(
(sum, p) => sum + p, 0); // 480\

console.log(t)

const age=[22,19, 14, 8]

const totalAge=age.reduce((sum,a)=> sum+=a,0)

console.log(totalAge)

// methods return arrays → chain them
let chain=dishes.filter(d => d.veg)
.map(d => d.price)
.reduce((s, p) => s + p, 0)

console.log(chain)

// object method

const customer = {
name: "Almaz Bekele",
phone: "+251911234567",
city: "Addis Ababa",
member: true,
};
customer.name; // dot access
customer["phone"]; // bracket access
customer.member = false; // update
customer.email = "a@x.et"; // add key

console.log(customer)

//method and this

const account = {
owner: "Dawit",
balance: 5000, // ETB
deposit(amount) {
this.balance += amount;
return this.balance;
},
};
account.deposit(1500); //

const cbe={
    name: "yasin",
    acc_no:"1000595415539",
    balance: 200000,
    withdrawel(amount){
      this.balance-=amount
      return this.balance
    }
}

let current=cbe.withdrawel(30000);
console.log(current)

//
