// ==UserScript==
// @name         Bot for DuckDuckGo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kapitanova Anna
// @match        https://duckduckgo.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function search(){

  let arr = ["Готовая еда на неделю", "Готовое питание с доставкой на дом", "Вкусная домашняя еда на заказ"];
  let elem = arr[getRandom(0, arr.length)];
  let links = document.links;
  let duckInput = document.getElementById("search_form_input_homepage");
  let searchBtn = document.getElementById("search_button_homepage");
  let logo = document.getElementById("logo_homepage_link");

  if(logo != undefined) {
    duckInput.value = elem;
    searchBtn.click();
  } else {
    for(let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf("m-food.ru") !== -1) {
        let link = links[i];
        link.click();
      }
    }
  }
}

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

window.onload = search;
