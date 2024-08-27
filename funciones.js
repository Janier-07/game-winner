let iconos = [];
let selecciones = [];
let tiempoTranscurrido = 0;
let intervaloCronometro;
let puntos = 0;
let nivel;
let cronometroDetenido = false;
let nombreJugador = "";
let intentos = 0;
let tiempoRestante = 120;
let intervaloContador;




function obtenerNombre() {
    nombreJugador = document.getElementById("nombreInput").value;
    document.getElementById("nombre-container").style.display = "none";
    document.getElementById("nivel-container").style.display = "block";
    actualizarTextoJugador();
    document.getElementById("nombreUsuarioInicio").innerText = "Jugador: " + nombreJugador;
    document.getElementById("inicio-container").style.display = "block";
}

function mostrarPantallaInicio() {
    document.getElementById("nivel-container").style.display = "none";
    document.getElementById("inicio-container").style.display = "block";
    actualizarTextoJugador();
}

function iniciarJuego() {
    if (!nivel) {
        alert("Debes seleccionar una dificultad antes de iniciar el juego.");
        return;
    }



    cargarIconos();
    generarTablero();
    document.getElementById("nivel-container").style.display = "none";
    document.getElementById("inicio-container").style.display = "none";
    document.getElementById("cronometro-container").style.display = "block";
    actualizarTextoJugador();

    setTimeout(function () {
        mostrarTextoBienvenidaTiempo();
        iniciarCronometro();
        document.getElementById("botonDetener").style.display = "block";
        document.getElementById("botonRegresar").style.display = "block";
    }, 5000);
}

function actualizarTextoJugadorInicio() {
    let nombreInput = document.getElementById("nombreInput").value;
    let nombreJugadorElement = document.getElementById("nombreJugador");
    nombreJugadorElement.innerText = "Jugador: " + nombreInput;
    nombreJugadorElement.style.display = "block";

    let bienvenidaElement = document.createElement("user");
    bienvenidaElement.innerText = "¡Bienvenido " + nombreInput + ", estás en el nivel " + nivel + "!";
    bienvenidaElement.id = "bienvenida";
    let contenedorTextoJugador = document.getElementById("textoJugadorContainer");
    let elementoAnterior = document.getElementById("bienvenida");
    if (elementoAnterior) {
        contenedorTextoJugador.removeChild(elementoAnterior);
    }

  
    contenedorTextoJugador.appendChild(bienvenidaElement);
}

function actualizarTextoJugador() {
    let textoNombre = document.getElementById("textoNombre");
    textoNombre.innerText = "Jugador: " + nombreJugador;
    textoNombre.style.display = "block"; 
}

function detenerOReanudarCronometro() {
    if (cronometroDetenido) {
        reanudarCronometro();
    } else {
        detenerCronometro();
    }
}

function detenerCronometro() {
    clearInterval(intervaloCronometro);
    cronometroDetenido = true;
    document.getElementById("botonDetener").innerText = "Reanudar Cronómetro";
}

function reanudarCronometro() {
    intervaloCronometro = setInterval(function () {
        tiempoTranscurrido++;
        document.getElementById("tiempo").innerText = tiempoTranscurrido;
    }, 1000);
    cronometroDetenido = false;
    document.getElementById("botonDetener").innerText = "Detener Cronómetro";
}

function regresarAlInicio() {
    document.getElementById("nivel-container").style.display = "none";
    document.getElementById("cronometro-container").style.display = "none";
    document.getElementById("inicio-container").style.display = "none";
    document.getElementById("nombre-container").style.display = "block";
    detenerCronometro();
    limpiarTablero();
    document.getElementById("botonDetener").style.display = "none";
    document.getElementById("botonRegresar").style.display = "none";
}

function mostrarTextoInstantaneo() {
    let nombreInput = document.getElementById("nombreInput");
    let textoNombre = document.getElementById("textoNombre");
    textoNombre.innerText = "Jugador: " + nombreInput.value;
    textoNombre.style.display = "block";
}

function limpiarTablero() {
    document.getElementById("tablero").innerHTML = "";
}

