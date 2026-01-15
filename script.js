const albumes = {
    'editorial': ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'],
    'pasarela': ['pasarela1.jpeg', 'pasarela2.jpeg', 'pasarela3.peg']
};

function abrirAlbum(id) {
    const visor = document.getElementById('visor');
    const contenedor = document.getElementById('fotos-contenedor');
    contenedor.innerHTML = "";
    
    albumes[id].forEach(fotoUrl => {
        const img = document.createElement('img');
        img.src = fotoUrl;
        contenedor.appendChild(img);
    });

    visor.style.display = "flex";
}

function cerrarVisor() {
    document.getElementById('visor').style.display = "none";
}