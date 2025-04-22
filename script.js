document.addEventListener("DOMContentLoaded", loadTodos);


const btn = document.getElementById("btn");
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


const dateErrorText = document.getElementById("date-error-text");

const priority = document.getElementById('priority-selectbox');
const todoItem = document.getElementsByClassName("todo-item")

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

btn.addEventListener("click", addTodo);

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
//   // 条件分岐　 js　リファクタリング
//   // https://teratail.com/questions/336970
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
  
  // selector⇒CSSセレクタを指定します。
  // このメソッドは、条件に一致するすべての要素を含む静的なNodeListを返します。
  // NodeListは配列に似たオブジェクトで、ループ処理や要素へのアクセスが可能
  // HTMLCollectionとNodeListの違い
  // http://tomiwa-tech.co.jp/blog/html-collection-vs-nodelist/
  // 関数外につくるとだめ
        // https://techblg.app/articles/js-sort-array/
    // https://qiita.com/ymk83/items/3d53e0965a278b5cfd4d⇒sortの仕様

  // =>関数式の記述を簡略化したのがアロー関数…function(a,b)と同じ
  // todoListに配列を入れている
  // aとbで上から計算してい
  if (type === "descCreatedAt") {
    // todoList.sortが重複しているので変数を使う
    todoList.sort((a,b) => b.createdAt - a.createdAt);
  } else if (type === "ascCreatedAt") {
    todoList.sort((a,b) => a.createdAt - b.createdAt);
  } else if (type === "descPriority") {
    // https://nekoniki.com/20200924_javascript_string_sort_custom
    let data = ["高", "中", "低", ""];
    todoList.sort((a, b) => data.indexOf(b.priority) - data.indexOf(a.priority));
    // indexOf String 値（変数の種類の一つ。「その箱には文字列（文字の集まり）を入れていいよ」な決まりのこと）のメソッドで
    // この文字列を検索し、指定した部分文字列が最初に出現するインデックスを返します
  } else if (type === "ascPriority") {
    let data = ["高", "中", "低", ""];
    todoList.sort((a, b) => data.indexOf(a.priority) - data.indexOf(b.priority));
  } else if (type === "descDeadline") {
    todoList.sort((a, b) => Date.parse(b.deadline) - Date.parse(a.deadline)); 
    // https://qiita.com/maiamea/items/4ab60364c4c268eaa2a5
    //Date.parse⇒ YYYY-MM-DDを数字化
  } else if (type === "ascDeadline") {
    todoList.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
  };

  saveTodoList()  
  loadTodos()
}

/* <ID作成> */
function getId(){
  // ifで分岐させる必要がある
  // 1からIDの作成
  if(todoItem.length === 0){
    return 1
  } else {
    const todoIdArray =  todoList.map((todo) => todo.id); 
    // map =todolistの配列=idのプロパティ参照
    // https://zenn.dev/ndjndj/articles/5a2f93374b3fc3⇒配列の最大値（最小値）を取得するには
    const maxId =  Math.max(...todoIdArray);
    // Math.max()
    // https://zenn.dev/progate_users/articles/c86f2d1fb855e0
    // Math.max() 関数は、入力引数として与えられた 0 個以上の数値のうち最大の数を返す
    // https://zenn.dev/kosuke_shopify/articles/95f784531c3c98
    // reduceかんすうについて
    // https://zenn.dev/ndjndj/articles/5a2f93374b3fc3
    // reduce()は対象となる配列に対して任意の関数を実行することができます。
    return maxId+1
    // todoItem.lengthが一つ目は無条件で１
    // ２つめはmapで大きいものを返す
  }
    // todoListから直接idを参照出来ないからエラー
    // tolistは配列
    // todoItem.length
};

function changeBorderColor(div, todo) {
  // （古)addBorder⇒足しているのではなく、枠の色を変えるクラスのため現在の名前に変更
  // https://bonoponz.hatenablog.com/entry/2020/05/12/%E3%80%90Web%E3%80%91%E3%83%97%E3%83%AB%E3%83%80%E3%82%A6%E3%83%B3%E3%81%A7%E8%A1%A8%E7%A4%BA%E5%86%85%E5%AE%B9%E3%82%92%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88%E3%82%8B
  // https://nagashima.kyusan-u.ac.jp/note/color-change/
  // https://mebee.info/2021/01/07/post-19281/
  // https://kasumiblog.org/javascript-select-class
  div.classList.remove("high-priority", "middle-priority", "low-priority");
  // クリックしたとき、一旦リセットさせる
  if (todo.priority === "高") {
    div.classList.add("high-priority");
  } else if (todo.priority === "中") {
    div.classList.add("middle-priority");
  } else if (todo.priority === "低") {
    div.classList.add("low-priority");
  // } else if (todo.priority === "") {
    // div.classList.add("todo-item");
    // これが無くても成立する
};
}


