let items = JSON.parse(localStorage.getItem("items")) || [];

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function renderItems() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "item-name";
    span.textContent = item.name;

    const inputExtra = document.createElement("input");
    inputExtra.className = "item-extra";
    inputExtra.value = item.extra || "";
    inputExtra.addEventListener("input", () => {
      items[index].extra = inputExtra.value;
      saveItems();
    });

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Editar";
    editBtn.onclick = () => {
      const newName = prompt("Editar nombre:", item.name);
      if (newName) {
        const trimmed = newName.trim();
        const nameExists = items.some((it, i) =>
          i !== index && it.name.toLowerCase() === trimmed.toLowerCase()
        );
        if (!trimmed) {
          alert("El nombre no puede estar vacío.");
        } else if (nameExists) {
          alert("Este nombre ya existe.");
        } else {
          items[index].name = trimmed;
          saveItems();
          renderItems();
        }
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.onclick = () => {
      items.splice(index, 1);
      saveItems();
      renderItems();
    };

    li.appendChild(span);
    li.appendChild(inputExtra);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
  });
}

function addItem() {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();

  if (!value) {
    alert("Por favor escribe un ítem válido.");
    return;
  }

  const exists = items.some(item => item.name.toLowerCase() === value.toLowerCase());
  if (exists) {
    alert("Este ítem ya existe.");
    return;
  }

  items.push({ name: value, extra: "" });
  input.value = "";
  saveItems();
  renderItems();
}

document.getElementById("addBtn").addEventListener("click", addItem);
document.getElementById("itemInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addItem();
  }
});

window.onload = renderItems;
