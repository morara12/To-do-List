document.addEventListener("DOMContentLoaded", loadTodos);

const btn = document.getElementById("btn");
const textarea = document.getElementById("Textarea");
const errorText = document.getElementById("error-text");
const date = document.getElementById("date");

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

btn.addEventListener("click", addTodo);

// ＜文言を記載しボタンでクリック後、タスク追加＞
function addTodo() {
  if (textarea.value === "") {
    // http://javascriptmania.blog111.fc2.com/blog-entry-59.html
    errorText.innerHTML="文字を入力をしてください";
    return;
  }else{
    errorText.innerHTML = "";
  };

  const newTodo = {
    id: Date.now(),
    text: textarea.value,
    isCompleted: false,
    deadline: date.value
  };
  todoList.push(newTodo);
  saveTodoList();
  todoCreateElement(newTodo);
  textarea.value = "";
}

function addDeleteButton(div) {  
  const deleteButton = document.createElement("button");

  deleteButton.textContent = "削除";
  deleteButton.classList.add("delete-Button"); 
  div.appendChild(deleteButton);
  
  deleteButton.addEventListener("click", () => {
    div.remove();
    const deleteId = div.id;
  
    todoList = todoList.filter(todo => todo.id !== parseInt(deleteId));

    saveTodoList();
  });
};


// ＜要素の作成＞
function todoCreateElement(todo) {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  // deadline-item用のdivとして変数名の修正deadlineDiv
  div.classList.add("todo-item");
  div2.classList.add("deadline-item");
  div.id = todo.id;


  const viewText = document.createTextNode(todo.text);
  const deadline = document.createTextNode(todo.deadline);

  div.appendChild(viewText);
  div.appendChild(div2); 
  div2.appendChild(deadline);
  addCheckBox(div,todo);
  
  addDeleteButton(div, todo.id);
  toggleTodoStyle(div,todo) 
  document.body.appendChild(div);
}

// ＜タスクを追加した際、チェックボックスも追加＞
function addCheckBox(div,todo) {  
  const check = document.createElement("input"); 
  check.setAttribute("type", "checkbox");
  check.classList.add("check-box");
  div.appendChild(check); 

  check.checked = todo.isCompleted;
  // チェックボックスの状態変更時に文字を薄くする処理を追加
  check.addEventListener("change", () => {
    todo.isCompleted = check.checked;
    toggleTodoStyle(div,todo);
    saveTodoList();
  });
}

// ＜チェックボックスがオンの時、文字を薄くする/オフの時表示を通常時にする＞
function toggleTodoStyle(div,todo) {
  // コメントアウトして1個ずつ消していくと、閉じ【】がわかりやすくなる
  // const checkboxes = document.querySelectorAll(".check-box");
  // divから受け取っている。
  // checkboxes.forEach(checkbox => {
    // checkbox.addEventListener("change", () => {
  if(todo.isCompleted) {
    div.classList.add("check-box-enabled");
  } else {
    div.classList.remove("check-box-enabled");
  }
}

function saveTodoList (){
  localStorage.setItem("todos", JSON.stringify(todoList));
}; 

//＜ リロード時の呼び出し＞
function loadTodos() {
  todoList.forEach(todoCreateElement);
}
