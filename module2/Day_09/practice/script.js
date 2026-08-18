    // // list.innerHTML=''
    //     console.log(list)

    // const title=document.querySelector("h1")
    // title.classList.add("wake")
    // title.style.backgroundColor="grey"
    // console.log(title)

    // // const changeTitle=title.textContent="yasin"
    
    
    // // console.log(changeTitle)


    // const li=document.createElement("li")

    // li.textContent="test"
    // li.classList.add="item"
    // li.dataset.id="12"

    // list.prepend("li")


    // console.log(li)


    

    //  const items=document.querySelector(".item")
    //  console.log(items)

    
//  const cart=[{name:"shiro", qty:8},{name:"teff", qty:9}]

//  function render(){
//  const list=document.querySelector("#list")

//     list.innerHTML= ""; // clear 
//     cart.forEach(item=>{  //loop
//         const li=document.createElement("li")  // creat element
//         li.textContent=`${item.name} * ${item.qty}` //add cintent

        

//     list.append(li)  //add on the list 
//     })
//  }

// render() // call back

// const btn=document.querySelector("#add")

// console.log(btn)

// btn.addEventListener("click", (e)=>{
//     console.log("clciked")
//     e.target
// })


const list = document.querySelector("#list");
list.addEventListener("click", (e) => {
const li = e.target.closest("li");
if (!li) return;
const id = li.dataset.id;
removeItem(id); // act on that row
});