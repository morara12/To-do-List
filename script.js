document.addEventListener("DOMContentLoaded", loadTodos);

const btn = document.getElementById("btn");
const textarea = document.getElementById("Textarea");
const errorText = document.getElementById("error-text");

let todoList = JSON.parse(localStorage.getItem("Todo")) || [];

btn.addEventListener("click", addTodo);

// ＜文言を記載しボタンでクリック後、タスク追加＞
function addTodo() {
  if (textarea.value.trim() === "") {
    errorText.innerHTML = "文字を入力して下さい";
    return;
  } else {
    errorText.innerHTML = "";
  }

  const newTodo = {
    id: Date.now(),
    text: textarea.value.trim(),
  };
  todoList.push(newTodo);
  localStorage.setItem("Todo", JSON.stringify(todoList));

  TodoCreateElement(newTodo);
  textarea.value = "";
}

function addDeleteButton(div) {  
  const deleteButton = document.createElement("button");

  deleteButton.textContent = "削除";
  deleteButton.classList.add("deleteButton"); 
  div.appendChild(deleteButton);
  
  deleteButton.addEventListener("click", () => {
    div.remove();
    const deleteId = div.id;
  
    todoList = todoList.filter(todo => todo.id !== parseInt(deleteId));

    localStorage.setItem("Todo", JSON.stringify(todoList));
      });

  };


// ＜要素の作成＞
function TodoCreateElement(todo) {
  const div = document.createElement("div");
  div.classList.add("test","box");
  div.id = todo.id;

  const viewText = document.createTextNode(todo.text);
  div.appendChild(viewText);
  
  addCheckBox(div);
  addDeleteButton(div, todo.id);
 
  document.body.appendChild(div);
}

// ＜タスクを追加した際、チェックボックスも追加＞
function addCheckBox(div) {  
  const check = document.createElement("input"); 

  check.setAttribute("id", "checked"); 
  check.setAttribute("type", "checkbox");
  check.classList.add("checkBox");

  div.appendChild(check); 
  check.addEventListener('click', () => {
    checkBoxEnabled(div)
  });
}

// ＜チェックボックスがオンの時、文字を薄くする/オフの時表示を通常時にする＞
function checkBoxEnabled(div){
  const checkboxes = document.querySelectorAll(".checkBox");
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if(checkbox.checked) {
        div.classList.add("check-box-enabled");
        return   localStorage.setItem("Todo", JSON.stringify(todoList));
      } else {
        div.classList.remove("check-box-enabled");
        return   localStorage.setItem("Todo", JSON.stringify(todoList));
      }
    });
  });
  }

//＜ リロード時の呼び出し＞
function loadTodos() {
  todoList.forEach(TodoCreateElement);
}
