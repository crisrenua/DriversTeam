let objectsUsers = [];

const firebaseConfig = {

  apiKey: "AIzaSyDCAa6J48jm7cEHdKJJt2Qzbu6jKVUg-Hc",
  authDomain: "driverspub.firebaseapp.com",
  projectId: "driverspub",
  storageBucket: "driverspub.appspot.com",
  messagingSenderId: "716939539079",
  appId: "1:716939539079:web:17d7255d86d33de5a1be22"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const dataBase = firebase.firestore();
usersList();

async function usersList() {

  //Usa el arreglo de usuarios para añadir la informacion a la tabla en el htm
  //pdt: "refactorizar porque esta muy extenso el agregado dinamico a la tabla"
  objectsUsers = await requestUsers();

  objectsUsers.forEach((usuario) => {

    const table = document.getElementById("tableBody");
    let newRow = table.insertRow();
    let newCell = newRow.insertCell(-1);
    let newCell2 = newRow.insertCell(-1);
    let newCell3 = newRow.insertCell(-1);
    let newCell4 = newRow.insertCell(-1);
    let newCell5 = newRow.insertCell(-1);
    let newCell6 = newRow.insertCell(-1);
    let newText = document.createTextNode(usuario[0]);
    let newText2 = document.createTextNode(usuario[1]);
    let newText3 = document.createTextNode(usuario[2]);
    let newText4 = document.createTextNode(usuario[3]);
    let newText5 = document.createTextNode(usuario[4]);
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = ('<i class="fas fa-pen-square"></i>');
    button.className = "btn btn-dark";
    button.dataset.bsToggle = "modal";
    button.dataset.bsTarget = "#exampleModal"
    button.dataset.user = usuario[1];
    // console.log(button.dataset.user.toString());
    button.dataset.bsWhatever = usuario[2];
    newCell.appendChild(newText);
    newCell2.appendChild(newText2);
    newCell3.appendChild(newText3);
    newCell4.appendChild(newText4);
    newCell5.appendChild(newText5);
    newCell6.appendChild(button);
    //console.log(usuario[1]);
  })
}

//consulta los usuarios que existe en la coleccion y los retorna como un arreglo.
async function requestUsers() {

  const arrayUsers = [];
  const querySnapshot = await dataBase.collection("usuarios").get();
  querySnapshot.forEach((document) => {
    arrayUsers.push([document.id,
    document.data().nombre,
    document.data().correo,
    document.data().rol,
    document.data().estado]);
  });

  return arrayUsers;
}

//actualizar tabla despues de cambios 
const onGetUsers = (callback) => dataBase.collection("usuarios").onSnapshopt(callback);