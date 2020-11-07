'use strict';
(function () {
  let onPopupEscPress = function (e) {
    let card = window.main.MAIN.querySelector(`.map__card`);
    if (e.key === `Escape`) {
      e.preventDefault();
      card.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  let mapPins = window.main.MAIN.querySelector(`.map__pins`);
  let onMapPin = function (evt) {
    let pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!pin) {
      return;
    }
    let card = window.main.MAIN.querySelector(`.map__card`);
    let item = window.pinCard.pins.indexOf(evt.target.closest(`.map__pin`));

    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
    window.maps.map.appendChild(window.pinCard.renderCard(window.pinCard.pinsElements[item]));
    let mapCard = window.main.MAIN.querySelector(`.map__card`);
    let closePopup = function () {
      mapCard.remove();
    };
    let popupClose = window.main.MAIN.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, onPopupEscPress);
    popupClose.addEventListener(`click`, function () {
      closePopup();
      document.removeEventListener(`keydown`, onPopupEscPress);
    });
  };

  mapPins.addEventListener(`click`, onMapPin);
})();
