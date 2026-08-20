console.log("1 — take order");
// this finishes LATER, after 2 seconds
setTimeout(()=>{
    console.log("3 - food is serve")
},2000)
console.log("2 — serve next customer");
// prints: 1, 2, then 3
