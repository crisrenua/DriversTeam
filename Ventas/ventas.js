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
const onSales = (callback) => dataBase.collection("ventas").onSnapshot(callback);
salesList()
productListModal();



// Variables DOM

const descripcion = document.getElementById('descripcion')
const valorUnitario = document.getElementById('valor-unitario')
const estado = document.getElementById('estadoProducto')
const formularioModal = document.getElementById('formulario-registro-producto')
const modalEditar = document.getElementById('modalEditar')
const modalRegistroVenta = document.getElementById('modalRegistroVenta')


// Funciones

// Listado ventas
async function salesList() {

    onSales((sales) => {

        const table = document.getElementById("tableBody");
        table.innerHTML = '';

        sales.forEach(sale => {
            const saleData = sale.data();
            let newRow = table.insertRow();
            let newCell = newRow.insertCell(-1);
            let newCell2 = newRow.insertCell(-1);
            let newCell3 = newRow.insertCell(-1);
            let newCell4 = newRow.insertCell(-1);
            let newCell5 = newRow.insertCell(-1);
            let newText = document.createTextNode(sale.id);
            let newText2 = document.createTextNode(saleData.descripcion);
            let newText3 = document.createTextNode(saleData.valorUnitario);
            let newText4 = document.createTextNode(saleData.estado);
            const button = document.createElement("button");
            button.type = "button";
            button.innerHTML = ('<i class="fas fa-pen-square"></i>');
            button.className = "btn btn-dark";
            button.dataset.bsToggle = "modal";
            button.dataset.bsTarget = "#exampleModal"
            button.dataset.user = saleData.nombre;
            button.dataset.bsWhatever = saleData.correo;
            newCell.appendChild(newText);
            newCell2.appendChild(newText2);
            newCell3.appendChild(newText3);
            newCell4.appendChild(newText4);
            newCell5.appendChild(button);

        });

    })
}

// Listado productos modal
async function productListModal() {

    onProducts((products) => {

        const table = document.getElementById("tableBodyModal");
        table.innerHTML = '';

        products.forEach(product => {
            const productData = product.data();
            let newRow = table.insertRow();
            let newCell = newRow.insertCell(-1);
            let newCell2 = newRow.insertCell(-1);
            let newCell3 = newRow.insertCell(-1);
            let newCell4 = newRow.insertCell(-1);
            let newCell5 = newRow.insertCell(-1);
            let newText = document.createTextNode(product.id);
            let newText2 = document.createTextNode(productData.descripcion);
            let newText3 = document.createTextNode(productData.valorUnitario);
            let newText4 = document.createTextNode(productData.estado);
            const quantity = document.createElement("input");
            quantity.type = "number";
            quantity.dataset.bsTarget = "#exampleModal"
            quantity.dataset.user = productData.nombre;
            quantity.dataset.bsWhatever = productData.correo;
            newCell.appendChild(newText);
            newCell2.appendChild(newText2);
            newCell3.appendChild(newText3);
            newCell4.appendChild(newText4);
            newCell5.appendChild(quantity);

        });

    })
}

async function adicionarInfo(infoUno, infoDos, infoTres) {
    const info = {
        descripcion: infoUno,
        valorUnitario: infoDos,
        estado: infoTres,
    }

    await guardarInfo(info)
}

async function guardarInfo(info) {
    try {
        await database.collection("productos").add(info)
    } catch (error) {
        console.error()
        throw new Error(error)
    }

}

// Eventos

formularioModal.addEventListener('submit', (e) => {
    e.preventDefault()
    const infoUno = descripcion.value
    const infoDos = valorUnitario.value
    const infoTres = estado.value
    adicionarInfo(infoUno, infoDos, infoTres)

})

// -----------------------------------------------------------------------------------------

// Modales

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

// modalRegistroVenta.addEventListener('show.bs.modal', function (event) {
//     Button that triggered the modal
//     const button = event.relatedTarget
//     Extract info from data-bs-* attributes
//     const usuario = button.getAttribute('user')
//     const recipient = button.getAttribute('data-bs-whatever')
//     If necessary, you could initiate an AJAX request here
//     const idprod = button.getAttribute('idprod');
//     and then do the updating in a callback.
    
//     Update the modal's content.
//     var modalTitle = modalRegistroProducto.querySelector('.modal-title')
//     var modalBodyInput = modalRegistroProducto.querySelector('.modal-body input')

//     modalTitle.textContent = 'Producto ' + usuario
//     modalBodyInput.value = recipient
// })

