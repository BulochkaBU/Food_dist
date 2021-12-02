function modal(){
    // Modal
    const modalOpen = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');

    modalOpen.forEach(etem => {
        etem.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == ""){
            hideModal();
        }    
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            hideModal();
        }
    });

    function hideModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');   
        document.body.style.overflow = ''; 
    }

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timeOpenModal);
    }

    const timeOpenModal = setTimeout(openModal, 50000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }        
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;