window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          timer = require('./modules/timer'),
          modal = require('./modules/modal'),
          form = require('./modules/form'),
          slides = require('./modules/slides'),
          cards = require('./modules/cards'),
          calc = require('./modules/calc');

    tabs();
    timer();
    modal();
    form();
    slides();
    cards();
    calc();

    // webpack

});