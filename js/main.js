'use strict';

const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ADS_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAIN = document.querySelector(`main`);
let engToRuMap = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

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
let adForm = document.querySelector(`.ad-form`);
let map = document.querySelector(`.map`);
let fieldsetElements = document.querySelectorAll(`fieldset`);

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
  window.load(onSuccess,errorHandler);
};

let errorHandler = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `padding: 20px; transform: translateX(-50%); z-index: 100; margin: 0 auto; text-align: center; background-color: #ffffff; border: 3px solid red; border-radius: 10px;`;
  node.style.position = `absolute`;
  node.style.left = 50 + `%`;
  node.style.top = 50 + `%`;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

let pins = [];
let pinsElements = [];
let onSuccess = function (pinsElem) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < pinsElem.length; i++) {
    fragment.appendChild(renderMark(pinsElem[i]));
  }
  pinsElements = Array.from(pinsElem);
  markElement.appendChild(fragment);
  pins = Array.from(document.querySelectorAll(`.map__pin:not(.map__pin--main)`));
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

let markElementTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let cardElementTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let markElement = document.querySelector(`.map__pins`);

  let renderMark = function (newAd) {
    let markElementItem = markElementTemplate.cloneNode(true);
    markElementItem.style.left = newAd.location.x + 25 + `px`;
    markElementItem.style.top = newAd.location.y + 70 + `px`;
    let avatarImg = markElementItem.querySelector(`img`);
    avatarImg.src = newAd.author.avatar;
    avatarImg.alt = `фото пользователя`;
    return markElementItem;
  };

  let renderCard = function (newAd) {
    let cardElementItem = cardElementTemplate.cloneNode(true);
    cardElementItem.querySelector(`.popup__title`).textContent = newAd.offer.title;
    cardElementItem.querySelector(`.popup__text--address`).textContent = newAd.offer.address;
    cardElementItem.querySelector(`.popup__text--price`).textContent = `${newAd.offer.price}₽/ночь`;
    cardElementItem.querySelector(`.popup__type`).textContent = engToRuMap[newAd.offer.type];
    cardElementItem.querySelector(`.popup__text--capacity`).textContent = `${newAd.offer.rooms} комнаты для ${newAd.offer.guests} гостей`;
    cardElementItem.querySelector(`.popup__text--time`).textContent = `Заезд после ${newAd.offer.checkin}, выезд до ${newAd.offer.checkout}`;
    let popupFeaturesBlock = cardElementItem.querySelector(`.popup__features`);
    popupFeaturesBlock.innerHTML = ``;
    for (let i = 0; i < newAd.offer.features.length; i++) {
      let popupFeatureElement = document.createElement(`li`);
      popupFeatureElement.textContent = newAd.offer.features[i];
      popupFeatureElement.classList.add(`popup__feature`, `popup__feature--${newAd.offer.features[i]}`);
      popupFeaturesBlock.append(popupFeatureElement);
    }
    if (!popupFeaturesBlock.querySelector(`.popup__feature`)) {
      popupFeaturesBlock.style.display = `none`;
    }
    cardElementItem.querySelector(`.popup__description`).textContent = newAd.offer.description;
    let blockImg = cardElementItem.querySelector(`.popup__photos`);
    let image = blockImg.querySelector(`img`);
    image.remove();
    for (let i = 0; i < newAd.offer.photos.length; i++) {
      let cloneImg = image.cloneNode(true);
      cloneImg.src = newAd.offer.photos[i];
      blockImg.appendChild(cloneImg);
    }
    cardElementItem.querySelector(`.popup__avatar`).src = newAd.author.avatar;
    return cardElementItem;
  };

  let onPopupEscPress = function (e) {
    let card = document.querySelector(`.map__card`);
    if (e.key === `Escape`) {
      e.preventDefault();
      card.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  let mapPins = document.querySelector(`.map__pins`);
  let onMapPin = function (evt) {
    let pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!pin) {
      return;
    }
    let card = document.querySelector(`.map__card`);
    let item = pins.indexOf(evt.target.closest(`.map__pin`));

    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
    map.appendChild(renderCard(pinsElements[item]));
    let mapCard = document.querySelector(`.map__card`);
    let closePopup = function () {
      mapCard.remove();
    };
    let popupClose = document.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, onPopupEscPress);
    popupClose.addEventListener(`click`, function () {
      closePopup();
      document.removeEventListener(`keydown`, onPopupEscPress);
    });
  };

  mapPins.addEventListener(`click`, onMapPin);
  let locationStart = {
    x: openPinPage.style.left = 570 - 32,
    y: openPinPage.style.top = 375 - 65,
  };

  let address = document.querySelector(`#address`);
  address.setAttribute(`disabled`, true);
  address.value = `${locationStart.x}, ${locationStart.y}`;

  let titleAdd = document.querySelector(`#title`);

  titleAdd.addEventListener(`input`, function () {
    let valueLength = titleAdd.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      titleAdd.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      titleAdd.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
    } else {
      titleAdd.setCustomValidity(``);
    }

    titleAdd.reportValidity();
  });

  let price = MAIN.querySelector(`#price`);

  price.addEventListener(`input`, function (e) {
    e.preventDefault();
    if (price.value > MAX_PRICE) {
      price.setCustomValidity(`Цена не может превышать сумму ${MAX_PRICE} рублей/ночь.`);
    } else {
      price.setCustomValidity(``);
    }
    price.reportValidity();
  });


  let roomNumber = MAIN.querySelector(`#room_number`);
  let capacity = MAIN.querySelector(`#capacity`);

  let getValidationRooms = function () {
    let valueRooms = roomNumber.value;
    let valueCapacity = capacity.value;
    if (valueRooms === `100` && valueCapacity !== `0`) {
      roomNumber.setCustomValidity(`Дворец не для гостей`);
      capacity.setCustomValidity(`Дворец не для гостей`);
    } else if (valueRooms === `100` && valueCapacity === `0`) {
      roomNumber.setCustomValidity(``);
      capacity.setCustomValidity(``);
    } else if (valueRooms < valueCapacity && valueRooms !== `100`) {
      roomNumber.setCustomValidity(`Количество гостей не может превышать ${valueRooms}`);
      capacity.setCustomValidity(`Количество гостей не может превышать ${valueRooms}`);
    } else if (valueRooms >= valueCapacity && valueRooms !== `100` && valueCapacity === `0`) {
      roomNumber.setCustomValidity(`Выберите количество гостей`);
      capacity.setCustomValidity(`Выберите количество гостей`);
    } else if (valueRooms >= valueCapacity && valueRooms !== `100`) {
      roomNumber.setCustomValidity(``);
      capacity.setCustomValidity(``);
    }
  };

  roomNumber.addEventListener(`change`, function () {
    getValidationRooms();
    roomNumber.reportValidity();
  });

  capacity.addEventListener(`change`, function () {
    getValidationRooms();
    capacity.reportValidity();
  });

  let timeIn = MAIN.querySelector(`#timein`);
  let timeOut = MAIN.querySelector(`#timeout`);

  timeIn.addEventListener(`change`, function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener(`change`, function () {
    timeIn.value = timeOut.value;
  });

  let roomType = MAIN.querySelector(`#type`);

  let getMinValuePrice = function () {
    let priceValue = price.value;
    if (roomType.value === `bungalow`) {
      price.placeholder = 0;
    }
    if (roomType.value === `flat` && priceValue < 1000) {
      price.placeholder = 1000;
      price.setCustomValidity(`Для квартиры минимальная стоимость составляет 1000 рублей`);
    }
    if (roomType.value === `house` && priceValue < 5000) {
      price.placeholder = 5000;
      price.setCustomValidity(`Для дома минимальная стоимость составляет 5000 рублей`);
    }
    if (roomType.value === `palace` && priceValue < 10000) {
      price.placeholder = 10000;
      price.setCustomValidity(`Для дворца минимальная стоимость составляет 10000 рублей`);
    }
  };

  roomType.addEventListener(`input`, function () {
    getMinValuePrice();
  });

  price.addEventListener(`input`, function () {
    getMinValuePrice();
    price.reportValidity();
  });

  openPinPage.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let locationAddress = {
        x: openPinPage.offsetLeft - shift.x - 32,
        y: openPinPage.offsetTop - shift.y - 65
      };
      address.value = `${locationAddress.x}, ${locationAddress.y}`;

      if (locationAddress.y < 630 && locationAddress.y > 129) {
      openPinPage.style.top = (openPinPage.offsetTop - shift.y) + `px`;
      }
      if (locationAddress.x < 1134 && locationAddress.x > -65) {
        openPinPage.style.left = (openPinPage.offsetLeft - shift.x) + `px`;
      }
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          openPinPage.removeEventListener(`click`, onClickPreventDefault);
        };
      openPinPage.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
  let URL = `https://21.javascript.pages.academy/keksobooking/data`;
  let StatusCode = {
    OK: 200
  };
  let TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения, повторите поптку`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс, перезагрузите страницу`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };
