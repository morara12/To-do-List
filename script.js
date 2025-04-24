document.addEventListener("DOMContentLoaded", loadTodos);

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

const btn = document.getElementById("btn");
btn.addEventListener("click", addTodo);

const date = document.getElementById("date");

const textarea = document.getElementById("textarea");
const errorText = document.getElementById("error-text");

const sortDescCreatedAtBtn = document.getElementById("sort-desc-createdat-at-btn");
const sortAscCreatedAtBtn= document.getElementById("sort-asc-createdat-at-btn");

const sortDescDeadlineBtn= document.getElementById("sort-desc-deadline-btn");
const sortAscDeadlineBtn= document.getElementById("sort-asc-deadline-btn");

const sortDescPriorityBtn = document.getElementById("sort-desc-priority-btn");
const sortAscPriorityBtn = document.getElementById("sort-asc-priority-btn");

const filterPriorityHighBtn = document.getElementById("filter-priority-high-btn")
const filterMiddlePriorityBtn = document.getElementById("filter-middle-priority-btn")
const filterLowPriorityBtn = document.getElementById("filter-low-priority-btn")
const filterNoPriorityBtn = document.getElementById("filter-no-priority-btn")
const filterResetPriorityBtn = document.getElementById("filter-reset-priority-btn")

const priority = document.getElementById('priority-selectbox');
const todoItem = document.getElementsByClassName("todo-item")

sortDescCreatedAtBtn.addEventListener("click", () => sort("descCreatedAt"));
sortAscCreatedAtBtn.addEventListener("click", () => sort("ascCreatedAt"));

sortDescDeadlineBtn.addEventListener("click", () => sort("descDeadline"));
sortAscDeadlineBtn.addEventListener("click", () => sort("ascDeadline"));

sortDescPriorityBtn.addEventListener("click", () => sort("descPriority"));
sortAscPriorityBtn.addEventListener("click", () => sort("ascPriority"));

filterPriorityHighBtn.addEventListener("click",() => filter("filterPriorityHigh"));
filterMiddlePriorityBtn.addEventListener("click",() => filter("filterMiddlePriority"));
filterLowPriorityBtn.addEventListener("click",() => filter("filterLowPriority"));
filterNoPriorityBtn.addEventListener("click",() => filter("filterNoPriority"));
filterResetPriorityBtn.addEventListener("click",() => loadTodos());

function filter(type) {
  const priorityList = {
    filterPriorityHigh:"高",
    filterMiddlePriority:"中",
    filterLowPriority:"低",
    filterNoPriority:"",
  }
  const selectedPriority  = priorityList[type];
  const filteredTodos = todoList.filter(todo => todo.priority === selectedPriority);

  const todoElements = document.querySelectorAll(".todo-item");
  todoElements.forEach(element => element.remove());

  filteredTodos.forEach(todo => todoCreateElement(todo))
}


function sort(type){
  if (type === "descCreatedAt") {
    todoList.sort((a,b) => b.createdAt - a.createdAt);
  } else if (type === "ascCreatedAt") {
    todoList.sort((a,b) => a.createdAt - b.createdAt);
  } else if (type === "descPriority") {
    let data = ["高", "中", "低", ""];
    todoList.sort((a, b) => data.indexOf(b.priority) - data.indexOf(a.priority));
    // indexOf String 値（変数の種類の一つ。「その箱には文字列（文字の集まり）を入れていいよ」という決まりのこと）のメソッド
    // この文字列を検索し、指定した部分の文字列が最初に出現するインデックスを返す
  } else if (type === "ascPriority") {
    let data = ["高", "中", "低", ""];
    todoList.sort((a, b) => data.indexOf(a.priority) - data.indexOf(b.priority));
  } else if (type === "descDeadline") {
    todoList.sort((a, b) => Date.parse(b.deadline) - Date.parse(a.deadline)); 
    //Date.parse⇒ YYYY-MM-DDを数字化
  } else if (type === "ascDeadline") {
    todoList.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
  };

  saveTodoList()  
  loadTodos()
}

/* <ID作成> */
function getId(){
  if(todoItem.length === 0){
    return 1
  } else {
    const todoIdArray =  todoList.map((todo) => todo.id); 
    // map = todoList内のidだけを取り出した配列を作る
    const maxId =  Math.max(...todoIdArray);
    // Math.max() 関数は、入力引数として与えられた 0 個以上の数値のうち最大の数を返す
    return maxId+1
    // todoItem.lengthが一つ目は無条件で１
    // ２つめはmapで大きいものを返す
  }
};

function changeBorderColor(div, todo) {
  div.classList.remove("high-priority", "middle-priority", "low-priority");
  // クリックしたとき、一旦リセット
  if (todo.priority === "高") {
    div.classList.add("high-priority");
  } else if (todo.priority === "中") {
    div.classList.add("middle-priority");
  } else if (todo.priority === "低") {
    div.classList.add("low-priority");
  }
}

function addPriorityToTodoItem(todo,div){
  const select = document.createElement("select");
  // document.createElement() メソッドは 
  // tagName で指定された HTML 要素を生成し、または tagName が認識できない場合は HTMLUnknownElement を生成
  const option_non_priority = document.createElement("option");
  const option_high = document.createElement("option");
  const option_middle = document.createElement("option");
  const option_low = document.createElement("option");
  
  option_non_priority.setAttribute("value","");
  option_non_priority.appendChild( document.createTextNode("") );
  // setAttribute(属性名, 値) で属性を設定する

  option_high.setAttribute("value","高");
  // Node インターフェイスのメソッドで、指定された親ノードの子ノードリストの末尾にノードを追加
  option_high.appendChild( document.createTextNode("高") );

  option_middle.setAttribute("value","中");
  option_middle.appendChild( document.createTextNode("中") );

  option_low.setAttribute("value","低");
  option_low.appendChild( document.createTextNode("低") );

  select.appendChild(option_non_priority);
  select.appendChild(option_high);
  select.appendChild(option_middle);
  select.appendChild(option_low);

  select.value = todo.priority;

  select.addEventListener("change", () => {
    todo.priority= select.value; 
    changeBorderColor(div, todo)
    saveTodoList()
  });

  return select
}

