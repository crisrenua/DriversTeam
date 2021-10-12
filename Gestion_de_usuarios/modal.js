// export const indexbutto = document.getElementById('exampleModal').getAttribute.button;
// console.log(indexbutto)
const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // console.log(button);
    // Extract info from data-bs-* attributes
    
    const recipient = button.getAttribute('data-bs-whatever');
    const usuario = button.getAttribute('data-user'); // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    let modalTitle = exampleModal.querySelector('.modal-title')
    let modalBodyInput = exampleModal.querySelector('.modal-body input')
    // console.log(usuario,recipient);
    modalTitle.textContent = 'Modificar usuario ' + usuario
    modalBodyInput.value = recipient
});