'use strict';

(function () {
  let adForm = window.main.CONTEINER.querySelector(`.ad-form`);
  let map = window.main.CONTEINER.querySelector(`.map`);

  let fieldsetElements = window.main.CONTEINER.querySelectorAll(`fieldset`);

  for (let fieldsetElement of fieldsetElements) {
    fieldsetElement.setAttribute(`disabled`, true);
  }

  let openPinPage = document.querySelector(`.map__pin--main`);
  let active = false;

  let openPage = function () {
    window.maps.active = true;
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    for (let fieldsetElement of fieldsetElements) {
      fieldsetElement.removeAttribute(`disabled`);
    }
    window.load(window.filter.onSuccess, window.condition.onError);
    window.condition.loadFilters();
  };

  openPinPage.addEventListener(`mousedown`, function (e) {
    if (window.maps.active === false && e.button === 0) {
      openPage();
    }
  });

  openPinPage.addEventListener(`keydown`, function (evt) {
    if (window.maps.active === false && evt.key === `Enter`) {
      evt.preventDefault();
      openPage();
    }
  });
  window.maps = {
    active,
    openPinPage,
    map,
    adForm,
    fieldsetElements
  };
})();
