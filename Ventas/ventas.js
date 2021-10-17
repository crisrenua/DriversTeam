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

const nombreCliente = document.getElementById('nombreCliente')
const idCliente = document.getElementById('idCliente')
const productosActuales = []

const formularioModalVentas = document.getElementById('formularioRegistroVentas')
const modalEditar = document.getElementById('modalEditar')
const modalRegistroVentas = document.getElementById('modalRegistroVenta')

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
            let newCell6 = newRow.insertCell(-1);
            let newCell7 = newRow.insertCell(-1);
            let newCell8 = newRow.insertCell(-1);
            let newCell9 = newRow.insertCell(-1);
            let newCell10 = newRow.insertCell(-1);
            let newCell11 = newRow.insertCell(-1);
            let newText = document.createTextNode(sale.id);
            let newText2 = document.createTextNode(saleData.estado);
            let newText3 = document.createTextNode("saleData.fecha");
            let newText4 = document.createTextNode(saleData.productos.producto1.producto);
            let newText5 = document.createTextNode(saleData.productos.producto1.cantidad);
            let newText6 = document.createTextNode(saleData.productos.producto1.precioUnitario);
            let newText7 = document.createTextNode(saleData.precioVenta);
            let newText8 = document.createTextNode(saleData.nombreCliente);
            let newText9 = document.createTextNode(saleData.idCliente);
            let newText10 = document.createTextNode("saleData.vendedor");
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
            newCell5.appendChild(newText5);
            newCell6.appendChild(newText6);
            newCell7.appendChild(newText7);
            newCell8.appendChild(newText8);
            newCell9.appendChild(newText9);
            newCell10.appendChild(newText10);
            newCell11.appendChild(button);

        });

    })
}

// Listado productos modal
async function productListModal() {

    onProducts((products) => {

        const table = document.getElementById("tableBodyModal");
        table.innerHTML = '';
        let id = 0

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
            quantity.id = id
            id ++
            quantity.dataset.bsTarget = "#exampleModal"
            quantity.dataset.user = productData.nombre;
            quantity.dataset.bsWhatever = productData.correo;
            newCell.appendChild(newText);
            newCell2.appendChild(newText2);
            newCell3.appendChild(newText3);
            newCell4.appendChild(newText4);
            newCell5.appendChild(quantity);

            let productoFila = [product.id, productData.descripcion, productData.valorUnitario, productData.estado]
            productosActuales.push(productoFila)

        });

    })
}

// Funciones

async function adicionarInfo(infoUno, infoDos, productos, infoCuatro) {
    const info = {
        estado: "En proceso",
        nombreCliente: infoUno,
        idCliente: infoDos,
        productos,
        precioVenta: infoCuatro,
        vendedor: "Vendedor"
    }

    await guardarInfo(info)
}

async function guardarInfo(info) {
    try {
        await dataBase.collection("ventas").add(info)
    } catch (error) {
        console.error()
        throw new Error(error)
    }

}

// Eventos

formularioModalVentas.addEventListener('submit', (e) => {
    e.preventDefault()
    const infoUno = nombreCliente.value
    const infoDos = idCliente.value
    const productos = {}
    let infoCuatro = 0

    for (let i = 0; i < productosActuales.length; i++) {
        let element = document.getElementById(i)

        if(element.value){
            // listaInputs.push(element.value)
            productos[`producto${i+1}`] = {
                cantidad: element.value,
                precioPorCantidad: productosActuales[i][2]*element.value,
                precioUnitario: productosActuales[i][2],
                producto: productosActuales[i][1],
            } 

            infoCuatro += productosActuales[i][2] * element.value

            // obj.key3 = "value3";
        }
    }

    adicionarInfo(infoUno, infoDos, productos, infoCuatro)
})

// -----------------------------------------------------------------------------------------

// Modales

// Modal editar

// modalEditar.addEventListener('show.bs.modal', function (event) {
//     // Button that triggered the modal
//     const button = event.relatedTarget
//     // Extract info from data-bs-* attributes
//     const usuario = button.getAttribute('user')
//     const recipient = button.getAttribute('data-bs-whatever')
//     // If necessary, you could initiate an AJAX request here
//     const idprod = button.getAttribute('idprod');
//     // and then do the updating in a callback.
//     //
//     // Update the modal's content.
//     var modalTitle = modalEditar.querySelector('.modal-title')
//     var modalBodyInput = modalEditar.querySelector('.modal-body input')

//     modalTitle.textContent = 'Producto ' + usuario
//     modalBodyInput.value = recipient
// })

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

