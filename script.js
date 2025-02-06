const btn = document.querySelector(".btn");
const Textarea = document.getElementById('Textarea');
const message = document.getElementById('message');

btn.addEventListener(`click`, () => {
    // クリックは文字列。忘れない。”
    message.innerText = Textarea.value;  
  });