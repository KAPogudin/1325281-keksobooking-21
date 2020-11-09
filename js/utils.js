'use strict';

(function () {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomElement(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  }

  function getRandomArray(array) {
    let result = [];
    let length = Math.floor(Math.random() * array.length + 1);
    for (let i = 0; i < length; i++) {
      let rand = Math.floor(Math.random() * array.length);
      if (result.indexOf(array[rand]) === -1) {
        result.push(array[rand]);
      }
    }
    return result;
  }

  let engToRuMap = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  window.utils = {
    getRandomInt,
    getRandomElement,
    getRandomArray,
    engToRuMap
  };
})();
