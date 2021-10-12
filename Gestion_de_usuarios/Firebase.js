// import * as fire from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.1.2/firebase-compat.min.js";
const firebaseConfig = {

  apiKey: "AIzaSyDCAa6J48jm7cEHdKJJt2Qzbu6jKVUg-Hc",
  authDomain: "driverspub.firebaseapp.com",
  projectId: "driverspub",
  storageBucket: "driverspub.appspot.com",
  messagingSenderId: "716939539079",
  appId: "1:716939539079:web:17d7255d86d33de5a1be22"
};

// Initialize Firebase
let tableIndex = 1;
const firebaseApp = firebase.initializeApp(firebaseConfig);
const dataBase = firebaseApp.firestore();
const onUsers = (callback) => dataBase.collection("usuarios").onSnapshot(callback);
usersList();

//UserList gets the users collection in real time, this function list users and its modifies atributes into the table body.
async function usersList() {

  onUsers((users) => {

    const table = document.getElementById("tableBody");
    const btnModify = document.getElementById("modificar")
    table.innerHTML = '';

    users.forEach(user => {
      const userData = user.data();
      let newRow = table.insertRow();
      let newCell = newRow.insertCell(-1);
      let newCell2 = newRow.insertCell(-1);
      let newCell3 = newRow.insertCell(-1);
      let newCell4 = newRow.insertCell(-1);
      let newCell5 = newRow.insertCell(-1);
      let newCell6 = newRow.insertCell(-1);
      let newText = document.createTextNode(user.id);
      let newText2 = document.createTextNode(userData.nombre);
      let newText3 = document.createTextNode(userData.correo);
      let newText4 = document.createTextNode(userData.rol);
      let newText5 = document.createTextNode(userData.estado);
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML = ('<i class="fas fa-pen-square"></i>');
      button.className = "btn btn-dark";
      button.dataset.bsToggle = "modal";
      button.dataset.bsTarget = "#exampleModal"
      button.dataset.user = userData.nombre;
      button.dataset.bsWhatever = userData.correo;
      button.dataset.index= tableIndex;
      newRow.id= tableIndex;
      newCell.appendChild(newText);
      newCell2.appendChild(newText2);
      newCell3.appendChild(newText3);
      newCell4.appendChild(newText4);
      newCell5.appendChild(newText5);
      newCell6.appendChild(button);
      tableIndex++;
    });
tableIndex = 1;
  })
}