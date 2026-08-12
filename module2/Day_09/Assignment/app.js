// TODO: Hold items in an array (this is your single source of truth)
let items = [];

// TODO: Select necessary DOM elements (form, input, list, count)
const addForm = document.getElementById('add-form');
const nameInput = document.getElementById('name');
const listElement = document.getElementById('list');
const countElement = document.getElementById('count');

// TODO: Write a render() function to rebuild the list from the array
function render() {
  // 1. Clear the current list
  listElement.innerHTML = '';

  // 2 & 3. Loop through items array, create elements with data-id, and append
  items.forEach((item) => {
    const li = document.createElement('li');
    li.dataset.id = item.id;

    if (item.done) {
      li.classList.add('done');
    }

    const textSpan = document.createElement('span');
    textSpan.textContent = item.name;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('del');

    li.appendChild(textSpan);
    li.appendChild(delBtn);
    listElement.appendChild(li);
  });

  // 4. Update the live count paragraph
  const total = items.length;
  countElement.textContent = `${total} ${total === 1 ? 'item' : 'items'}`;
}

// TODO: Handle form submission
addForm.addEventListener('submit', (e) => {
  // 1. Prevent default to stop page reload
  e.preventDefault();

  // 2. Read and validate the input
  const text = nameInput.value.trim();
  if (!text) return;

  // 3. Push a new object to the items array
  items.push({
    id: Date.now().toString(),
    name: text,
    done: false
  });

  // Reset input field and call render()
  nameInput.value = '';
  // 4. Call render()
  render();
});

// TODO: Set up event delegation on the #list
// 1. Listen for clicks on the parent <ul>
listElement.addEventListener('click', (e) => {
  // 2. Use e.target and closest() to find the clicked row
  const row = e.target.closest('li');
  if (!row) return;

  const targetId = row.dataset.id;

  // 3 & 4. Determine action and update the items array
  if (e.target.classList.contains('del')) {
    items = items.filter((item) => item.id !== targetId);
  } else {
    const item = items.find((item) => item.id === targetId);
    if (item) {
      item.done = !item.done;
    }
  }

  // 5. Call render()
  render();
});