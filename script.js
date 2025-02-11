const btn = document.getElementById("button");
const Textarea = document.getElementById('Textarea');
const deleteBtn = document.getElementById("deleteBtn");

function addTodo(){
  // JSで新しくhtmlを生成して表示させるイメージ
  const div = document.createElement("div"); 
  div.classList.add("test");
  const p = document.createElement('p'); 
  //createElement… tagName で指定された HTML 要素を生成
  const viewtext = document.createTextNode(Textarea.value); 
  // createTextNode…新しいテキスト作成
  p.appendChild(viewtext); 
  //appendChild…指定された親ノードの子ノードリストの末尾にノードを追加します
  document.body.appendChild(p);
     //<html><body>上に<p>サンプルテキスト</p>を追加
  Textarea.value = "";
  // 追加を押したときに削除
// 今日のtest
// https://teratail.com/questions/202544
const check = document.createElement("input"); // <input> を作る
check.setAttribute("type", "checkbox"); // チェックボックスにする
div.appendChild(check); // <div> にチェックボックスを追加
div.appendChild(viewtext); // <div> にテキストを追加
document.body.appendChild(div); // <div> を <body> に追加

    //  試した箇所
  localStorage.setItem("Todo", "Todo");
  var value1 = localStorage.getItem('Todo')
  console.log(value1)
 
  // 要素内の HTML または XML のマークアップを取得したり設定
}
function deleteTodo(){
  let parentnode = document.getElementById('test');
  parentnode.lastElementChild.remove();
}

btn.addEventListener(`click`, () => {
  // clickだけ記載しない
  addTodo()
  });

deleteBtn.addEventListener(`click`, () => {
    // clickだけ記載しない
    deleteTodo()
    });

    
//  const save = localStorage.setItem(textinput);

// /  試した箇所
// //  setItem…インターフェイスのメソッドで、キーの名前と値を Storage オブジェクトに渡すと、ストレージにキー(カギとなる何かとわりとそのまま）を追加したり、
// // またはキーがすでに存在する場合はキーに対する値を更新したりします。
//  taskSpace.innerHTML = save;
 



