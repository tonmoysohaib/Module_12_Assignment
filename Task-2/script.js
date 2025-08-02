let todos = [];

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("todos");
  if (saved) {
    todos = JSON.parse(saved);
    renderTodos();
  }
});

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputText = input.value.trim();
  if (inputText !== "") {
    let todoObject = {
      text: inputText,
      completed: false
    };

    todos.push(todoObject);
    input.value = "";
    saveToLocalStorage();
    renderTodos();
  }
  else {
    alert("Please enter a Task to do.");
  }
});

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
};

function renderTodos() {
  list.innerHTML = "";

  let pendingCount = todos.filter(todo => !todo.completed).length;
let completedCount = todos.filter(todo => todo.completed).length;
document.getElementById("pending-count").textContent = pendingCount;
document.getElementById("completed-count").textContent = completedCount;
  

  todos.forEach((todo, index) => {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    


    // Text Display
    let spanForText = document.createElement("span");
    spanForText.className="form-check";
    let checkBox= document.createElement("input");
    checkBox.className="form-check-input";
    checkBox.type="checkbox";
    spanForText.textContent = todo.text;
    if(todo.completed==true){
      checkBox.checked = true;
      spanForText.style.textDecoration='line-through';
    }else{
      checkBox.checked = false;
      spanForText.style.textDecoration='none';
    }

    checkBox.addEventListener("change",function(){
      if(this.checked){
        spanForText.style.textDecoration='line-through';
        todos[index].completed = true;
      }else{
        spanForText.style.textDecoration='none';
        todos[index].completed = false; 
      }
      saveToLocalStorage();
      renderTodos();
    });

    // Action Buttons Container
    let span = document.createElement("span");
    span.className = "btn-group";

    // UPDATE/SAVE Button
    let btnUpdate = document.createElement("button");
    btnUpdate.className = "btn btn-success";
    btnUpdate.textContent = "UPDATE";

    // DELETE Button
    let btnDelete = document.createElement("button");
    btnDelete.className = "btn btn-danger";
    btnDelete.textContent = "DELETE";

    // Append buttons
    spanForText.appendChild(checkBox);
    span.appendChild(btnUpdate);
    span.appendChild(btnDelete);

    // Handle DELETE
    btnDelete.addEventListener("click", () => {
      todos.splice(index, 1);
      saveToLocalStorage();
      renderTodos();
    });

    // Handle UPDATE/SAVE
    btnUpdate.addEventListener("click", () => {
      if (btnUpdate.textContent === "UPDATE") {
        // Change button to SAVE
        btnUpdate.textContent = "SAVE";

        // Replace span text with input field
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = todos[index].text;
        editInput.className = "form-control me-2";
        li.insertBefore(editInput, spanForText);
        li.removeChild(spanForText);
      } else {
        // Save changes
        const newText = li.querySelector("input").value.trim();
        if (newText !== "") {
          todos[index].text = newText;
        }

        // Re-render list
        saveToLocalStorage();
        btnUpdate.textContent = "UPDATE";
        renderTodos();
      }
    });

    li.appendChild(spanForText);
    li.appendChild(span);
    list.appendChild(li);
  });
}
