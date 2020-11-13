'use strict';

(function () {
  let pins = [];
  let pinsElements = [];
  let mapFiltersSelect = window.main.CONTEINER.querySelectorAll(`.map__filters select`);
  let housingFeatures = window.main.CONTEINER.querySelector(`#housing-features`);

  let pinRemove = function () {
    for (let pin of window.condition.pins) {
      pin.remove();
    }
    if (window.main.CONTEINER.querySelector(`.map__card`)) {
      window.main.CONTEINER.querySelector(`.map__card`).remove();
      document.removeEventListener(`keydown`, onPopupEscPressCard);
    }
  };

  let onPopupEscPressCard = function (e) {
    let card = window.main.CONTEINER.querySelector(`.map__card`);
    if (e.key === `Escape`) {
      e.preventDefault();
      card.remove();
      document.removeEventListener(`keydown`, onPopupEscPressCard);
    }
  };

  let resetMap = function () {
    window.maps.adForm.reset();
    window.form.address.value = `${window.form.locationStart.x}, ${window.form.locationStart.y}`;
    window.maps.openPinPage.style.left = window.form.locationStart.x + `px`;
    window.maps.openPinPage.style.top = window.form.locationStart.y + `px`;
  };

  let resetButton = window.maps.adForm.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, function (e) {
    e.preventDefault();
    resetPage();
    resetMap();
  });

  let resetFilters = function () {
    for (let mapFilterSelect of mapFiltersSelect) {
      mapFilterSelect.setAttribute(`disabled`, true);
    }
    housingFeatures.setAttribute(`disabled`, true);
  };
  resetFilters();

  let loadFilters = function () {
    for (let mapFilterSelect of mapFiltersSelect) {
      mapFilterSelect.removeAttribute(`disabled`);
    }
    housingFeatures.removeAttribute(`disabled`);
  };

  let onError = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `padding: 20px; transform: translateX(-50%); z-index: 100; margin: 0 auto; text-align: center; background-color: #ffffff; border: 3px solid red; border-radius: 10px;`;
    node.style.position = `absolute`;
    node.style.left = 50 + `%`;
    node.style.top = 50 + `%`;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
    resetFilters();
  };

  let onErrorUpload = function () {
    window.main.CONTEINER.appendChild(window.pinCard.renderError());
    document.addEventListener(`keydown`, onEscPressError);
    let buttonErrorClose = window.main.CONTEINER.querySelector(`.error__button`);
    buttonErrorClose.addEventListener(`click`, onCloseError);
    document.addEventListener(`click`, onCloseError);
  };

  let onCloseError = function () {
    let error = window.main.CONTEINER.querySelector(`.error`);
    error.remove();
    document.removeEventListener(`click`, onCloseError);
  };

  let onCloseSuccess = function () {
    let success = window.main.CONTEINER.querySelector(`.success`);
    success.remove();
    document.removeEventListener(`keydown`, onCloseSuccess);
    document.removeEventListener(`click`, onCloseSuccess);
  };

  let onEscPressError = function (e) {
    if (e.key === `Escape`) {
      e.preventDefault();
      onCloseError();
      document.removeEventListener(`keydown`, onEscPressError);
      document.removeEventListener(`click`, onEscPressError);
    }
  };

  let onEscPressSuccess = function (e) {
    if (e.key === `Escape`) {
      e.preventDefault();
      onCloseSuccess();
      document.removeEventListener(`keydown`, onEscPressSuccess);
    }
  };

  let resetPage = function () {
    window.maps.active = false;
    window.maps.adForm.classList.add(`ad-form--disabled`);
    window.maps.map.classList.add(`map--faded`);
    for (let fieldsetElement of window.maps.fieldsetElements) {
      fieldsetElement.setAttribute(`disabled`, true);
    }
    resetFilters();
    pinRemove();
    window.main.CONTEINER.appendChild(window.pinCard.renderSuccess());
    document.addEventListener(`keydown`, onEscPressSuccess);
    document.addEventListener(`click`, onCloseSuccess);
  };

  let onFormSubmit = function () {
    resetPage();
    resetMap();
  };

  window.condition = {
    pins,
    pinsElements,
    onError,
    onErrorUpload,
    onEscPressSuccess,
    onFormSubmit,
    onPopupEscPressCard,
    pinRemove,
    loadFilters
  };
})();
