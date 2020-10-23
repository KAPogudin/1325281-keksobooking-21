"use strict";
//* константы
(function () {

  window.utilityData = {

    APARTMENT_TYPE: [`palace`, `flat`, `house`, `bungalow`],
    CHECK_TIMES: [`12:00`, `13:00`, `14:00`],
    FACILITIES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`, {description: `строка с описанием`}],
    PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
    MAX_X_VALUE: 600,
    MAX_Y_VALUE: 350,
    MAX_ROOMS_QUANTITY: 3,
    MAX_GUEST_QUANTITY: 3,
    INITIAL_Y_CORD: 180,
    FINAL_Y_CORD: 630,
    INITIAL_X_CORD: 50,
    FINAL_X_CORD: 1150,
    ADV_PIN_WIDTH: 50,
    ADV_PIN_HEIGHT: 70,
    MAX_PRICE_AVAILABLE: 1000000,
    MIN_PRICE_AVAILABLE: 1000,
    PIN_BOTTOM_HEIGHT: 22,
    EVENT_CODE: {
      MOUSE_LEFT_BTN: 0,
      MOUSE_MIDDLE_BTN: 1,
      MOUSE_RIGHT_BTN: 2,
      KEYBOARD_ESCAPE: `Escape`,
      KEYBOARD_SPACE: `Space`,
      KEYBOARD_ENTER: `Enter`,
      KEYBOARD_NUMPAD_ENTER: `NumpadEnter`,
    },
  };

})();
/**формы */
(function () {

  window.utilityForm = {

    toggleDisableAttr: function (collectedElements) {
      collectedElements.forEach(function (element) {
        element.toggleAttribute(`disabled`);
      });
    },

    setTargetCords: function (elemPlaceholder, elemTarget, correctionValue = 0) {
      elemPlaceholder.value = `${Math.floor(parseInt(elemTarget.style.left, 10) + elemTarget.clientWidth * 0.5)} ,
 ${Math.floor(parseInt(elemTarget.style.top, 10) + elemTarget.clientHeight + correctionValue)}`;
    },

    setBorderErrorStyle: function (elem) {
      elem.style.border = `1px solid #ffaa99`;
      elem.style.boxShadow = `0 0 2px 2px #ff6547`;
      elem.style.transition = `0.5s`;
      setTimeout(function () {
        elem.style.border = ``;
        elem.style.boxShadow = ``;
      }, 3500);
    },

    checkValidity: function (priceArea, roomsArea, guestsArea) {
      if (priceArea.value < window.utilityData.MIN_PRICE_AVAILABLE || priceArea.value > window.utilityData.MAX_PRICE_AVAILABLE) {
        window.utilityForm.setBorderErrorStyle(priceArea);
        priceArea.setCustomValidity(`  Пожалуйста, укажите сумму от 1000 до миллиона =^_^=  `);
      } else {
        priceArea.setCustomValidity(``);
      }
      if (roomsArea.value !== guestsArea.value) {
        window.utilityForm.setBorderErrorStyle(roomsArea);
        window.utilityForm.setBorderErrorStyle(guestsArea);
        roomsArea.setCustomValidity(`  Количество комнат и количество мест должны совпадать =^_^=  `);
      } else {
        roomsArea.setCustomValidity(``);
      }
    }

  };

})();

