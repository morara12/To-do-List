// ＜ぼたんを定義するときは、getElementByIdなど取得忘れず＞
const btn = document.getElementById("btn");
const Textarea = document.getElementById('Textarea');
const deleteButton = document.getElementsByClassName("deleteButton");
let todoList = JSON.parse(localStorage.getItem("Todo")) || [];


document.addEventListener("DOMContentLoaded", loadTodos);


function addTodo(){  // JSで新しくhtmlを生成して表示させるイメージ
  const div = document.createElement("div");
   //createElement… tagName で指定された HTML 要素を生成
  div.classList.add("test");
  if (Textarea.value === "") {
    return; // 名前が
    // 空の場合は処理を終了()
  }


  const viewtext = document.createTextNode(Textarea.value); 
  console.log("Textarea.value",Textarea.value === "")
  // Windowsスニペット/式も記載できる/

console.log(viewtext)
    // https://teratail.com/questions/80186
  const newTodo = {
    id: Date.now(),
    text:Textarea.value,
  };
  todoList.push(newTodo);
  console.log("Todo");


  // 保存
  localStorage.setItem("Todo", JSON.stringify(todoList));
  const sampleJson = JSON.parse(localStorage.getItem("Todo"));
  console.log(sampleJson);


  
  addCheckBox(div);
  div.appendChild(viewtext);
  addDeleteButton(div); 
  showBorder(div);
  // <div> にテキストを追加
  document.body.appendChild(div);
  Textarea.value = ""; // <div> を <body> に追加
 
}

// https://living-program.com/javascript/javascript-array/#outline__2_5

function addDeleteButton(div) {  
  const deleteButton = document.createElement("button");

  // createElement…ボタンの要素を作成
  deleteButton.textContent = "削除";
  deleteButton.classList.add("deleteButton"); 
  div.appendChild(deleteButton);
  // deleteButton.setAttribute("id", "deleteButton"); 
  // 同じIDを複数の要素に使うのはだめ

  deleteButton.addEventListener('click', () => {
    div.remove()
   
    // ①localStorageから配列のTODOを取ってくる

    console.log(todoList.length);
      // 削除ボタンを作成して追加
      localStorage.setItem("Todo", JSON.stringify(todoList));
      console.log("todoList.length",todoList.length)
      });
// 削除ボタンは読み込み時にはないので、関数外に作るとエラーを起こす
  };



function addCheckBox(div) {  
  const check = document.createElement("input"); // <input> のTML 要素を生成


  check.setAttribute("id", "checked"); // チェックボックス属性、値を設定
  check.setAttribute("type", "checkbox");
  check.classList.add("checkBox");


  div.appendChild(check); 
  check.addEventListener('click', () => {
    CheckBoxEnabled(div)
  });
}


function CheckBoxEnabled(div){
  // https://qiita.com/mamenon/items/08a57ba34907331b96c7
  const checkboxes = document.querySelectorAll(".checkBox");
  
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if(checkbox.checked) {
        //チェックボックスがオンの時
        div.classList.add("CheckBoxEnabled");
      } else {
        //チェックボックスがオフの時
        div.classList.remove("CheckBoxEnabled");
      }
    });
  });
  }

  btn.addEventListener("click", addTodo);

 function showBorder(elem){
  elem.classList.add('box')
};

function loadTodos() {
 
  
  // https://qiita.com/sadakoa/items/95bc7aca2b2e3babf762
  todoList.forEach((todo) => {
    localStorage.setItem("Todo", JSON.stringify(todoList));
    // 中身も繰り返し書かないと反映しない
    const div = document.createElement("div");
    div.classList.add("test");
    const viewtext = document.createTextNode(todo.text);


    addCheckBox(div);
    div.appendChild(viewtext);
    addDeleteButton(div);
    showBorder(div);
// リファクタリング⇒動く状態をつくってから整理する
    document.body.appendChild(div);
  });
};



// /  試した箇所
// //  setItem…インターフェイスのメソッドで、キーの名前と値を Storage オブジェクトに渡すと、ストレージにキー(カギとなる何かとわりとそのまま）を追加したり、
// // またはキーがすでに存在する場合はキーに対する値を更新したりします。
//  taskSpace.innerHTML = save;
 

//  const save = localStorage.setItem(textinput);

