const {ipcMain} = require("electron");
const firebase = require("firebase");
var config = {
  apiKey: "AIzaSyCy306yGeg5JBfMaku7e7a4GPNdQjTB_aM",
 authDomain: "project-portal-960b0.firebaseapp.com",
 databaseURL: "https://project-portal-960b0.firebaseio.com",
 projectId: "project-portal-960b0",
 storageBucket: "project-portal-960b0.appspot.com",
 messagingSenderId: "316490190117"
};
var user = document.querySelector('#username');
var msg = document.querySelector('#chatter');
var send = document.querySelector('#post');

send.addEventListener("click", function(){
  var msgUser = user.value;
  var msgText = msg.value;
  firebase.push({username:msgUser, text:msgText});
  msg.value = "";

  var listen = function() {
    firebase.on('child_added', function(snapshot){
      var newMsg = snapshot.val();

      var msgUsername = document.createElement("user");
      msgUsername.textContent = newMsg.username;

      var msgTextElement = document.createElement("msgtext");
      msgTextElement.textContent = newMsg.text;

      var msgElement = document.createElement("div");
      msgElement.appendChild(msgUsername);
      msgElement.appendChild(msgTextElement);

      document.getElementById("msgbox").appendChild(msgElement);

    });

  }
  listen();
});
