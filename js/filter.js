'use strict';

(function () {
  let pinsAll = [];
  let DEBOUNCE_INTERVAL = 500;
  let lastTimeout;
  let mapFilters = window.main.CONTEINER.querySelector(`.map__filters`);
  let housingType = window.main.CONTEINER.querySelector(`#housing-type`);
  let housingPrice = window.main.CONTEINER.querySelector(`#housing-price`);
  let housingRooms = window.main.CONTEINER.querySelector(`#housing-rooms`);
  let housingGuests = window.main.CONTEINER.querySelector(`#housing-guests`);
  let housingFeatures = document.querySelector(`#housing-features`);
  let updateFilters = function () {
    window.condition.pinRemove();
    let filteredPins = pinsAll.filter(function (item) {
      return onTypesCorrect(item) && onPriceCorrect(item) && onRoomsCorrect(item) && onGuestsCorrect(item) && onFeaturesCorrect(item);
    });
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      window.render(filteredPins);
    }, DEBOUNCE_INTERVAL);
  };
  let onTypesCorrect = function (pin) {
    if (housingType.value === `any`) {
      return true;
    }
    return pin.offer.type === housingType.value;
  };
  let onPriceCorrect = function (pin) {
    if (housingPrice.value === `any`) {
      return true;
    } else if (housingPrice.value === `low`) {
      return (pin.offer.price < 10000);
    } else if (housingPrice.value === `middle`) {
      return (pin.offer.price >= 10000 && pin.offer.price < 50000);
    } else if (housingPrice.value === `high`) {
      return (pin.offer.price >= 50000);
    }
    return false;
  };

  let onRoomsCorrect = function (pin) {
    if (housingRooms.value === `any`) {
      return true;
    }
    return pin.offer.rooms === parseInt(housingRooms.value, 10);
  };

  let onGuestsCorrect = function (pin) {
    if (housingGuests.value === `any`) {
      return true;
    }
    return pin.offer.guests === parseInt(housingGuests.value, 10);
  };

  let onFeaturesCorrect = function (item) {
    let checkedFeatures = housingFeatures.querySelectorAll(`input:checked`);
    return Array.from(checkedFeatures).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  mapFilters.addEventListener(`change`, updateFilters);
  let onSuccess = function (data) {
    pinsAll = data;
    updateFilters();
  };

  window.filter = {
    updateFilters,
    onSuccess
  };
})();
