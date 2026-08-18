
const items=[]
const nameIn=document.querySelector("#name")
const form=document.getElementById("add-item")

console.log(nameIn)

form.addEventListener("click",(e)=>{
    e.preventDefault()
  const nameInput=nameIn.value.trim()

  if(!nameInput=='') return;
      items.push({id:Date.now(),nameInput,done:false})
  nameIn.value=""


render()


})

function render(){
const lists=document.querySelector("#list")
const count=document.getElementById("count")

lists.classList='';

items.forEach((it)=>{
const li=document.createElement("li");


li.textContent= it.nameInput
li.dataset.id=it.id

if(it.done) li.classList.add("done")

const x=document.createElement("button")

x.textContent='x' ,x.className='del'

lists.append(li)
lists.append(x)

})

count.textContent=items.length + "items"


}