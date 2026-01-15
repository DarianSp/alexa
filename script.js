// 1. LISTA DE FOTOS POR ÁLBUM
// Importante: Pon los nombres de tus fotos tal cual aparecen en GitHub
const albumes = {
    'editorial': ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'], 
    'pasarela': ['pasa1.jpg', 'pasa2.jpg', 'pasa3.jpg']
};

let fotosActuales = [];
let indiceActual = 0;

// 2. ABRIR EL ÁLBUM
function abrirAlbum(id) {
    if (albumes[id]) {
        fotosActuales = albumes[id];
        indiceActual = 0;
        actualizarVisor();
        document.getElementById('visor').style.display = "flex";
        document.body.style.overflow = "hidden"; // Evita que la página se mueva atrás
    }
}

// 3. ACTUALIZAR LA FOTO EN PANTALLA
function actualizarVisor() {
    const contenedor = document.getElementById('fotos-contenedor');
    const contador = document.getElementById('contador');
    
    // Cambiamos la imagen
    contenedor.innerHTML = `<img src="${fotosActuales[indiceActual]}" class="foto-swipe">`;
    
    // Actualizamos el numerito (ej: 1 / 5)
    if (contador) {
        contador.innerText = `${indiceActual + 1} / ${fotosActuales.length}`;
    }
}

// 4. CAMBIAR FOTO (Llamada por botones o swipe)
function cambiarFoto(dir) {
    indiceActual += dir;
    if (indiceActual >= fotosActuales.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = fotosActuales.length - 1;
    actualizarVisor();
}

// 5. CERRAR EL VISOR
function cerrarVisor() {
    document.getElementById('visor').style.display = "none";
    document.body.style.overflow = "auto";
}

// 6. DETECTAR EL MOVIMIENTO DEL DEDO (SWIPE)
let toqueInicialX = 0;

// Cuando el dedo toca la pantalla
document.getElementById('visor').addEventListener('touchstart', function(e) {
    toqueInicialX = e.touches[0].clientX;
}, false);

// Cuando el dedo se levanta de la pantalla
document.getElementById('visor').addEventListener('touchend', function(e) {
    let toqueFinalX = e.changedTouches[0].clientX;
    let distanciaX = toqueInicialX - toqueFinalX;

    // Si el movimiento fue mayor a 50 píxeles, cambiamos la foto
    if (Math.abs(distanciaX) > 50) {
        if (distanciaX > 0) {
            cambiarFoto(1);  // Deslizó a la izquierda -> Siguiente
        } else {
            cambiarFoto(-1); // Deslizó a la derecha -> Anterior
        }
    }
}, false);
