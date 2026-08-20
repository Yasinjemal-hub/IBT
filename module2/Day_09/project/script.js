
const items=[]
const nameIn=document.querySelector("#name")
const form=document.querySelector("#add-item")




form.addEventListener("submit", (e) => {
e.preventDefault();
const name = nameIn.value.trim();
if (!name) return;
items.push({ id: Date.now(), name,
done: false });
nameIn.value = "";
render()
})

function render() {
list.innerHTML = "";
items.forEach(it => {
const li = document.createElement("li");
li.textContent = it.name;
li.dataset.id = it.id;


if (it.done) li.classList.add("done");
const x = document.createElement("button");
x.textContent = "x"; x.className = "del";
console.log(x)
li.append(x); list.append(li);
});
count.textContent = items.length + " items";
}

const list=document.querySelector("#list")


list.addEventListener("click", (e) => {
const li = e.target.closest("li");
const id=Number(li.dataset.id)

if (e.target.matches(".del")) {
items = items.filter(i=> i.id !==id);
}

else {
const it = items.find(i => i.id === id);
it.done = !it.done; // toggle
}
render()
})