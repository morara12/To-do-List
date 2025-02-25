
//チェックボックスの要素を取得

  //  試した箇所

// window.localStorage.setItem("Todo", Textarea.value);
// var value1 = localStorage.getItem('Todo')
// console.log(value1)
// let data = {
//   'todo1': 'Textarea',
//   'data2': 'huga'
// };
// let val = JSON.stringify(data);



// let getData = JSON.parse(getVal);
// // parse…変換処理
// console.log(getData.data1);  //'hoge'
// console.log(getData.data2);  //'huga'



const btn = document.getElementById("btn");
const Textarea = document.getElementById('Textarea');
let todoList = {};

function addTodo(){
  console.log(todoList);
  // JSで新しくhtmlを生成して表示させるイメージ
  const div = document.createElement("div"); 
  div.classList.add("test");
  //createElement… tagName で指定された HTML 要素を生成
  const viewtext = document.createTextNode(Textarea.value); 
  
  // ローカルストレージへの代入

  todoList["Todo1"] = Textarea.value
  
  const jsonString = JSON.stringify(viewtext);
  // Json形式に変換
  window.localStorage.setItem("Todo", jsonString);
  // 保存
  const sampleJson = JSON.parse(localStorage.getItem('Todo'));
  console.log(sampleJson);

  Textarea.value = "";
  // createTextNode…新しいテキスト作成

  // 追加を押したときに削除
  addCheckBox(div);
  div.appendChild(viewtext);
  addDeleteButton(div);
  showBorder(div);
  // <div> にテキストを追加
  document.body.appendChild(div); // <div> を <body> に追加
 
}

function addDeleteButton(div) {  
  const deleteButton = document.createElement("button");

  // createElement…ボタンの要素を作成
  deleteButton.textContent = "削除";
  deleteButton.classList.add("deleteButton"); 
  div.appendChild(deleteButton);
  // deleteButton.setAttribute("id", "deleteButton"); 
  // 同じIDを複数の要素に使うのはだめ

  deleteButton.addEventListener('click', () => {
    div.remove();
// 削除ボタンは読み込み時にはないので、関数外に作るとエラーを起こす
  });
// チェックボックス属性の値を設定
}


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

btn.addEventListener(`click`, () => {
  // clickだけ記載しない
  addTodo(); // Todoを追加
  addDeleteButton(); // 削除ボタンを追加
  addCheckBox(); // チェックボックスを追加
});

 function showBorder(elem){
  elem.classList.add('box')
};


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
// /  試した箇所
// //  setItem…インターフェイスのメソッドで、キーの名前と値を Storage オブジェクトに渡すと、ストレージにキー(カギとなる何かとわりとそのまま）を追加したり、
// // またはキーがすでに存在する場合はキーに対する値を更新したりします。
//  taskSpace.innerHTML = save;
 

//  const save = localStorage.setItem(textinput);

