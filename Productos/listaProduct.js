const firebaseConfig = {
    apiKey: "AIzaSyDCAa6J48jm7cEHdKJJt2Qzbu6jKVUg-Hc",
    authDomain: "driverspub.firebaseapp.com",
    projectId: "driverspub",
    storageBucket: "driverspub.appspot.com",
    messagingSenderId: "716939539079",
    appId: "1:716939539079:web:17d7255d86d33de5a1be22"
};

// Inicializacion db

const firebaseApp = firebase.initializeApp(firebaseConfig);

// variables
let tableIndex = 1;
const database = firebase.firestore()
const dataBase = firebaseApp.firestore();
const onProducts = (callback) => dataBase.collection("productos").onSnapshot(callback);
productList();


async function productList() {

    onProducts((prodcuts) => {

        const table = document.getElementById("tableBody");
        table.innerHTML = '';

        prodcuts.forEach(product => {
            const prodcutData = product.data();
            let newRow = table.insertRow();
            let newCell = newRow.insertCell(-1);
            let newCell2 = newRow.insertCell(-1);
            let newCell3 = newRow.insertCell(-1);
            let newCell4 = newRow.insertCell(-1);
            let newCell5 = newRow.insertCell(-1);
            let newText = document.createTextNode(product.id);
            let newText2 = document.createTextNode(prodcutData.descripcion);
            let newText3 = document.createTextNode(prodcutData.valorUnitario);
            let newText4 = document.createTextNode(prodcutData.estado);
            const button = document.createElement("button");
            button.type = "button";
            button.innerHTML = ('<i class="fas fa-pen-square"></i>');
            button.className = "btn btn-dark";
            button.dataset.bsToggle = "modal";
            button.dataset.bsTarget = "#exampleModal"
            button.dataset.user = prodcutData.descripcion;
            button.dataset.bsWhatever = prodcutData.valorUnitario;
            button.dataset.index= tableIndex;
            newRow.id= tableIndex;
            newCell.appendChild(newText);
            newCell2.appendChild(newText2);
            newCell3.appendChild(newText3);
            newCell4.appendChild(newText4);
            newCell5.appendChild(button);
            tableIndex++;
    });
tableIndex = 1;
  })
}
