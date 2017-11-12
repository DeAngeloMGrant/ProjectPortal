const {ipcMain} = require("electron");

let firebase;
let window;

exports.setFirebase =(fb) => {
  firebase = fb;
}
var user = document.querySelector('#username') ;
var text = document.querySelector('#msgtext');
var msgbubble = document.getElementsByClassName('#msgbox');

sendButton.addEventListener("Click", function(){
  var msgUser = user.value;
  var msgText = msgbubble.value;
  firebase.push({
    username: msgUser,
    text: msgText
  });
  textInput.value = "";
})
