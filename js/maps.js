'use strict';

(function () {
  let adForm = window.main.MAIN.querySelector(`.ad-form`);
  let map = window.main.MAIN.querySelector(`.map`);

  let fieldsetElements = window.main.MAIN.querySelectorAll(`fieldset`);

  for (let fieldsetElement of fieldsetElements) {
    fieldsetElement.setAttribute(`disabled`, true);
  }

  let openPinPage = document.querySelector(`.map__pin--main`);
  let openPage = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    for (let fieldsetElement of fieldsetElements) {
      fieldsetElement.removeAttribute(`disabled`);
    }
    window.load(window.pinCard.onSuccess, window.pinCard.errorHandler);
  };

  openPinPage.addEventListener(`mousedown`, function (e) {
    if (e.button === 0) {
      openPage();
    }
  });

  openPinPage.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      openPage();
    }
  });
  window.maps = {
    openPinPage,
    map,
    adForm
  };
})();
