
var url = "https://picsum.photos/500/500";
var imagenOriginal
function getImage() {

    fetch(url).then(response => {
        console.log(response);
        imagen.src= response.url;
        }).catch(error => {
        console.log(error);
        alert('Ha ocurrido un error!');
        });
}

function aplicarFiltro(filter) {
    imagenOriginal = document.getElementById("imagen")
    var imagenFiltro = document.getElementById("canvasFiltro")
    imagen.crossOrigin = "Anonymous"
    filter = LenaJS[filter]
    LenaJS.filterImage(imagenFiltro, filter, imagenOriginal)
}
