// 1. CONFIGURACIÓN DE TUS ÁLBUMES
// Asegúrate de que los nombres aquí sean EXACTOS a tus archivos en GitHub
const albumes = {
    'editorial': ['edito1.jpg', 'edito2.jpg', 'edito3.jpg'], 
    'pasarela': ['pasarela1.jpg', 'pasarela2.jpg']
};

let fotosActuales = [];
let indiceActual = 0;

// 2. FUNCIÓN PARA ABRIR EL ÁLBUM
function abrirAlbum(id) {
    console.log("Abriendo álbum:", id); // Para revisar en la consola si hay error
    
    if (albumes[id]) {
        fotosActuales = albumes[id];
        indiceActual = 0;
        
        actualizarVista();
        
        document.getElementById('visor').style.display = "flex";
        document.body.style.overflow = "hidden"; // Bloquea el scroll de fondo
    } else {
        console.error("El álbum no existe o el ID está mal escrito");
    }
}

// 3. FUNCIÓN PARA MOSTRAR LA FOTO Y EL CONTADOR
function actualizarVista() {
    const contenedor = document.getElementById('fotos-contenedor');
    const contador = document.getElementById('contador');
    
    // Mostramos la foto actual
    contenedor.innerHTML = `<img src="${fotosActuales[indiceActual]}" class="foto-swipe">`;
    
    // Actualizamos el contador (ej: 1 / 5)
    if (contador) {
        contador.innerText = `${indiceActual + 1} / ${fotosActuales.length}`;
    }
}

// 4. FUNCIÓN PARA CAMBIAR FOTO (Llamada por las flechas)
function cambiarFoto(direccion) {
    console.log("Cambiando foto. Dirección:", direccion);
    
    indiceActual += direccion;

    // Si llega al final, vuelve al principio
    if (indiceActual >= fotosActuales.length) {
        indiceActual = 0;
    }
    // Si retrocede desde la primera, va a la última
    if (indiceActual < 0) {
        indiceActual = fotosActuales.length - 1;
    }

    actualizarVista();
}

// 5. FUNCIÓN PARA CERRAR
function cerrarVisor() {
    document.getElementById('visor').style.display = "none";
    document.body.style.overflow = "auto"; // Libera el scroll
}

// 6. DETECCIÓN DE DESLIZAMIENTO (SWIPE) PARA CELULARES
let touchStartX = 0;
let touchEndX = 0;

const visorElement = document.getElementById('visor');

visorElement.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

visorElement.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    manejarSwipe();
});

function manejarSwipe() {
    const diferencia = touchStartX - touchEndX;
    if (Math.abs(diferencia) > 50) { // Sensibilidad
        if (diferencia > 0) {
            cambiarFoto(1); // Deslizó a la izquierda -> Siguiente
        } else {
            cambiarFoto(-1); // Deslizó a la derecha -> Anterior
        }
    }
}
