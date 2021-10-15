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
  //--------------------------------------
  //Variables to send table data to modal div
  const exampleModal = document.getElementById('exampleModal');
  const selectState = document.getElementById("estado");
  const selectValoru = document.getElementById("valorUnitario");
  let iniValoru = "";
  let iniState = "";
  let iniIdProduct = "";
  
  //Listener to get the id, producto and state from the row where the button modify were clicked
  exampleModal.addEventListener('show.bs.modal', (event) => {
    const id = event.relatedTarget.getAttribute("data-index");
    const tableState = document.getElementById(id).innerHTML.trim().replaceAll("<td>", "/").replaceAll("</td>", "").split("/")[4];
    const tableValoru = document.getElementById(id).innerHTML.trim().replaceAll("<td>", "/").replaceAll("</td>", "").split("/")[3];
    const tableIdProduct = document.getElementById(id).innerHTML.trim().replaceAll("<td>", "/").replaceAll("</td>", "").split("/")[1];
    getInfo(tableIdProduct, tableValoru, tableState);
    selectValoru.value = tableValoru;
    selectState.value = tableState;
    return;
  });
  
  //Function that saves the info from the table in global variables
  function getInfo(iden, valoru, state) {
    iniIdProduct = iden;
    iniValoru = valoru;
    iniState = state;
  }
  
  //Event for the modify button, it supposed to save the modify data in firebase
  const btnModify = document.getElementById("actualizar");
  btnModify.addEventListener("click", (event) => {
    //console.log(`Se va a modificar el producto ${iniIdProduct}, con el valor ${iniValoru}, y estado ${iniState}`);
    //console.log(`Por estado: ${selectState.value} y valor: ${selectValoru.value}`);
    
      updateProduct(iniIdProduct, selectValoru.value, selectState.value);
      let myModalEl = document.getElementById('exampleModal')
      let modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide();
      return;
  
  });
  
  //Function actualizar base de datos.
  async function updateProduct(id, valoru, state) {
    await dataBase.collection("productos").doc(id).update({
      valorUnitario: valoru, 
      estado: state
    });
    Swal.fire({
      icon: 'success',
      title: '',
      text: 'Producto modificado con exito.'
    });
  }
