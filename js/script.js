import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import form from './modules/form';
import slides from './modules/slides';
import cards from './modules/cards';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const timeOpenModal = setTimeout(() => openModal('.modal', timeOpenModal), 5000);


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
    timer('.timer', '2022-01-01');
    modal('[data-modal]', '.modal', timeOpenModal);
    form('form', timeOpenModal);
    slides({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    cards();
    calc();

    // webpack

});