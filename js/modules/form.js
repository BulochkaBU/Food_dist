function form(){
// Form

    const forms = document.querySelectorAll('form');

    forms.forEach(form =>{
        bindPostData(form);
    });

    const message = {
        loading: "img/modal/spinner.svg",
        succes: "We will call you soon",
        failure: "Something is broken"
    }; 

    const postData = async (url, data) => {
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) =>{
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage); 

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThankModal(message.succes);
                statusMessage.remove();
            }).catch( () => {
                showThankModal(message.failure);
            }).finally( () => {
                form.reset();
            });
        });
    }

    function showThankModal(message){
        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('hide');
        openModal();

        const thankModal = document.createElement('div');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>    
        `;
        document.querySelector('.modal').append(thankModal);

        setTimeout(() =>{
            thankModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            hideModal();
        },4000);
    }

}

module.exports = form;