var canvas = document.getElementById("miCanvas");
var context = canvas.getContext("2d");
var playing = false;

var anchoPlataforma = 200
var altoPlataforma = 20

var posPlataformaX = (canvas.width / 2) - (anchoPlataforma / 2)
var posPlataformaY = 375


var posBolaX = posPlataformaX + 50
var posBolaY = posPlataformaY - 15

var posBolaInicialX = posBolaX;
var posBolaInicialY = posBolaY;

var fotogramaInterval;

var inclinacionX = generateRandomDir() * 5;
var inclinacionY = 5;

var puntuacion = 0;


function iniciar() {
    fotogramaInterval = setInterval(fotograma, 20)
}

function dibujar() {
    context.fillStyle = "rgb(162, 93, 52)"
    context.fillRect(posPlataformaX, posPlataformaY, anchoPlataforma, altoPlataforma)
}

window.onkeydown = function (e) {

    var keyPressed = e.key;
    if (keyPressed == 'ArrowRight') {
        moverDer()
    }
    if (keyPressed == 'ArrowLeft') {
        moverIzq()
    }
    if (keyPressed == ' ') {
        disparo()
    }
}

function moverDer() {
    if (posPlataformaX + anchoPlataforma < 800) {
        context.clearRect(posPlataformaX - 1, posPlataformaY - 1, anchoPlataforma + 1.5, altoPlataforma + 1.5)
        posPlataformaX = posPlataformaX + 45
        context.fillStyle = "rgb(162, 93, 52)"
        context.fillRect(posPlataformaX, posPlataformaY, anchoPlataforma, altoPlataforma)
    }
}

function moverIzq() {
    if (posPlataformaX > 0) {
        context.clearRect(posPlataformaX - 1, posPlataformaY - 1, anchoPlataforma + 1.5, altoPlataforma + 1.5)
        posPlataformaX = posPlataformaX - 45
        context.fillStyle = "rgb(162, 93, 52)"
        context.fillRect(posPlataformaX, posPlataformaY, anchoPlataforma, altoPlataforma)
    }
}

function dibujarBola(newPosX, newPosY) {
    context.clearRect(posBolaX - 5, posBolaY - 5, 10, 10)

    posBolaY -= newPosY
    posBolaX -= newPosX

    context.beginPath();
    context.arc(posBolaX, posBolaY, 5, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill()
}

function disparo() {
    if (!playing) {
        posBolaX = posPlataformaX + 50
        playing = true
    }
}

function fotograma() {
    dibujar()

    if (playing) {
        if (posBolaX <= 0 || posBolaY <= 0 || posBolaX >= 800 || posBolaY >= 370) {
            if (posBolaY <= 0) {
                inclinacionX = generateRandomDir() * generateRandom()
                inclinacionY = -generateRandom()
            }
            if ((posPlataformaY <= posBolaY) && (posPlataformaX <= posBolaX && (posPlataformaX + anchoPlataforma) >= posBolaX)) {
                puntuacion += 10;
                document.getElementById('score').innerText = puntuacion
                inclinacionX = generateRandomDir() * generateRandom()
                inclinacionY = generateRandom()
                if ((puntuacion % 50 == 0) && (puntuacion != 0) && (anchoPlataforma > 50) ) {
                    reducir()        
                 }
            } else {
                if (posBolaY >= 395) {
                    playing = false;
                    clearInterval(fotogramaInterval)
                    let newGame = confirm("Tu puntuación fue: " + puntuacion + ". \n¿Nueva partida?");

                    if (newGame == true) {
                        location.reload();
                    }
                }
            }
            if (posBolaX <= 0) {
                inclinacionX = -generateRandom()
                inclinacionY = generateRandomDir() * generateRandom()
            }
            if (posBolaX >= 800) {
                inclinacionX = generateRandom()
                inclinacionY = generateRandomDir() * generateRandom()
            }
        }
        dibujarBola(inclinacionX, inclinacionY)
    }
}

function generateRandomDir() {
    //-1 Izq, 1 Der
    let dir = [-1, 1]
    return dir[Math.floor(Math.random() * dir.length)];
}
function generateRandom(min = 5, max = 10) {
    // find diff
    let difference = max - min;
    // generate random number 
    let rand = Math.random();
    // multiply with difference 
    rand = Math.floor(rand * difference);
    // add with min value 
    rand = rand + min;
    return rand;
}
function reducir() {
    context.clearRect(posPlataformaX, posPlataformaY, anchoPlataforma, altoPlataforma)
    anchoPlataforma -= 25
}