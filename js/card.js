'use strict';
(function () {
  let mapPins = window.main.CONTEINER.querySelector(`.map__pins`);
  let onMapPin = function (evt) {
    let pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (!pin) {
      return;
    }
    let card = window.main.CONTEINER.querySelector(`.map__card`);
    let item = window.condition.pins.indexOf(evt.target.closest(`.map__pin:not(.map__pin--main)`));

    if (card) {
      card.remove();
      document.removeEventListener(`keydown`, window.condition.onPopupEscPressCard);
    }
    window.maps.map.appendChild(window.pinCard.renderCard(window.condition.pinsElements[item]));
    let mapCard = window.main.CONTEINER.querySelector(`.map__card`);
    let closePopup = function () {
      mapCard.remove();
    };
    let popupClose = window.main.CONTEINER.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, window.condition.onPopupEscPressCard);
    popupClose.addEventListener(`click`, function () {
      closePopup();
      document.removeEventListener(`keydown`, window.condition.onPopupEscPressCard);
    });
  };

  mapPins.addEventListener(`click`, onMapPin);
})();
