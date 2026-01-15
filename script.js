// 1. LISTA DE FOTOS POR ÁLBUM
// Importante: Pon los nombres de tus fotos tal cual aparecen en GitHub
const albumes = {
    'editorial': ['foto1.jpeg', 'foto2.jpeg', 'foto3.jpeg','foto4.jpeg','foto5.jpeg'], 
    'pasarela': ['pasarela1.jpeg', 'pasarela2.jpeg', 'pasarela3.jpeg']
};

let fotosActuales = [];
let indiceActual = 0;

function abrirAlbum(id) {
    if (!albumes[id]) return;
    fotosActuales = albumes[id];
    indiceActual = 0;
    actualizarVista();
    document.getElementById('visor').style.display = "flex";
    document.body.style.overflow = "hidden";
}

function actualizarVista() {
    const contenedor = document.getElementById('fotos-contenedor');
    const contador = document.getElementById('contador');
    
    // IMPORTANTE: Añadimos 'draggable="false"' para que el navegador no intente "arrastrar" la imagen
    contenedor.innerHTML = `<img src="${fotosActuales[indiceActual]}" class="foto-swipe" draggable="false">`;
    if (contador) contador.innerText = `${indiceActual + 1} / ${fotosActuales.length}`;
}

function cambiarFoto(dir) {
    indiceActual += dir;
    if (indiceActual >= fotosActuales.length) indiceActual = 0;
    if (indiceActual < 0) indiceActual = fotosActuales.length - 1;
    actualizarVista();
}

function cerrarVisor() {
    document.getElementById('visor').style.display = "none";
    document.body.style.overflow = "auto";
}

// --- SISTEMA SWIPE MEJORADO ---
let xDown = null;                                                        
let yDown = null;

const visor = document.getElementById('visor');

visor.addEventListener('touchstart', function(evt) {
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
}, false);                                                

visor.addEventListener('touchmove', function(evt) {
    if ( ! xDown || ! yDown ) return;

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    // Solo si el movimiento es horizontal (para no cambiar foto si solo quieres cerrar)
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 5 ) {
            cambiarFoto(1);  /* swipe izquierda */
        } else {
            cambiarFoto(-1); /* swipe derecha */
        }                       
    }
    
    // Resetear valores para el siguiente toque
    xDown = null;
    yDown = null;                                             
}, false);
