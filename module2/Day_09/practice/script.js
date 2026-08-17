// by id — one element
const list = document.getElementById("list");
// CSS selector — FIRST match
const title = document.querySelector("h1");
const first = document.querySelector(".item");
// CSS selector — ALL matches (NodeList)
const items =
document.querySelectorAll(".item");
items.length; //

//reding content and value

const h1 = document.querySelector("h1");
h1.textContent; // "Addis Market"
// form field value
const input = document.querySelector("#qty");
input.value; // "3" (always a string!)
Number(input.value); // 3
// attributes & data-*
const li = document.querySelector(".item");
li.getAttribute("class"); // "item"
li.dataset.id; // data-id="7"