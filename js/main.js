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
  const MAIN = document.querySelector(`main`);

  window.main = {
    CHECKOUT_ARR,
    CHECKIN_ARR,
    FEATURES_ARR,
    TYPE_ARR,
    PHOTOS_ARR,
    MIN_NAME_LENGTH,
    MAX_NAME_LENGTH,
    MAX_PRICE,
    MAIN
  };

})();
