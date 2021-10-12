// Initialize Firebase

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDCAa6J48jm7cEHdKJJt2Qzbu6jKVUg-Hc",
  authDomain: "driverspub.firebaseapp.com",
  projectId: "driverspub",
  storageBucket: "driverspub.appspot.com",
  messagingSenderId: "716939539079",
  appId: "1:716939539079:web:17d7255d86d33de5a1be22"
});
const dataBase = firebaseApp.firestore();
//--------------------------------------
//Variables to send table data to modal div
const exampleModal = document.getElementById('exampleModal');
const selectState = document.getElementById("estado");
const selectRole = document.getElementById("rol");
let iniState = "";
let iniRole = "";
let iniIdUser = "";

//Listener to get the id, role and state from the row where the button modify were clicked
exampleModal.addEventListener('show.bs.modal', (event) => {
  const id = event.relatedTarget.getAttribute("data-index");
  const tableState = document.getElementById(id).innerHTML.trim().replaceAll("<td>", "/").replaceAll("</td>", "").split("/")[5];
  const tableRole = document.getElementById(id).innerHTML.trim().replaceAll("<td>", "/").replaceAll("</td>", "").split("/")[4];
  const tableIdUser = document.getElementById(id).innerHTML.trim().replaceAll("<td>", "/").replaceAll("</td>", "").split("/")[1];
  getInfo(tableIdUser, tableState, tableRole);
  selectState.value = tableState;
  return;
});

//Function that saves the info from the table in global variables
function getInfo(iden, state, role) {
  iniIdUser = iden;
  iniState = state;
  iniRole = role;
}

//Event for the modify button, it supposed to save the modify data in firebase
const btnModify = document.getElementById("modificar");
btnModify.addEventListener("click", (event) => {
  //console.log(`Se va a modificar el usuario ${iniIdUser}, con el rol ${iniRole}, y estado ${iniState}`);
  //console.log(`Por estado: ${selectState.value} y rol: ${selectRole.value}`);
  if (selectState.value === iniState) {
    Swal.fire({
      icon: 'error',
      title: 'No se ha modificado el usuario',
      text: 'por favor elija un estado diferente para modificar.'
    });
    return;
  } else if(selectState.value === "Pendiente"){

      if(selectRole.value === "Administrador" || selectRole.value === "Vendedor"){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No puede asignar este rol con estado Pendiente.'
        });
        return;
      }
  }else if(selectState.value === "No autorizado"){

    if(selectRole.value === "Administrador" || selectRole.value === "Vendedor"){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puede asignar este rol con estado No autorizado.'
      });
      return;
    }

  }else if(selectState.value === "Autorizado"){
    if(selectRole.value === "Ninguno"){
      Swal.fire({
        icon: 'info',
        title: 'Campo no valido',
        text: 'Debe asignar un rol con el estado Autorizado.'
      });
      return;
    }
  }
    updateUser(iniIdUser, selectRole.value, selectState.value);
    let myModalEl = document.getElementById('exampleModal')
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
    return;

});

//Function to save changes in a specific user in fields such as role and state.
async function updateUser(id, role, state) {
  await dataBase.collection("usuarios").doc(id).update({
    rol: role, 
    estado: state
  });
  Swal.fire({
    icon: 'success',
    title: '',
    text: 'Usuario modificado con exito.'
  });
}

//Event in select state to disable role options depends on what was selected as a state.
selectState.addEventListener("change", () => {

  const state = selectState.value;

  if (state === "Pendiente") {
    document.getElementById("Administrador").disabled = true;
    document.getElementById("Vendedor").disabled = true;
    document.getElementById("Ninguno").disabled = false;
    return;
  }
  if (state === "No autorizado") {
    document.getElementById("Administrador").disabled = true;
    document.getElementById("Vendedor").disabled = true;
    document.getElementById("Ninguno").disabled = false;
    return;
  }
  if (state === "Autorizado") {
    document.getElementById("Administrador").disabled = false;
    document.getElementById("Vendedor").disabled = false;
    document.getElementById("Ninguno").disabled = true;
    return;
  }
});