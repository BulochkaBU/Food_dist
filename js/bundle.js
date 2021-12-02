/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        ratio = localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        ratio = localStorage.setItem('ratio', 1.375);
    }

    function setLocalStorageSettings(selector, classActive){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(classActive);
            if (elem.getAttribute('id') === localStorage.getItem('sex') || elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(classActive);
            }
        });
    }

    setLocalStorageSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    setLocalStorageSettings('#gender div', 'calculating__choose-item_active');
    
    function calcTotal(){
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = "____";
            return;
        }

        if (sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, classActive){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }  
                elements.forEach(elem => {
                    elem.classList.remove(classActive);
                });
    
                e.target.classList.add(classActive);
                calcTotal();
                
            });
        });
    
    }

    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender div', 'calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)){
                input.style.border = '3px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
        // Class MenuCard
    
    class MenuCard{
        constructor(title, description, price, image, altImage, parentSelector, ...classes){
            this.title = title;
            this.description = description;
            this.price = price;
            this.image = image;
            this.altImage = altImage;
            this.dollar = 27;
            this.parentSelector = parentSelector;
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.dollar;
        }

        render(){
            const newCard = document.createElement('div');

            if (this.classes.length === 0){
                this.classes = 'menu__item';
                newCard.classList.add(this.classes);
            } else {
                this.classes.forEach(className => newCard.classList.add(className));
            }

            newCard.innerHTML = `
                <img src=${this.image} alt=${this.altImage}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            document.querySelector(this.parentSelector).append(newCard);
        }
    }

    const getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok){
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };


    axios.get('http://localhost:3000/menu')
        .then(obj => {
            obj.data.forEach(({title, descr, price, img, altimg}) => {
            new MenuCard(title, descr, price, img, altimg,'.menu .container').render();
            });
        });

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((module) => {

function slides(){
    // Slider
    const sliderWapper = document.querySelector('.offer__slider-wrapper'),
          width = window.getComputedStyle(sliderWapper).width,
          slidesField = document.querySelector('.offer__slider-inner'),
          sliders = sliderWapper.querySelectorAll('.offer__slide'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          arrowPrev = document.querySelector('.offer__slider-prev'),
          arrowNext = document.querySelector('.offer__slider-next'),
          slider = document.querySelector('.offer__slider');      

    let slideIndex = 1;
    total.innerHTML = `<span id="total">${getZero(sliders.length)}</span>`;
    addCurrentCount(current, slideIndex);

    slidesField.style.width = 100 * sliders.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderWapper.style.overflow = 'hidden';

    sliders.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          dotsArray = [];

    dots.classList.add('indicator-sliders');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(dots);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-dot-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0){
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArray.push(dot);
    }

    let offset = 0;
    
    arrowNext.addEventListener('click', () => {
        if (offset == RegExpWidth(width)  * (sliders.length - 1)){
            offset = 0;
        } else {
            offset += RegExpWidth(width) ;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == sliders.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addCurrentCount(current, slideIndex);

        dotActive(dotsArray, slideIndex);
    });

    arrowPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = RegExpWidth(width)  * (sliders.length - 1);
        } else {
            offset -= RegExpWidth(width) ;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1){
            slideIndex = sliders.length;
        } else {
            slideIndex--;
        }

        addCurrentCount(current, slideIndex);

        dotActive(dotsArray, slideIndex);
    });

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-dot-to');

            slideIndex = slideTo;

            offset = RegExpWidth(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            addCurrentCount(current, slideIndex);

            dotActive(dotsArray, slideIndex);

        });
    });
    
    function dotActive(array, i){
        array.forEach(dot => dot.style.opacity = '.5');
        array[i - 1].style.opacity = 1;
    }
    
    function addCurrentCount(elem, index){
        elem.innerHTML = `<span id="current">${getZero(index)}</span>`;
    }

    function RegExpWidth(str){
        return +str.replace(/\D/g, '');
    }
}

module.exports = slides;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabContent = document.querySelectorAll('.tabcontent'),
    tabParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabContent[i].classList.add('block', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');        
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab, i) => {
                if (tab == target){
                    hideTabContent();
                    showTabContent(i);                    
                }
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer(){
    // Timer
    const deadline = '2022-01-01';

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()), 
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }            
        }
    }

    setClock('.timer', deadline);

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
          slides = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    timer();
    modal();
    form();
    slides();
    cards();
    calc();
    

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map