function hideModal(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');   
    document.body.style.overflow = ''; 
}

function openModal(modalSelector, timeOpenModal){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(timeOpenModal);
    if (timeOpenModal){
        clearInterval(timeOpenModal);
    }

}

function modal(triggerSelector, modalSelector, timeOpenModal){
    // Modal
    const modalOpen = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalOpen.forEach(etem => {
        etem.addEventListener('click', () => openModal(modalSelector, timeOpenModal));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == ""){
            hideModal(modalSelector);
        }    
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            hideModal(modalSelector);
        }
    });

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal(modalSelector, timeOpenModal);
            window.removeEventListener('scroll', showModalByScroll);
        }        
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {hideModal};
export {openModal};