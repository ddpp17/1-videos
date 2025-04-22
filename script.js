const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");

let items = JSON.parse(localStorage.getItem("items")) || [];

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function renderItems() {
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

    // Presionar Enter en input extra agrega y enfoca al input principal
    extraInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        extraInput.blur(); // guardar el cambio
        itemInput.focus(); // volver al input principal
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
}

addBtn.addEventListener("click", () => {
  const name = itemInput.value.trim();
  if (name !== "") {
    items.push({ name, extra: "" });
    itemInput.value = "";
    saveItems();
    renderItems();
  }
});

// Agregar con Enter
itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

renderItems();
