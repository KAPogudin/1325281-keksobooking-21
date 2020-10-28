'use strict';

const ADS_NUMBER = 8;

const AVATAR_IMG = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];

const ADS_TITLE = [`Первое предложение`, `Второе предложение`, `Третье предложение`];

const Price = {
  MIN: 2000,
  MAX: 20000,
};

const ADS_TYPE = [`palace`, `flat`, `house`, `bungalow`];

const ADS_TYPE_RUS = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

const ROOMS = [1, 2, 3, 4];

const GUESTS = [1, 2, 3, 4];

const CHECKOUT = [`12:00`, `13:00`, `14:00`];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const DESCRIPTIONS = [`Описание первое`, `Описание второе`, `Описание третье`];

const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const Coordinates = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 630,
};


const PIN = 40;
/**
 * Ищет случайное число
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значения
 * @return {Number} - случайное значение
 */
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Формирует случайный массив
 * @param {object} array - массив
 * @return {object} - случайный массив
 */
const getRandomArray = (array) => {
  return array.filter(function () {
    return getRandomNumber(0, array.length - 1);
  });
};

const pins = [];
for (let i = 0; i < ADS_NUMBER; i++) {
  pins.push({
    author: {
      avatar: AVATAR_IMG[i]
    },
    offer: {
      title: ADS_TITLE[getRandomNumber(0, ADS_TITLE.length - 1)],
      adress: [getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX), getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)],
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: ADS_TYPE[getRandomNumber(0, ADS_TYPE.length - 1)],
      rooms: ROOMS[getRandomNumber(0, ROOMS.length - 1)],
      guest: GUESTS[getRandomNumber(0, GUESTS.length - 1)],
      checkin: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX),
      y: getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)
    }
  });
}

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
/**
 * Создание шаблона объявления для заполнения фрагмента
 * @param {object} pin - данные объявлении
 * @return {object} шаблон объявление с заполненными данными
 */
const renderPin = (pin) => {
  const adElement = pinTemplate.cloneNode(true);

  adElement.style.left = pin.location.x - PIN / 2 + `px`;
  adElement.style.top = pin.location.y - PIN + `px`;
  adElement.querySelector(`img`).src = pin.author.avatar;
  adElement.alt = pin.offer.title;

  return adElement;
};

const fragmentPin = document.createDocumentFragment();
pins.forEach(function (item) {
  fragmentPin.appendChild(renderPin(item));
});

mapPins.appendChild(fragmentPin);

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const insertBlock = document.querySelector(`.map__filters-container`);
/**
 * создание фрагмента документа с удобствами из объявления
 * @param {object} pin - данные объявления
 * @return {object} - фрагмент для вставки в DOM
 */
const renderFeature = (pin) => {
  const featureFragment = document.createDocumentFragment();
  for (let i = 0; i < pin.offer.features.length; i++) {
    const featureElement = document.createElement(`li`);
    featureElement.className = `popup__feature popup__feature--` + pin.offer.features[i];
    featureFragment.appendChild(featureElement);
  }
  return featureFragment;
};
/**
 * оздание фрагмента документа с фотографиями объявления
 * @param {object} pin - данные объявления
 * @return {object} - фрагмент phto для вставки в DOM
 */
const renderPhotos = (pin) => {
  const photosFragment = document.createDocumentFragment();
  for (let i = 0; i < pin.offer.photos.length; i++) {
    const photosElement = document.querySelector(`template`).content.querySelector(`.popup__photo`).cloneNode(true);
    photosElement.src = pin.offer.photos[i];
    photosFragment.appendChild(photosElement);
  }
  return photosFragment;
};

/**
 * Создание шаблона карточки объявления для заполнения фрагмента
 * @param {object} pin - данные объявлении
 * @return {object} шаблон объявление с заполненными данными
 */

const renderCard = (pin) => {
  const addElement = cardTemplate.cloneNode(true);
  addElement.querySelector(`h3`).textContent = pin.offer.title;
  addElement.querySelector(`.popup__text--address`).textContent = pin.offer.adress;
  addElement.querySelector(`.popup__text--price`).textContent = `${pin.offer.price} ₽/ночь`;
  addElement.querySelector(`.popup__type`).textContent = ADS_TYPE_RUS[pin.offer.type];
  addElement.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guest} гостей`;
  addElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
  addElement.querySelector(`.popup__features`).innerHTML = ``;
  addElement.querySelector(`.popup__features`).appendChild(renderFeature(pin));
  addElement.querySelector(`.popup__description`).textContent = pin.offer.description;
  addElement.querySelector(`.popup__photos`).innerHTML = ``;
  addElement.querySelector(`.popup__photos`).appendChild(renderPhotos(pin));
  addElement.querySelector(`.popup__avatar`).src = pin.author.avatar;

  return addElement;

};
const fragmentCard = document.createDocumentFragment();
pins.forEach(function (item) {
  fragmentCard.appendChild(renderCard(item));
});

map.insertBefore(fragmentCard, insertBlock);