function cargarIconos() {
    iconos = [
        '<i class="fas fa-star"></i>',
        '<i class="far fa-star"></i>',
        '<i class="fas fa-star-of-life"></i>',
        '<i class="fas fa-star-and-crescent"></i>',
        '<i class="fab fa-old-republic"></i>',
        '<i class="fab fa-galactic-republic"></i>',
        '<i class="fas fa-sun"></i>',
        '<i class="fas fa-stroopwafel"></i>',
        '<i class="fas fa-dice"></i>',
        '<i class="fas fa-chess-knight"></i>',
        '<i class="fas fa-chess"></i>',
        '<i class="fas fa-dice-d20"></i>',
        '<i class="fas fa-dragon"></i>',
        '<i class="fas fa-skull-crossbones"></i>',
        '<i class="fas fa-ghost"></i>',
        '<i class="fas fa-shield-halved"></i>',
        '<i class="fas fa-chess-rook"></i>',
        '<i class="fas fa-book-skull"></i>',
        '<i class="fas fa-user-secret"></i>',
        '<i class="fas fa-fish"></i>',
        '<i class="fas fa-chess-king"></i>',
        '<i class="fas fa-biohazard"></i>',
        '<i class="fas fa-cubes"></i>',
        '<i class="fas fa-icons"></i>'
    ];

    if (nivel === "facil") {
        iconos = obtenerCartasUnicas(iconos, 12);
        iconos = iconos.concat([...iconos]);
    } else if (nivel === "medio") {
        iconos = obtenerCartasUnicas(iconos, 18);
        iconos = iconos.concat([...iconos]);
    } else if (nivel === "dificil") {
        iconos = obtenerCartasUnicas(iconos, 24);
        iconos = iconos.concat([...iconos]);
    }
}

function obtenerCartasUnicas(array, cantidad) {
    let cartasUnicas = [];

    while (cartasUnicas.length < cantidad) {
        let carta = array[Math.floor(Math.random() * array.length)];
        if (cartasUnicas.indexOf(carta) === -1) {
            cartasUnicas.push(carta);
            array = array.filter(item => item !== carta);
        }
    }

    return cartasUnicas;
}

function mostrarMensajeFinal() {
    mostrarVentanaEmergente();
}

function generarTablero() {
    cargarIconos();
    selecciones = [];
    tiempoTranscurrido = 0;
    clearInterval(intervaloCronometro);

    let tablero = document.getElementById("tablero");
    let tarjetas = [];
    let numeroCartas = obtenerNumeroCartas();

    for (let i = 0; i < numeroCartas; i++) {
        tarjetas.push(`
            <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}" style="border: 1px solid #000; display: flex; align-items: center; justify-content: center;">
                    <div class="cara trasera" id="trasera${i}">
                        ${iconos[i]}
                    </div>
                    <div class="cara superior" style="width: 100px; height: 100px;"></div>
                </div>
            </div>`
        );
    }

    tarjetas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = tarjetas.join(" ");
}

function obtenerNumeroCartas() {
    switch (nivel) {
        case "facil":
            return 24;
        case "medio":
            return 36;
        case "dificil":
            return 48;
        default:
            return 32;
    }
}

function iniciarCronometro() {
    intervaloCronometro = setInterval(function () {
        tiempoTranscurrido++;
        document.getElementById("tiempo").innerText = tiempoTranscurrido;

        if (tiempoTranscurrido >= 150) {
            detenerCronometro();
            mostrarMensajeFinalTiempoAgotado();
        }
    }, 1000);
}


function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i);
    if (tarjeta.style.transform !== "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length === 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);
        if (trasera1.innerHTML !== trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
        } else {
            trasera1.style.background = "plum";
            trasera2.style.background = "plum";
            puntos += 1;
            actualizarMarcadorPuntos();

            if (todasParejasEncontradas()) {
                detenerCronometro();
                mostrarMensajeFinal();
            }
        }
    }, 1000);
}

function actualizarMarcadorPuntos() {
    document.getElementById("puntuacion").innerText = "Puntos: " + puntos;
}

function todasParejasEncontradas() {
    return puntos === obtenerNumeroCartas() / 2;
}

function seleccionarNivel(selectedNivel) {
    nivel = selectedNivel;
}


function mostrarPantallaInicio() {
    
    document.getElementById('nombre-container').style.display = 'none';
    

    document.getElementById('inicio-container').style.display = 'block';
}


