const albumes = {
    'editorial': ['foto1.jpeg', 'foto2.jpeg', 'foto3.jpeg', 'foto4.jpeg', 'foto5.jpeg'],
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
