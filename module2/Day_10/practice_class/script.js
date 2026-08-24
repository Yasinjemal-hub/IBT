

// console.log("1 — take order");
// // this finishes LATER, after 2 seconds
// setTimeout(()=>{
//     console.log("3 - food is serve")
// },2000)
// console.log("2 — serve next customer");
// // prints: 1, 2, then 3


// const order= new Promise((resolve, rejects)=>{
//     const ok=true;
// if(ok) resolve({id:7, total:270})
// else rejects(new Error("kichen closed"))
// })

// console.log(order)


// function getOrder(id, callback){
//     setTimeout(() => {
//         callback({id, total:270})
//     }, 1000);

// }

// getOrder(7, (order)=>{
//     console.log(order.total)
// })

// getOrder(7).then(order=>{
//     console.log(order.total)
// }
    
// )
// .catch(err=>{console.log(err.message)})
// .finally(()=>{hidespiner()})

async function getdish() {
    const res= await fetch("api/data.json")

    if(!res) throw new Error("HTTP" + res.status)

    const data= await res.json()

    return data
}

console.log(getdish())


const list=document.querySelector("#menu")

async  function display(){
 list.textContent="reload the page..."
 list.innerHTML="";

 const dishes=await getdish()

 dishes.forEach(d => {
    const div=document.createElement("div")
    div.classList.add("card")
    console.log(div)

    div.innerHTML=`
     <h3>${d.name}</h3>
     <p>${d.price}</p>

    ` 
list.append(div)
 });

}

display()