function mostrarPantallaInicioConNombre() {
    obtenerNombre();
    actualizarTextoJugadorInicio();
    document.getElementById('nivel-container').style.display = 'none';
    document.getElementById('textoJugadorContainer').style.display = 'block'; 
    document.getElementById('inicio-container').style.display = 'block';
    let contenedorTextoJugador = document.getElementById("textoJugadorContainer");
    contenedorTextoJugador.insertBefore(bienvenidaElement, contenedorTextoJugador.firstChild);
}

function guardarNombre() {
    nombreJugador = document.getElementById("nombreInput").value;
    document.getElementById("nombreGuardado").innerText = "Nombre guardado: " + nombreJugador;
    document.getElementById("nombreGuardadoContainer").style.display = "block";
}

function obtenerNombre() {
    nombreJugador = document.getElementById("nombreInput").value;
    if (nombreJugador.trim() === "") {
        alert("Debes ingresar un nombre para continuar.");
        return;
    }
    document.getElementById("nombre-container").style.display = "none";
    document.getElementById("nivel-container").style.display = "block";
    actualizarTextoJugador();
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);
        if (trasera1.innerHTML !== trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";
            incrementarIntentos();
        } else {
            trasera1.style.background = "plum";
            trasera2.style.background = "plum";
            puntos += 1;
            actualizarMarcadorPuntos();

            if (todasParejasEncontradas()) {
                detenerCronometro();
                mostrarMensajeFinal();
            }
        }
    }, 1000);
}

function incrementarIntentos() {
    intentos += 1;
    document.getElementById("intentos").innerText = "Errores: " + intentos;
}







function iniciarContadorRegresivo() {
    intervaloContador = setInterval(function () {
        tiempoRestante--;
        document.getElementById("contadorRegresivo").innerText = tiempoRestante;

        if (tiempoRestante <= 0) {
            detenerCronometro();
            mostrarMensajeFinalTiempoAgotado();
        }
    }, 1000);
}

function detenerContadorRegresivo() {
    clearInterval(intervaloContador);
}



function mostrarTextoBienvenidaTiempo() {
    let nombreInput = document.getElementById("nombreInput").value;
    let bienvenidaTiempoElement = document.createElement("div");
    bienvenidaTiempoElement.innerText = "¡Bienvenido " + nombreInput + ", estás en el nivel " + nivel + "!";
    bienvenidaTiempoElement.id = "bienvenidaTiempo";
    let contenedorCronometro = document.getElementById("cronometro-container");
    let elementoAnterior = document.getElementById("bienvenidaTiempo");
    if (elementoAnterior) {
        contenedorCronometro.removeChild(elementoAnterior);
    }
    contenedorCronometro.appendChild(bienvenidaTiempoElement);


    
}

// JavaScript code for showing the button only on the initial screen
document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have a function to check the current screen
    if (isInitialScreen()) {
        document.getElementById('verRegistrosBtn').style.display = 'block';
    }
});

// Function to check the current screen (modify this based on your implementation)
function isInitialScreen() {
    // Add your logic to check if the current screen is the initial screen
    // For example, you can check the visibility of elements or other conditions
    return document.getElementById('nombreForm') !== null;
}


// Add this JavaScript code to handle the leaderboard functionality

/// Aquí coloca el resto de tu código JavaScript...

// Sample leaderboard data (replace this with your actual data)
const leaderboardData = [
    { jugador: "Player1", nivel: "Fácil", errores: 2, aciertos: 8, tiempo: "00:30", completado: true },
    { jugador: "Player2", nivel: "Medio", errores: 1, aciertos: 9, tiempo: "00:45", completado: true },
    // Add more data as needed
];

