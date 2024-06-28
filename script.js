let intentos = 6;
const VERDE = 'green';
const AMARILLO = 'yellow';
const BUTTON = document.getElementById("guess-button");
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

function initGame() {
    console.log('Juego Iniciado');
}

function validarIntento() {
    const INTENTO = getIntento();
    if (INTENTO.length !== palabra.length) {
        alert("El intento debe tener " + palabra.length + " letras.");
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    if (INTENTO === palabra) {
        endGame("<h1>GANASTE!😀</h1>");
        return;
    }

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) {
            SPAN.style.backgroundColor = VERDE;
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.style.backgroundColor = AMARILLO;
        }
        SPAN.innerHTML = INTENTO[i];
        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    intentos--;
    if (intentos === 0) {
        endGame("<h1>Perdiste. La palabra era: " + palabra + "</h1>");
    }
}

function endGame(mensaje) {
    document.getElementById("game-over").innerHTML = mensaje;
    BUTTON.removeEventListener("click", validarIntento);
}

function getIntento() {
    return document.getElementById("guess-input").value.toUpperCase();
}

window.addEventListener('load', initGame);
BUTTON.addEventListener("click", validarIntento);