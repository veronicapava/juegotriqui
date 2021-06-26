const lasCajas = Array.from(document.getElementsByClassName('caja'));
const play = document.getElementById('play');
const botonRestaurar = document.getElementById('restaurar')
const marcaX = "X";
const marcaO = "O";
let jugadorActual;
let memoriaDeCasillas = [];   // Memoria del juego 

const inicializarTablero = () => {
    lasCajas.forEach((caja) => {
        caja.addEventListener('click', marcarCasilla)
    })
    botonRestaurar.addEventListener('click', reiniciarJuego);
}

function casillaEstaEnBlanco(i) {
    return !memoriaDeCasillas[i]
}

const marcarCasilla = (e) => {
    const boton = e.target
    const id = boton.id;

    if (casillaEstaEnBlanco(id)) {
        memoriaDeCasillas[id] = jugadorActual;
        boton.innerText = jugadorActual;

        if (hasGanado()) {
            play.innerText = `¡¡¡${jugadorActual}, has ganado!!!`;
            return
        }

        if (hayEmpate()) {
            play.innerText = `*** Nadie ha ganado ***`;
        }

        jugadorActual = (jugadorActual == marcaX) ? marcaO : marcaX;
    }
}

//Formas de ganar: 
// 0 1 2
// 3 4 5 
// 6 7 8

formasDeGanarHorizontal = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
formasDeGanarVertical = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
formasDeGanarDiagonal = [[0, 4, 8], [2, 4, 6]]
const todasLasFormasDeGanar = formasDeGanarHorizontal.concat(formasDeGanarVertical).concat(formasDeGanarDiagonal)

const hasGanado = () => {
    let resultado = false
    todasLasFormasDeGanar.forEach(forma => {
        const marca1 = memoriaDeCasillas[forma[0]]
        const marca2 = memoriaDeCasillas[forma[1]]
        const marca3 = memoriaDeCasillas[forma[2]]

        if (marca1 == jugadorActual && marca2 == jugadorActual && marca3 == jugadorActual) {
            resultado = true
        }
    })
    return resultado
}

function hayEmpate() {
    const numeroTurnos = contadorDeTurnos(memoriaDeCasillas)
    return (numeroTurnos == 9)
}

const contadorDeTurnos = array => {
    const filtrado = array.filter(ele => ele != undefined)
    return filtrado.length
}

const reiniciarJuego = () => {
    memoriaDeCasillas = []
    lasCajas.forEach(box => {
        box.innerText = '';
    });
    play.innerText = '¡Juguemos!';
    jugadorActual = marcaX
}

inicializarTablero()
reiniciarJuego()