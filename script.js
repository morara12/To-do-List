const btn = document.getElementById("btn");
const Textarea = document.getElementById('Textarea');


  //  試した箇所

window.localStorage.setItem("Todo", Textarea.value);
var value1 = localStorage.getItem('Todo')
console.log(value1)


function addTodo(){
  // JSで新しくhtmlを生成して表示させるイメージ
  const div = document.createElement("div"); 
  div.classList.add("test");
  //createElement… tagName で指定された HTML 要素を生成
  const viewtext = document.createTextNode(Textarea.value); 
  Textarea.value = "";
  // createTextNode…新しいテキスト作成
  // 追加を押したときに削除
  addCheckBox(div);
  div.appendChild(viewtext);
  addDeleteButton(div);
  // <div> にテキストを追加
  document.body.appendChild(div); // <div> を <body> に追加
  localStorage.setItem("Todo", viewtext);
  console.log(localStorage.getItem("Todo"));
}

function addDeleteButton(div) {  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.classList.add("deleteButton"); 
  // deleteButton.setAttribute("id", "deleteButton"); 
  // 同じIDを複数の要素に使うのはだめ
  div.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    div.remove();
// 削除ボタンは読み込み時にはないので、関数外に作るとエラーを起こす
  });
// チェックボックス属性の値を設定
}


function addCheckBox(div) {  
  const check = document.createElement("input"); // <input> のTML 要素を生成
  check.setAttribute("id", "checked"); // チェックボックス属性の値を設定
  check.setAttribute("type", "checkbox");
  check.classList.add("checkBox");
  div.appendChild(check); 
  check.addEventListener('click', () => {
    hide(div);
  });
}

function aaa(){
  
}

btn.addEventListener(`click`, () => {
  // clickだけ記載しない
  addTodo()
  addDeleteButton()
  addCheckBox() 
  });


  function hide(elem){
    elem.classList.add('kuro')
 }
  


//  const save = localStorage.setItem(textinput);

// /  試した箇所
// //  setItem…インターフェイスのメソッドで、キーの名前と値を Storage オブジェクトに渡すと、ストレージにキー(カギとなる何かとわりとそのまま）を追加したり、
// // またはキーがすでに存在する場合はキーに対する値を更新したりします。
//  taskSpace.innerHTML = save;
 



