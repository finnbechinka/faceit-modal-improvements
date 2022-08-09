// ==UserScript==
// @name         remove faceit modal
// @namespace    https://www.faceit.com/
// @version      0.1
// @description  replace modal profile link with normal profile link
// @author       shaker
// @match        https://www.faceit.com/en/csgo/room/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=faceit.com
// @grant        none
// @run-at       document-end
// @homepageURL  https://github.com/shakerrrr/remove-faceit-modal
// ==/UserScript==

// profile link class: sc-hFIzcO eaWQvj

(function () {
    "use strict";
    window.setInterval(() => {
        let active = false;
        const elements = document.getElementsByClassName("sc-hFIzcO");
        if (elements.length > 0 && !active) {
            active = true;
            const link = elements.item(0).getAttribute("href");
            const new_link = link.replace("players-modal", "players");
            elements.item(0).setAttribute("href", new_link);
        }
        if (elements.length == 0 && active) {
            active = false;
        }
    }, 250);
})();
