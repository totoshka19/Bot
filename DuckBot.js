// ==UserScript==
// @name         Bot for DuckDuckGo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kapitanova Anna
// @match        https://duckduckgo.com/*
// @match        https://bestfood-sochi.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @noframes
// ==/UserScript==

function search(){

  let arr = ["Готовая еда на неделю в Сочи", "Готовое питание с доставкой на дом в Сочи", "Вкусная домашняя еда на заказ", "Еда на неделю в контейнерах", "Сервис доставки здоровой еды"];
  let elem = arr[getRandom(0, arr.length)];
  let links = document.links;
  let duckInput = document.getElementById("search_form_input_homepage") || document.getElementById("search_form_input");
  let searchBtn = document.getElementById("search_button_homepage") || document.getElementById("search_button");
  let logo = document.getElementById("logo_homepage_link");
  let moreResults = document.querySelector(".result--more__btn") || document.getElementById("more-results");

  if(logo != undefined) {
    console.log("Мы на первой старнице");
    let i = 0;
    let timerId = setInterval(() => {
      duckInput.value += elem[i];
      i++;
      if (i === elem.length) {
        clearInterval(timerId);
        searchBtn.click();
      }
    }, 200);

  } else if (location.hostname == "bestfood-sochi.ru") {
    console.log("Мы на сайте bestfood-sochi.ru");
    setInterval(() => {
      let index = getRandom(0, links.length);

      if (getRandom(0, 101) >= 70) {
        location.href = "https://duckduckgo.com/";
      }

      if (links.length == 0) {
        location.href = "https://bestfood-sochi.ru/";
      }

      if (links[index].href.indexOf("bestfood-sochi.ru") != -1) {
        let link = links[index];
        console.log("Кликаем по ссылкам: " + link);
        link.click();
      }

    }, getRandom(2000, 4500));
  } else {
    console.log("Мы на странице результатов поиска");
    let nextDuckPage = true;

    for(let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf("https://bestfood-sochi.ru/") !== -1) {
        let link = links[i];
        nextDuckPage = false;
        console.log("Нашел строку " + link);
        setTimeout(() => {
          link.click();
        }, getRandom(2500, 4000));
        break;
      }
    }

    if (nextDuckPage) {
      let elements = document.querySelectorAll(".result__pagenum");
      if (elements.length !== 0) {
        let lastElement = elements[elements.length - 1];
        console.log("Подгрузили страницу: " + lastElement.innerText);
        if (lastElement.innerText == "5") {
          console.log("Дошли до пятой страницы");
          nextDuckPage = false;
          location.href = "https://duckduckgo.com/";
        }
      }

      setTimeout(() => {
        console.log("Пытаемся кликнуть по кнопке");
        moreResults = document.querySelector(".result--more__btn");
        if(moreResults) {
          moreResults.click();
        } else {
          console.log("Кнопка подгрузки дополнительных результатов не найдена");
          location.href = "https://duckduckgo.com/";
        }

        setTimeout(search, 2000);
      }, getRandom(2500, 5000));
    }
  }

  function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }
}

window.onload = search;
