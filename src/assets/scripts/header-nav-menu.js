const agregarClase = (e) => {
    const modal = document.querySelector('.header__nav ul');
    modal.classList.toggle('visible');
}

const eventoMenu = ()=>{
    const boton = document.querySelector('.header__nav--button');
    //console.log(boton);
    boton.addEventListener('click', agregarClase );
}

export default eventoMenu;