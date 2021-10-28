const funcionCerrar = (e) => {
    const modal = document.querySelector('.modal');
    modal.classList.add('invisible');
}

const idCerrar = ()=>{
    const boton = document.querySelector('.close__button');
    boton.addEventListener('click', funcionCerrar );
}

export default idCerrar;
