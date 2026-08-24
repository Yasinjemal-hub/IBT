// const { json } = require("node:stream/consumers")


// localStorage.setItem("name","yasin"
// )

// const get=localStorage.getItem("name")
// console.log(get)

// const select=document.querySelector("#dark")

// console.log(select)

// const saved=localStorage.getItem(select)
// if(saved) select.value=saved

// console.log(saved)

// select.addEventListener("change", () => {
// localStorage.setItem("theme", select.value);
// });

// const order={
// "name": "Almaz",
// "city": "Addis Ababa",
// "cart": ["Doro Wat", "Shiro"],
// "total": 360,
// "member": true
// }


// const text=JSON.stringify(order)

// console.log(text)

// const object=JSON.parse(text)

// console.log(object)

const cart=["dorowet","tibs"]

const select=localStorage.setItem("cart",JSON.stringify(cart))

const raw=localStorage.getItem("cart")

raw ? JSON.parse(raw):[]