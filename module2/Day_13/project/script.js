const search1 = document.querySelector("#search");
const menu1 = document.querySelector("#menu");
const cartContainer = document.querySelector("#cart");

const state = {
  dishes: [],
  cart: [],
  Search: ""
};

async function loadMenu() {
  menu1.textContent = "Loading menu…";
  try {
    const res = await fetch("data/menu.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.dishes = await res.json();
    display();
  } catch (err) {
    menu1.textContent = "Could not load the menu.";
  }
}

function display() {
  menu1.innerHTML = '';
  
  const term = state.Search.trim().toLowerCase();
  
  const shown = state.dishes.filter(d =>
    d.name.toLowerCase().includes(term) ||
    d.category.toLowerCase().includes(term)
  );

  shown.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("dish");
    div.dataset.id = d.id; // Added missing dataset ID

    div.innerHTML = `
      <h3>${d.name}</h3>
      <p>${d.category}</p>
      <p class="price">${d.price} ETB</p>
      <p>${d.spicy ? "🌶️ Spicy" : "🌱 Mild"}</p>
      <button class="add">Add</button> 
    `;
    
    menu1.append(div);
  });
}

// Added missing search listener
search1.addEventListener("input", (e) => {
  state.Search = e.target.value;
  display();
});

menu1.addEventListener("click", (e) => {
  if (!e.target.matches(".add")) return;

  const id = Number(e.target.closest(".dish").dataset.id);

  const dish = state.dishes.find(d => d.id === id);
  if (!dish) return;

  const line = state.cart.find(i => i.id === id);
  if (line) {
    line.qty++;
  } else {
    state.cart.push({ ...dish, qty: 1 });
  }
  save()
  renderCart(); 
});

// Added missing renderCart function
function renderCart() {
  if (!cartContainer) return;

  if (state.cart.length === 0) {
    cartContainer.innerHTML = "<p>Your Order is empty</p>";
    return;
  }

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartContainer.innerHTML = `
    <h3>Your Order</h3>
    ${state.cart.map(item => `
      <p>${item.name} x ${item.qty} - ${item.price * item.qty} ETB</p>
    `).join("")}
    <hr>
    <p><strong>Total: ${total} ETB</strong></p>
  `;
}
cartContainer.addEventListener("click", (e) => {
if (!e.target.matches(".rm")) return;
const id = Number(e.target.closest("li").dataset.id);
state.cart = state.cart.filter(i => i.id !== id);
save(); render();
});

function save() {
localStorage.setItem("addiseats",
JSON.stringify(state.cart));
}
console.log(save())


function load() {
const s = localStorage.getItem("addiseats");
if (s) state.cart = JSON.parse(s);
}

console.log(load())
loadMenu();