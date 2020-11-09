'use strict';

(function () {
  let locationStart = {
    x: window.maps.openPinPage.style.left = 570 - 32,
    y: window.maps.openPinPage.style.top = 375 - 65,
  };

  let address = document.querySelector(`#address`);
  address.setAttribute(`disabled`, true);
  address.value = `${locationStart.x}, ${locationStart.y}`;

  let titleAdd = window.main.MAIN.querySelector(`#title`);

  titleAdd.addEventListener(`input`, function () {
    let valueLength = titleAdd.value.length;
    if (valueLength < window.main.MIN_NAME_LENGTH) {
      titleAdd.setCustomValidity(`Ещё ${window.main.MIN_NAME_LENGTH - valueLength} симв.`);
    } else if (valueLength > window.main.MAX_NAME_LENGTH) {
      titleAdd.setCustomValidity(`Удалите лишние ${valueLength - window.main.MAX_NAME_LENGTH} симв.`);
    } else {
      titleAdd.setCustomValidity(``);
    }

    titleAdd.reportValidity();
  });

  let price = window.main.MAIN.querySelector(`#price`);

  price.addEventListener(`input`, function (e) {
    e.preventDefault();
    if (price.value > window.main.MAX_PRICE) {
      price.setCustomValidity(`Цена не может превышать сумму ${window.main.MAX_PRICE} рублей/ночь.`);
    } else {
      price.setCustomValidity(``);
    }
    price.reportValidity();
  });


  let roomNumber = window.main.MAIN.querySelector(`#room_number`);
  let capacity = window.main.MAIN.querySelector(`#capacity`);

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

  let timeIn = window.main.MAIN.querySelector(`#timein`);
  let timeOut = window.main.MAIN.querySelector(`#timeout`);

  timeIn.addEventListener(`change`, function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener(`change`, function () {
    timeIn.value = timeOut.value;
  });

  let roomType = window.main.MAIN.querySelector(`#type`);

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

  window.form = {
    address,
  };
})();
