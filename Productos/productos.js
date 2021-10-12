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

const database = firebase.firestore()
const dataBase = firebaseApp.firestore();
const onProducts = (callback) => dataBase.collection("productos").onSnapshot(callback);
productList();



// Variables DOM

const idProducto = document.getElementById('idProducto')
const descripcion = document.getElementById('descripcion')
const valorUnitario = document.getElementById('valor-unitario')
const estado = document.getElementById('estadoProducto')
const formularioModal = document.getElementById('formulario-registro-producto')





//UserList gets the users collection in real time, this function list users and its modifies atributes into the table body.
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
        button.dataset.user = prodcutData.nombre;
        button.dataset.bsWhatever = prodcutData.correo;
        newCell.appendChild(newText);
        newCell2.appendChild(newText2);
        newCell3.appendChild(newText3);
        newCell4.appendChild(newText4);
        newCell5.appendChild(button);
  
      });
  
    })
  }













// Funciones

async function adicionarInfo(infoUno, infoDos, infoTres, infoCuatro){
    const info = {
        idProducto: infoUno,
        descripcion: infoDos,
        valorUnitario: infoTres,
        estado: infoCuatro,
    }

    await guardarInfo(info)
}

async function guardarInfo(info){
    try {
        await database.collection("productos").add(info)
    } catch (error) {
        console.error()
        throw new Error(error)        
    }

}

// Eventos

formularioModal.addEventListener('submit', (e)=>{
    e.preventDefault()
    const infoUno = idProducto.value
    const infoDos = descripcion.value
    const infoTres = valorUnitario.value
    const infoCuatro = estado.value
    adicionarInfo(infoUno, infoDos, infoTres, infoCuatro)

})

// -----------------------------------------------------------------------------------------

// Modales

// variables DOM

const modalEditar = document.getElementById('modalEditar')
const modalRegistroProducto = document.getElementById('modalRegistroProducto')

// Modal editar

modalEditar.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const usuario = button.getAttribute('user')
    const recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an AJAX request here
    const idprod = button.getAttribute('idprod');
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = modalEditar.querySelector('.modal-title')
    var modalBodyInput = modalEditar.querySelector('.modal-body input')

    modalTitle.textContent = 'Producto ' + usuario
    modalBodyInput.value = recipient
})

// Modal registro producto

modalRegistroProducto.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const usuario = button.getAttribute('user')
    const recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an AJAX request here
    const idprod = button.getAttribute('idprod');
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = modalRegistroProducto.querySelector('.modal-title')
    var modalBodyInput = modalRegistroProducto.querySelector('.modal-body input')

    modalTitle.textContent = 'Producto ' + usuario
    modalBodyInput.value = recipient
})

