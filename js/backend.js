'use strict';

(function () {

  let StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

  let createXhr = function (onSuccess, onError, method, url, data) {
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
      onError(`Произошла ошибка соединения, повторите попытку`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс, перезагрузите страницу`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.load = function (onSuccess, onError) {
    createXhr(onSuccess, onError, `GET`, LOAD_URL);
  };

  let upload = function (data, onSuccess, onErrorUpload) {
    createXhr(onSuccess, onErrorUpload, `POST`, UPLOAD_URL, data);
  };

  window.backend = {
    upload
  };
})();
