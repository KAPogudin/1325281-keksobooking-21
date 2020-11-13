'use strict';

(function () {

  const CHECKOUT_ARR = [`12:00`, `13:00`, `14:00`];
  const CHECKIN_ARR = [`12:00`, `13:00`, `14:00`];
  const FEATURES_ARR = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const TYPE_ARR = [`palace`, `flat`, `house`, `bungalow`];
  const PHOTOS_ARR = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MIN_NAME_LENGTH = 30;
  const MAX_NAME_LENGTH = 100;
  const MAX_PRICE = 1000000;
  const CONTEINER = document.querySelector(`main`);
  const WIDTH_SIZE_PIN = 32;
  const HEIGHT_SIZE_PIN = 75;
  const BUTTON_WIDTH_SIZE_PIN = 32;
  const BUTTON_HEIGHT_SIZE_PIN = 65;

  window.main = {
    CHECKOUT_ARR,
    CHECKIN_ARR,
    FEATURES_ARR,
    TYPE_ARR,
    PHOTOS_ARR,
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    MAX_PRICE,
    CONTEINER,
    WIDTH_SIZE_PIN,
    HEIGHT_SIZE_PIN,
    BUTTON_WIDTH_SIZE_PIN,
    BUTTON_HEIGHT_SIZE_PIN
  };

})();
