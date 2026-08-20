const search1 = document.querySelector("#search");
const menu1 = document.querySelector("#menu");

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

  state.dishes.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("dish"); // Removed period
   console.log(div)
    div.innerHTML = `
      <h3>${d.name}</h3> <!-- Fixed quote -->
      <p>${d.category}</p>
      <p>${d.price}</p>
      <p>${d.spicy}</p>
      <button>add</button> 
    `;
    menu1.append(div);
  });
  // Removed recursive display() call from here
}

// Call loadMenu on page load
loadMenu();