//***шаблон и рандом число */
(function () {

  window.utilityGenerateMockup = {

    getRandomFromInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    getRandomFromArray: function (dataArr) {
      return dataArr[window.utilityGenerateMockup.getRandomFromInterval(0, dataArr.length - 1)];
    },

    getSetFromArrayItems: function (arr) {
      let newArr = [];
      let quantityVar = window.utilityGenerateMockup.getRandomFromInterval(1, arr.length);
      for (let i = 0; i < quantityVar; i++) {
        newArr.push(arr[i]);
      }
      return newArr;
    },

    getRandomAdvs: function (numberOfAdvs) {
      let advsArray = [];
      for (let i = 0; i < numberOfAdvs; i++) {
        advsArray.push({
          author: {
            avatar: `img/avatars/user0${i + 1}.png`
          },
          offer: {
            title: `Описание квартиры скоро будет здесь`,
            address: `${window.utilityGenerateMockup.getRandomFromInterval(0, window.utilityData.MAX_X_VALUE)}, ${window.utilityGenerateMockup.getRandomFromInterval(0, window.utilityData.MAX_Y_VALUE)}`,
            prise: (function () {
              let rawPrice = window.utilityGenerateMockup.getRandomFromInterval(0, Math.floor(window.utilityData.MAX_PRICE_AVAILABLE));
              return rawPrice - (rawPrice % 100);
            })(),
            type: `${window.utilityGenerateMockup.getRandomFromArray(window.utilityData.APARTMENT_TYPE)}`,
            rooms: window.utilityGenerateMockup.getRandomFromInterval(1, window.utilityData.MAX_ROOMS_QUANTITY),
            guests: window.utilityGenerateMockup.getRandomFromInterval(1, window.utilityData.MAX_GUEST_QUANTITY),
            checkin: `${window.utilityGenerateMockup.getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
            checkout: `${window.utilityGenerateMockup.getRandomFromArray(window.utilityData.CHECK_TIMES)}`,
            features: window.utilityGenerateMockup.getSetFromArrayItems(window.utilityData.FACILITIES),
            photos: window.utilityGenerateMockup.getSetFromArrayItems(window.utilityData.PHOTOS),
          },
          location: {
            x: window.utilityGenerateMockup.getRandomFromInterval(window.utilityData.INITIAL_X_CORD, window.utilityData.FINAL_X_CORD),
            y: window.utilityGenerateMockup.getRandomFromInterval(window.utilityData.INITIAL_Y_CORD, window.utilityData.FINAL_Y_CORD),
          },
        });
      }
      // console.log(advsArray);
      return advsArray;
    },

    renderPins: function (singleAdvertisement, contentElem) {
      let singleElement = contentElem.cloneNode(true);
      singleElement.style.left = singleAdvertisement.location.x - window.utilityData.ADV_PIN_WIDTH * 0.5 + `px`;
      singleElement.style.top = singleAdvertisement.location.y - window.utilityData.ADV_PIN_HEIGHT + `px`;
      singleElement.querySelector(`img`).src = singleAdvertisement.author.avatar;
      singleElement.querySelector(`img`).alt = singleAdvertisement.offer.title;
      return singleElement;
    },

    getRandomAdvsInFragment: function (numberOfAdvs, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      let advsArray = window.utilityGenerateMockup.getRandomAdvs(numberOfAdvs);
      advsArray.forEach(function (advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsElement, contentElem));
      });
      return targetTemplate;
    },

    getReceivedAdvsInFragment: function (receivedArr, contentElem) {
      let targetTemplate = document.createDocumentFragment();
      receivedArr.forEach(function (advsElement) {
        targetTemplate.appendChild(window.utilityGenerateMockup.renderPins(advsElement, contentElem));
      });
      return targetTemplate;
    },

  };

})();
//***фрагмент */
(function () {

  window.utilityMap = {
    renderFragment: function (listElem, fragmentElem) {
      return listElem.appendChild(fragmentElem);
    },
  };

})();

/***Загрузка */

(function () {

  window.utilityLoad = {

    Url: `https://21.javascript.pages.academy/keksobooking/data`,
    TimeOutInMs: 10000,
    StatusCode: {
      Ok: 200,
      WrongRequest: 400,
      UserNotRegistered: 401,
      NotFound: 404,
    },

    getXHRequest: function (onSuccess, onError) {

      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;
      xhr.addEventListener(`load`, function () {

        let error;
        switch (xhr.status) {
          case window.utilityLoad.StatusCode.Ok:
            onSuccess(xhr.response);
            break;
          case window.utilityLoad.StatusCode.WrongRequest:
            error = `ошибка: Неверный запрос`;
            break;
          case window.utilityLoad.StatusCode.UserNotRegistered:
            error = `ошибка: Пользователь не авторизован`;
            break;
          case window.utilityLoad.StatusCode.NotFound:
            error = `ошибка: Ничего не удалось найти =^⌒^=`;
            break;
          default:
            error = `ошибка: Cтатус ответа ${xhr.status} ${xhr.statusText}`;
        }

        if (error) {
          onError(error);
        }

      });

      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });

      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ' + ${xhr.timeout} + мс`);
      });

      xhr.timeout = this.TimeOutInMs;
      xhr.open(`GET`, this.Url);
      xhr.send();

    }
  };

})();

//**Задаем елеманты */

const mapBlock = document.querySelector(`.map`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainFormElement = document.querySelector(`.ad-form`);
const formInputs = mainFormElement.querySelectorAll(`fieldset`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapSelects = mapFilterForm.querySelectorAll(`select`);
const adressInput = mainFormElement.querySelector(`#address`);
const roomsQuantity = mainFormElement.querySelector(`#room_number`);
const priceElem = mainFormElement.querySelector(`#price`);
const guestsQuantity = mainFormElement.querySelector(`#capacity`);
const publishButton = mainFormElement.querySelector(`.ad-form__submit`);
const similarPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarListOfPins = document.querySelector(`.map__pins`);

let activateFlag = false;

const checkForm = function () {
  window.utilityForm.checkValidity(priceElem, roomsQuantity, guestsQuantity);
};

const successHandler = function (advertisementArray) {
  // console.log(advertisementArray);
  let fragmentWithServerPins = window.utilityGenerateMockup.getReceivedAdvsInFragment(advertisementArray, similarPinTemplate);
  window.utilityMap.renderFragment(similarListOfPins, fragmentWithServerPins);
};

const errorHandler = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `
    z-index: 100;
    margin: 0 auto;
    text-align: center;
    background-color: wheat;
    position: absolute;
    padding: 0.5em;
    top: 40vh;
    left: 20vw;
    right: 20vw;
    font-size: 20px;
    font-family: Roboto", "Arial", sans-serif;
    color: #353535;
    border: 1px solid #ffaa99;
    border-radius: 8px;
    box-shadow: 0 0 2px 2px #ff6547;
    `;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = function (evt) {

  if (evt.button === window.utilityData.EVENT_CODE.MOUSE_LEFT_BTN ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_ENTER ||
      evt.code === window.utilityData.EVENT_CODE.KEYBOARD_NUMPAD_ENTER) {

    if (!activateFlag) {

      // function (onSuccess, onError)
      window.utilityLoad.getXHRequest(successHandler, errorHandler);

      window.utilityForm.toggleDisableAttr(mapSelects);
      window.utilityForm.toggleDisableAttr(formInputs);

      activateFlag = true;
    }

    mapBlock.classList.remove(`map--faded`);
    mainFormElement.classList.remove(`ad-form--disabled`);
    window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
  }
};

// initializing primary disabled condition
window.utilityForm.toggleDisableAttr(mapSelects);
window.utilityForm.toggleDisableAttr(formInputs);

window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);

mainPin.addEventListener(`mousedown`, function (evt) {
  activatePage(evt);
  window.utilityForm.setTargetCords(adressInput, mainPin, window.utilityData.PIN_BOTTOM_HEIGHT);
});

mainPin.addEventListener(`keydown`, activatePage);

publishButton.addEventListener(`click`, checkForm);
