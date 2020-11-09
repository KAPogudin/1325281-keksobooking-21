'use strict';
(function () {
  window.maps.openPinPage.addEventListener(`mousedown`, function (evt) {
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
        x: window.maps.openPinPage.offsetLeft - shift.x - 32,
        y: window.maps.openPinPage.offsetTop - shift.y - 65
      };
      window.form.address.value = `${locationAddress.x}, ${locationAddress.y}`;

      if (locationAddress.y < 630 && locationAddress.y > 129) {
        window.maps.openPinPage.style.top = (window.maps.openPinPage.offsetTop - shift.y) + `px`;
      }
      if (locationAddress.x < 1134 && locationAddress.x > -65) {
        window.maps.openPinPage.style.left = (window.maps.openPinPage.offsetLeft - shift.x) + `px`;
      }
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.maps.openPinPage.removeEventListener(`click`, onClickPreventDefault);
        };
        window.maps.openPinPage.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
