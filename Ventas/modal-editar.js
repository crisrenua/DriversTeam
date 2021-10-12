const exampleModal = document.getElementById('modalEditar')
exampleModal.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const idVenta = button.getAttribute('idVenta')
    const cliente = button.getAttribute('cliente')
    const idCliente = button.getAttribute('idCliente')
    // If necessary, you could initiate an AJAX request here
    const idprod = button.getAttribute('idprod');
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = exampleModal.querySelector('.modal-title')
    var modalBodyInput = exampleModal.querySelector('.modal-body input[id="cliente"]')
    var modalBodyInput2 = exampleModal.querySelector('.modal-body input[id="idCliente"]')

    modalTitle.textContent = 'Venta -  ' + idVenta
    modalBodyInput.value = cliente
    modalBodyInput2.value = idCliente

})