// Function to populate the leaderboard table
function mostrarRegistros() {
    const data = leaderboardData;
    data.sort((a, b) => b.aciertos - a.aciertos);
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
    data.forEach((record) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.jugador}</td>
            <td>${record.nivel}</td>
            <td>${record.errores}</td>
            <td>${record.aciertos}</td>
            <td>${record.tiempo}</td>
            <td>${record.completado ? 'Sí' : 'No'}</td>
        `;
        leaderboardBody.appendChild(row);
    });
    document.getElementById('nombre-container').style.display = 'none';
    document.getElementById('leaderboard-container').style.display = 'block';
}

function regresarAlInicioDesdeLeaderboard() {
    document.getElementById('leaderboard-container').style.display = 'none';
    document.getElementById('nombre-container').style.display = 'block';
}


function mostrarVentanaEmergente() {
    let ventanaEmergente = document.createElement("div");
    ventanaEmergente.className = "ventana-emergente";
    ventanaEmergente.innerHTML = `
        <div class="contenido-ventana">
            <h2>Felicitaciones, ${document.getElementById("nombreInput").value}!</h2>
            <p>¡Lograste superar el nivel ${nivel}!</p>
            <p>Obtuviste ${puntos} puntos con ${intentos} errores.</p>
            <button class="btn-cerrar" onclick="cerrarVentanaEmergente()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(ventanaEmergente);  
}



function cerrarVentanaEmergente() {
    let ventanaEmergente = document.querySelector(".ventana-emergente");
    document.body.removeChild(ventanaEmergente);
    mostrarRegistros();  // Mostrar registros después de cerrar la ventana emergente
}

  
function mostrarMensajeFinalTiempoAgotado() {
    let ventanaEmergente = document.createElement("div");
    ventanaEmergente.className = "ventana-emergente";
    ventanaEmergente.innerHTML = `
        <div class="contenido-ventana">
            <h2>¡Tiempo Agotado!</h2>
            <p>Lo siento, ${document.getElementById("nombreInput").value}, no lograste completar el nivel ${nivel} a tiempo.</p>
            <p>Obtuviste ${puntos} puntos con ${intentos} errores.</p>
            <button class="btn-cerrar" onclick="cerrarVentanaEmergente()">Cerrar</button>
            <button class="btn-ver-registros" onclick="mostrarRegistros()">Ver Registros</button>
        </div>
    `;
    document.body.appendChild(ventanaEmergente);
}
    

    // Función para mostrar la pantalla de leaderboard
function mostrarRegistros() {
    // Obtener la tabla del leaderboard
    var leaderboardTable = document.getElementById("leaderboardTable");

    // Limpiar el cuerpo de la tabla antes de agregar nuevos registros
    var leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = "";

    // Lógica para obtener registros del servidor (debes implementar esta parte)
    obtenerRegistrosDelServidor().then(function (registros) {
        // Ejemplo de cómo agregar registros (debes ajustar según tu estructura de datos)
        registros.forEach(function (registro) {
            var row = leaderboardBody.insertRow();
            row.insertCell(0).innerHTML = registro.jugador;
            row.insertCell(1).innerHTML = registro.nivel;
            row.insertCell(2).innerHTML = registro.errores;
            row.insertCell(3).innerHTML = registro.aciertos;
            row.insertCell(4).innerHTML = registro.tiempo;
            row.insertCell(5).innerHTML = registro.completado;
        });

        // Mostrar la pantalla de leaderboard
        document.getElementById("nombre-container").style.display = "none";
        document.getElementById("leaderboard-container").style.display = "block";
    });
}

// Función para regresar al inicio desde la pantalla de leaderboard
function regresarAlInicioDesdeLeaderboard() {
    document.getElementById("nombre-container").style.display = "block";
    document.getElementById("leaderboard-container").style.display = "none";
}

// Función de ejemplo para obtener registros (debes ajustar según tu lógica)
function obtenerRegistrosDelServidor() {
    // Aquí puedes realizar una solicitud AJAX para obtener registros del servidor
    // y devolverlos como un array de objetos.
    // Ejemplo:
    // return fetch('url_del_servidor')
    //   .then(response => response.json())
    //   .then(data => data.registros);
    
    // Por ahora, devolver un array de registros de ejemplo (simulado con una promesa)
    return new Promise(function (resolve) {
        var registrosEjemplo = [
            { jugador: 'Ejemplo1', nivel: 'Fácil', errores: 2, aciertos: 10, tiempo: '5:30', completado: 'Sí' },
            { jugador: 'Ejemplo2', nivel: 'Medio', errores: 5, aciertos: 15, tiempo: '8:45', completado: 'Sí' },
            // ... Más registros
        ];

        // Simulando una demora en la respuesta del servidor (puedes quitar esto en tu aplicación real)
        setTimeout(function () {
            resolve(registrosEjemplo);
        }, 1000); // Simular 1 segundo de demora
    });
}
