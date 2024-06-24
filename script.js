const BUTTON = document.getElementById("guess-button");
let intentos = 6;
let palabraSecreta = 'APPLE';

window.addEventListener('load', init = () => { 

    console.log('Juego Iniciado'); 

});

BUTTON.addEventListener("click", intentar = () => {

    const INTENTO = getIntento();
    if (INTENTO === palabraSecreta ) {
        terminar("<h1>GANASTE!😀</h1>")
        return
    }

    for (let i in palabraSecreta) {
        if (INTENTO[i]===palabraSecreta[i]){
            console.log(INTENTO[i], "VERDE")
        } else if (palabraSecreta.includes(INTENTO[i]) ) {
            console.log(INTENTO[i], "AMARILLO")
        } else {
            console.log(INTENTO[i], "GRIS")
        }
    }
	
    intentos--
    if (intentos===0) {
        terminar("<h1>PERDISTE!😖</h1>")
    }

});

function getIntento() { 
    let input = document.getElementById('guess-input');
    return input.value.toUpperCase();
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}