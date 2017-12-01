const {ipcMain} = require("electron");
const firebase = require("firebase");
const uxuser = require("./ux-user.js");

var config = {
  apiKey: "AIzaSyCy306yGeg5JBfMaku7e7a4GPNdQjTB_aM",
   authDomain: "project-portal-960b0.firebaseapp.com",
   databaseURL: "https://project-portal-960b0.firebaseio.com",
   projectId: "project-portal-960b0",
   storageBucket: "project-portal-960b0.appspot.com",
   messagingSenderId: "316490190117"
};
firebase.initializeApp(config);

let window;
let user;

exports.setWindow = (bw) => {
     window = bw;
     uxuser.setFirebase(firebase);
    uxuser.setWindow(window);
}

// register
ipcMain.on("ui-auth.register", (e, a) => {
    errhap = false;
    console.log("Registering...");
    firebase.auth().createUserWithEmailAndPassword(a.email, a.pass).catch((err) => {
        errhap = true;
        e.sender.send("ux-auth.register", {state:"error", error:err.message});
    });

    e.sender.send("ux-auth.register", {state:"success"});
});

// login
ipcMain.on("ui-auth.login", (e, a) => {
    console.log("Logging in...");
    firebase.auth().signInWithEmailAndPassword(a.email, a.pass).catch((err) => {
        e.sender.send("ux-auth.login", {state:"error", error:err.message});
        return;
    });
    e.sender.send("ux-auth.login", {state:"success"});
});

ipcMain.on("ui-auth.helloworld", (e, a) => {
    var luser = firebase.auth().currentUser;
    if(luser){
        e.sender.send("ux-auth.loggedin", {user:luser});
    } else {
        e.sender.send("ux-auth.loggedout");
    }
});

// onAuthState
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        window.webContents.send("ux-auth.loggedin", {user});
        user = user;
    } else {
        window.webContents.send("ux-auth.loggedout");
        user = null;
    }
});