function addPriorityToTodoItem(todo,div){
  // https://oinusama.hatenadiary.org/entry/20091106/p1
  const select = document.createElement("select");
  // document.createElement() メソッドは tagName で指定された HTML 要素を生成し、または tagName が認識できない場合は HTMLUnknownElement を生成します。
  const option_non_priority = document.createElement("option");
  const option_high = document.createElement("option");
  const option_middle = document.createElement("option");
  const option_low = document.createElement("option");
  
  option_non_priority.setAttribute("value","");
  option_non_priority.appendChild( document.createTextNode("") );
  // setAttribute('属性の名前', '新しい属性')という形式で使用します。

  option_high.setAttribute("value","高");
  // Node インターフェイスのメソッドで、指定された親ノードの子ノードリストの末尾にノードを追加します。
  option_high.appendChild( document.createTextNode("高") );
  // 表に表示される

  option_middle.setAttribute("value","中");
  option_middle.appendChild( document.createTextNode("中") );

  option_low.setAttribute("value","低");
  option_low.appendChild( document.createTextNode("低") );

  select.appendChild(option_non_priority);
  select.appendChild(option_high);
  select.appendChild(option_middle);
  select.appendChild(option_low);

  select.value = todo.priority;
  // https://codinghaku.com/javascript-select-action/?utm_source=chatgpt.com
  select.addEventListener("change", () => {
    todo.priority= select.value; 
    changeBorderColor(div, todo)
    saveTodoList()
  });

  return select
}

// ＜文言を記載しボタンでクリック後、タスク追加＞
function addTodo() {
  // if (textarea.value === "") {
  //   // http://javascriptmania.blog111.fc2.com/blog-entry-59.html
  //   errorText.innerHTML="文字を入力をしてください";
  //   return;
  // }else{
  //   errorText.innerHTML = "";
  // };
  // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ローカルストレージから今あるtodoを引っ張ってくる
// todoList.id = 0

// 新規作成の場合、⇒ローカルストレージが0の場合、０をふる
// 0以上の場合、1を足していく。

// console.log(todoList.slice());
// 文字列や配列などからデータの一部分だけ取り出せるメソッド
// slice⇒空の状態の複製させている
// ⇒更新後のものが表示されることがある
  const newTodo = {
    id:getId(),
    // 関数でもこの中に入れられる
    isCompleted: false,
    text: textarea.value,
    priority: priority.value,
    // Numberで文字列として認識しているので数字化
    deadline: date.value,
    createdAt:Date.now(),
  };
  todoList.push(newTodo);
  saveTodoList();
  todoCreateElement(newTodo);
  textarea.value = "";
};

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
  // divから受け取っている。
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
    // https://uxmilk.jp/46961
    // 文字列か数字か確認
  const editTargetTodo = todoList.find(todo => todo.id === parseInt(div.id));
  // 動詞が入っているからと言って必ず関数の名前にはならない
  textbox.value = editTargetTodo.text;

  // ifで編集の文言のボタン時と、完了の時の文言のボタンで分岐させる
  // コンプリートボタンを新たに作って表示させない
  
  // 編集ボタンと完了ボタンで定義を変える
  //     // 実態が何かを命名する＋している動作を名前にしているわけではない
  //     // 動作は関数がほとんど

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
  const deadline = document.createTextNode(todo.deadline);

  const deadlineText = todo.deadline ? todo.deadline : "null";
  const deadlineNode = document.createTextNode(deadlineText);
    // クラスを追加してスタイル用に使えるようにする
    div.classList.add("deadline-item");

    // テキストノードをdivに追加
    div.appendChild(deadlineNode);
  // テキスト生成
  div.classList.add("deadline-item");
  div.appendChild(deadline);
  // divを生成しただけなので値を返す
  // https://zenn.dev/ankouh/books/javascript-dom/viewer/b412c6
  return div
}


// ＜要素の作成＞
function todoCreateElement(todo) {
  // https://itsakura.com/js-createelement
  // 文字にクラスをつける方法
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
  addDeleteButton(todoWrapperDiv); //  削除ボタン
  document.body.appendChild(todoWrapperDiv);
}


function saveTodoList (){
  localStorage.setItem("todos", JSON.stringify(todoList));
}; 

//＜ リロード時の呼び出し＞
function loadTodos() {
  const todoItodoItems = document.querySelectorAll(".todo-item")
  todoItodoItems.forEach(element => element.remove());
  todoList.forEach(todoCreateElement);
}
