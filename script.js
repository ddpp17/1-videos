const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");

let items = JSON.parse(localStorage.getItem("items")) || [];

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function renderItems(focusLast = false) {
  itemList.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.className = "item-name";
    nameSpan.textContent = item.name;

    const extraInput = document.createElement("input");
    extraInput.className = "item-extra";
    extraInput.type = "text";
    extraInput.value = item.extra;
    extraInput.placeholder = "Dato extra";

    extraInput.addEventListener("input", () => {
      items[index].extra = extraInput.value;
      saveItems();
    });

    extraInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        extraInput.blur();
        itemInput.focus();
      }
    });

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => {
      const newName = prompt("Editar nombre del ítem:", item.name);
      if (newName !== null && newName.trim() !== "") {
        items[index].name = newName.trim();
        saveItems();
        renderItems();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => {
      items.splice(index, 1);
      saveItems();
      renderItems();
    });

    li.appendChild(nameSpan);
    li.appendChild(extraInput);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
  });

  if (focusLast && items.length > 0) {
    // Enfocar el input extra del último ítem
    const lastExtra = itemList.querySelectorAll(".item-extra");
    if (lastExtra.length > 0) {
      lastExtra[lastExtra.length - 1].focus();
    }
  }
}

addBtn.addEventListener("click", () => {
  const name = itemInput.value.trim();
  if (name !== "") {
    items.push({ name, extra: "" });
    itemInput.value = "";
    saveItems();
    renderItems(true); // enfocar input extra
  }
});

itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click(); // esto ya enfoca el input extra
  }
});

renderItems();
