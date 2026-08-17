// by id — one element
const list = document.getElementById("list");
// CSS selector — FIRST match
const title = document.querySelector("h1");
const first = document.querySelector(".item");
// CSS selector — ALL matches (NodeList)
const items =
document.querySelectorAll(".item");
items.length; //