let palabra;
let intentos;
const VERDE = '#144832';
const PURPURA = '#471448';
const BUTTON = document.getElementById("guess-button");


async function initGame() {
    console.log('Juego Iniciado');
    palabra = await getPalabraAleatoria();
    palabra = palabra.toUpperCase(); 
    intentos = palabra.length + 1;
    console.log(palabra);
    Swal.fire({
        title: "Importante",
        text: "Posees " + intentos + " intentos, la palabra posee " + palabra.length + " letras",
        width: 600,
        icon: "info",
        padding: "3em",
        color: "#716add",
        backdrop: "rgba(40, 55, 71,0.4)"
      });
}
function validarIntento() {
    const INTENTO = getIntento();
    if (INTENTO.length !== palabra.length) {
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "La palabra debe tener " + palabra.length + " letras",
            showConfirmButton: false,
            timer: 6000
          });
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
            SPAN.style.backgroundColor = PURPURA;
        }
        SPAN.innerHTML = INTENTO[i];
        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    intentos--;
    if (intentos === 0) {
        endGame("<h1>Perdiste. La palabra era: " + palabra + " 🤦‍♂️"+"</h1>");
    }
}

function endGame(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function getIntento() {
    return document.getElementById("guess-input").value.toUpperCase();
}

async function getPalabraAleatoria() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?lang=es&length=5");
        const data = await response.json();
        return String(data[0]);
    } catch (error) {
        console.error('Error al obtener la palabra:', error);
        return null;
    }
}

window.addEventListener('load', initGame);
BUTTON.addEventListener("click", validarIntento);