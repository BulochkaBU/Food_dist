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