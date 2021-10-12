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

//   Declarar variables globales
const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
let usuarioActual;


const btnLogin = document.getElementById('button-login')



async function login() {
    try {
        const respuesta = await auth.signInWithPopup(proveedor)
        console.log(respuesta.user.displayName);
        usuarioActual = respuesta.user

        window.location.href = "../Productos/productos.html";

    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

function logOut() {
    auth.signOut();
}


// Eventos
// Login
btnLogin.addEventListener('click', (e) => {
    console.log("funciona");
    login()
})