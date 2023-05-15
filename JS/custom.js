/*Variables */
let arrayCatalogo = new Array();
let numerodepag;
/*Detectar parametros */
let parametrosUrl = new URLSearchParams(location.search);

/*Solicitar datos al servidor */
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    arrayCatalogo = objeto;
    cargarcatalogo(numerodepag);
})

/*Comprobar pagina */
if (parseInt(parametrosUrl.get("page")) == 1 || parametrosUrl.get("page") == null) {
    numerodepag = 1;
} else {
    numerodepag = parseInt(parametrosUrl.get("page"));
} console.log("Estamos en la pagina " + numerodepag);

/*Definir cargar catalogo */
function cargarcatalogo(pagina) {
    let catalogo = document.querySelector("#catalogo");
    /*Crear elelmentos */
    let inicio = (pagina - 1) * 8;
    let final;
    let tmpfinal = pagina * 8;
    if (arrayCatalogo.length < tmpfinal) {
        final = arrayCatalogo.length;
    } else {
        final = tmpfinal;
    }
    for (let index = inicio; index <= final; index++) {
        /*Proceso precios */
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = (precio - (precio * oferta / 100)).toFixed(1)+"0";
        /*Creo articulos */
        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class", 'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"');
        nuevoElemento.innerHTML =
            `
        <picture>
            <img class="img-fluid" src="image/productos/${arrayCatalogo[index].image}" alt="${arrayCatalogo[index].name}">
        </picture>
        <h4>${arrayCatalogo[index].name}</h4>
        <p>
            <span class="precioOriginal">S/ ${precio}</span>
            <span class="precioDescuento">-${oferta}%</span> <br>
            <span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick="agregarcarrito(event)" class="btn btn-light">
        <i class="bi bi-plus-square"></i> Agregar Carrito </button>
    `;
        // Añadir el nuevo elemento al catalogo
        catalogo.append(nuevoElemento);
    }
} 
function agregarcarrito(event) {
    const button = event.target;
    const article = button.closest('article');
    const nombre = article.querySelector('h4').innerText;
    const precio = article.querySelector('.precioFinal').innerText;
    const imagenSrc = article.querySelector('img').getAttribute('src');

    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
      <p>${nombre}</p>
      <img src="${imagenSrc}" alt="${nombre}">
      <p>${precio}</p>
    `;

    const carritoProductos = document.getElementById('carrito-productos');
    carritoProductos.appendChild(nuevoElemento);
    alert("Se agrego producto al carrito");

  }
