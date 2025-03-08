// ＜ぼたんを定義するときは、getElementByIdなど取得忘れず＞
document.addEventListener("DOMContentLoaded", loadTodos);

const btn = document.getElementById("btn");
const Textarea = document.getElementById('Textarea');
const deleteButton = document.getElementsByClassName("deleteButton");

let todoList = JSON.parse(localStorage.getItem("Todo")) || [];

btn.addEventListener("click", addTodo);

function addTodo(){  // JSで新しくhtmlを生成して表示させるイメージ
  const div = document.createElement("div");
   //createElement… tagName で指定された HTML 要素を生成
  div.classList.add("test");

  if (Textarea.value === "") {
    const errorText = "文字を入力して下さい";
    document.getElementById("error-text").innerHTML = errorText; 
    // #innerHTMLとは
    // 　HTML要素の中身を変更するときに使われるプロパティである。HTML要素の中身を自由に変更することで、動的なWebページを作成できる。
    return; // 名前が
    // 空の場合は処理を終了()
  }else{
    document.getElementById("errorText").innerHTML = ''; //エラーメッセージをクリア 
  };

  
  const viewtext = document.createTextNode(Textarea.value); 
  console.log("Textarea.value",Textarea.value === "")
  // Windowsスニペット/式も記載できる/

  // https://teratail.com/questions/80186
  // https://itemy.net/?p=1427
  const newTodo = {
    id: Date.now(),
    text:Textarea.value,
  };
  todoList.push(newTodo);
  console.log("Todo");
  
  div.id = newTodo.id;
  // 例⇒<div class="test box" id="1741139173665">
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
  // 削除ボタンは読み込み時にはないので、関数外に作るとエラーを起こす
  const deleteButton = document.createElement("button");
  // createElement…ボタンの要素を作成
  deleteButton.textContent = "削除";
  deleteButton.classList.add("deleteButton"); 
  div.appendChild(deleteButton);
  // deleteButton.setAttribute("id", "deleteButton"); 
  // 同じIDを複数の要素に使うのはだめ
  
  deleteButton.addEventListener("click", () => {
    div.remove();
    const deleteId = div.id;
    console.log(deleteId)
    // 配列の中の特定の条件に一致するものだけ（削除ボタンを押したTODO）を削除する
    // ＜条件一致 削除で検索>
    // https://qiita.com/sirogane/items/b9ee2f829148b5d949f7

    // <localstorage　一致　削除　filter>
    // https://ics.media/entry/200825/
    // ＜＜localstorage html　一致　削除　filter＞
    // https://code-sq.com/js_todo_list/⇒html
    todoList = todoList.filter(todo => todo.id !== parseInt(deleteId));
    // ローカルストレージ上とhtml上のidが条件一致したとき、削除
    //parseInt()文字列の引数を解釈

    // filter…ilterは配列の内容を指定した条件で絞り込む関数です。
　　// 配列の要素一つ一つを判定し、関数内でtrueが返ってきたもののみを抽出
// 厳密不等価 (!==)オペランド（式に出てくる数値とか変数式に出てくる数値とか変数）が等しくないことを検査

    console.log(todoList)
    // localStorage を更新
    // 元の配列から、一つだけ削除された状態のものをlocalStorageに保存しなおす
    localStorage.setItem("Todo", JSON.stringify(todoList));
      });

  };


function addCheckBox(div) {  
  const check = document.createElement("input"); // <input> のTML 要素を生成


  check.setAttribute("id", "checked"); // チェックボックス属性、値を設定
  check.setAttribute("type", "checkbox");
  check.classList.add("checkBox");


  div.appendChild(check); 
  check.addEventListener('click', () => {
    checkBoxEnabled(div)
  });
}

function checkBoxEnabled(div){
  // https://qiita.com/mamenon/items/08a57ba34907331b96c7
  const checkboxes = document.querySelectorAll(".checkBox");
  
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if(checkbox.checked) {
        //チェックボックスがオンの時
        div.classList.add("check-box-enabled");
      } else {
        //チェックボックスがオフの時
        div.classList.remove("check-box-enabled");
      }
    });
  });
  }

 

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
    div.id = todo.id;   // newTodoに渡したtodoを画面を切り替えても表示出来るように


    addCheckBox(div);
    div.appendChild(viewtext);
    addDeleteButton(div, todo.id);
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

