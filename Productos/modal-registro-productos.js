const exampleModal = document.getElementById('modalEditar')
exampleModal.addEventListener('show.bs.modal', function (event) {
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
    var modalTitle = exampleModal.querySelector('.modal-title')
    var modalBodyInput = exampleModal.querySelector('.modal-body input')

    modalTitle.textContent = 'Producto ' + usuario
    modalBodyInput.value = recipient
})