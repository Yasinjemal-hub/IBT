

console.log("1 — take order");
// this finishes LATER, after 2 seconds
setTimeout(()=>{
    console.log("3 - food is serve")
},2000)
console.log("2 — serve next customer");
// prints: 1, 2, then 3


const order= new Promise((resolve, rejects)=>{
    const ok=true;
if(ok) resolve({id:7, total:270})
else rejects(new Error("kichen closed"))
})

console.log(order)