// ＜文言を記載しボタンでクリック後、タスク追加＞
function addTodo() {
  if (textarea.value === "") {
    errorText.innerHTML="文字を入力してください";
    return;
  }else{
    errorText.innerHTML = "";
  };

  const newTodo = {
    id:getId(),
    // 関数でもこの中に入れられる
    isCompleted: false,
    text: textarea.value,
    priority: priority.value,
    deadline: date.value,
    createdAt:Date.now(),
  };

  todoList.push(newTodo);
  saveTodoList();
  todoCreateElement(newTodo);
  
  textarea.value = "";
  date.value = "";
  priority.value = "";
};

// ＜タスクを追加した際、チェックボックスも追加＞
function addCheckBox(div,todo) {  
  const check = document.createElement("input"); 
  check.setAttribute("type", "checkbox");
  check.classList.add("check-box");
  
  div.appendChild(check); 

  check.checked = todo.isCompleted;

  check.addEventListener("change", () => {
    todo.isCompleted = check.checked;
    toggleTodoStyle(div,todo);
    saveTodoList();
  });
}


// ＜チェックボックスがオンの時、文字を薄くする/オフの時表示を通常時にする＞
function toggleTodoStyle(div,todo) {
  if(todo.isCompleted) {
    div.classList.add("check-box-enabled");
  } else {
    div.classList.remove("check-box-enabled");
  }
}

function addDeleteButton(div) {  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "×";
  deleteButton.classList.add("delete-button"); 
  div.appendChild(deleteButton);
  
  deleteButton.addEventListener("click", () => {
    div.remove();

    todoList = todoList.filter(todo => todo.id !== parseInt(div.id));
    
    saveTodoList();
  });
}

function addEditAndCompleteButton(div,todo){
  const editButton = document.createElement("button");
  editButton.textContent = "編集"; 
  editButton.classList.add("edit-button"); 

  const completedButton = document.createElement("button");
  completedButton.textContent = "完了";
  completedButton.classList.add("completed-button"); 
  completedButton.style.display = 'none';

  const textbox = document.createElement('textarea');
  textbox.setAttribute("id", "edit-textarea");
  // setAttribute() は Element インターフェイスのメソッドで、指定された要素の属性の値を設定

  const editTargetTodo = todoList.find(todo => todo.id === parseInt(div.id));

  textbox.value = editTargetTodo.text;

  editButton.addEventListener('click', () => {
    editButton.style.display = 'none';
    completedButton.style.display = 'block';
    
    const textElement =document.getElementById(`text-${todo.id}`);
    const textWrapper =document.getElementById(`text-wrapper-${todo.id}`);

    textElement.remove()
    textWrapper.appendChild(textbox);
  });

  completedButton.addEventListener('click', () => {
    editTargetTodo.text = textbox.value;
    editButton.style.display= 'block';
    completedButton.style.display= 'none';

    saveTodoList ()
    loadTodos()
  });

  div.appendChild(editButton);
  div.appendChild(completedButton);
}

function deadline(todo){
  const div = document.createElement("div");
  const deadlineText = todo.deadline ? todo.deadline : "";

  const deadlineNode = document.createTextNode(deadlineText);

  div.classList.add("deadline-item");
  // クラスを追加してスタイル用に使えるようにする

  div.appendChild(deadlineNode);
  // テキストノードをdivに追加

  return div
}


// ＜要素の作成＞
function todoCreateElement(todo) {
  const todoWrapperDiv = document.createElement("div");

  const p = document.createElement('p');
  const viewText = document.createTextNode(todo.text);

  todoWrapperDiv.classList.add("todo-item");
  todoWrapperDiv.id = todo.id;
  p.id = `text-${todo.id}`;
  //テンプレートリテラル 数や式を組み込むための記号。

  addCheckBox(todoWrapperDiv, todo); 

  const textWrapperDiv = document.createElement("div"); 
  textWrapperDiv.setAttribute('id',`text-wrapper-${todo.id}`);

  p.appendChild(viewText);
  textWrapperDiv.appendChild(p);
  todoWrapperDiv.appendChild(textWrapperDiv)

  changeBorderColor(todoWrapperDiv,todo)
  addEditAndCompleteButton(todoWrapperDiv,todo);
  // (todo,todoWrapperDivのtodoWrapperDivはここで作られたtodoWrapperDivの中で関数を発動させるため）
  
  todoWrapperDiv.appendChild(addPriorityToTodoItem(todo,todoWrapperDiv));
  // 指定された親ノードの子ノードリストの末尾にノードを追加

  todoWrapperDiv.appendChild(deadline(todo));
  addDeleteButton(todoWrapperDiv);
  document.body.appendChild(todoWrapperDiv);
}


// <ローカルストレージに保存＞
function saveTodoList (){
  localStorage.setItem("todos", JSON.stringify(todoList));
}; 


//＜ リロード時呼び出し＞
function loadTodos() {
  const todoItems = document.querySelectorAll(".todo-item")
  todoItems.forEach(element => element.remove());
  todoList.forEach(todoCreateElement);
}
