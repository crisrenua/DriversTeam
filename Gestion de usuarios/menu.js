var script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/2dd15a3ce5.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
document.write(
    '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">'
    + '<div class="container-fluid">'
    + '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"'
    + ' aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">'
    + '<span class="navbar-toggler-icon"></span>'
    + '</button>'
    + '<div class="collapse navbar-collapse" id="navbarTogglerDemo01">' +
    +   '<a class="navbar-brand" href="#">' + "Drivers Pub"+ '<i class="fas fa-beer"></i> <i class="fas fa-pizza-slice fa-pulse"></i></a>'
    + '<ul class="navbar-nav me-auto mb-2 mb-lg-0">'
    + '<li class="nav-item">'
    + '<a class="nav-link" aria-current="page" href="#">Inicio</a>'
    + ' </li>'

    + '<li class="nav-item dropdown">'
    + '<a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" data-bs-toggle="dropdown" aria-expanded="false"> Administrar productos </a>'
    + '<ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">'
    + '<li><a class="dropdown-item" href="#">Registrar producto</a></li>'
    + '<li><a class="dropdown-item" href="#">Listar productos</a></li>'
    + '</ul>'
    + '</li>'

    + '<li class="nav-item dropdown">'
    + '<a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" data-bs-toggle="dropdown" aria-expanded="false">Administrar ventas</a>'
    + '<ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">'
    + '<li><a class="dropdown-item" href="#">Registrar venta</a></li>'
    + '<li><a class="dropdown-item" href="#">Listar ventas</a></li>'
    + '</ul>'
    + '</li>'

    + '<li class="nav-item">'
    + '<a class="nav-link active">Administrar usuarios</a>'
    + '</li>'


    + '</ul>'
    + '<form class="d-flex">'
    + '<li class="nav-item dropdown">'
    + '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> admin1@gmail.com</a>'
    + '<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'
    + '<li><a class="dropdown-item" href="#">Preferencias</a></li>'
    + '<li><a class="dropdown-item" href="#">Salir</a></li>'
    + '</ul>'
    + '</li>'
    + '</form>'
    + '</div>'
    + '</div>'
    + '</nav>');