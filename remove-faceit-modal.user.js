// ==UserScript==
// @name         remove faceit modal
// @namespace    https://www.faceit.com/
// @version      0.3
// @description  replace modal profile link with normal profile link
// @author       shaker
// @match        *://www.faceit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=faceit.com
// @grant        none
// @run-at       document-end
// @homepageURL  https://github.com/shakerrrr/remove-faceit-modal
// ==/UserScript==

// profile link class: sc-hFIzcO eaWQvj
// modal url: https://www.faceit.com/en/players-modal/[username]

(function () {
    "use strict";
    let elements;
    let old_elements;
    window.setInterval(() => {
        elements = document.querySelectorAll("[href*='/players-modal/']");
        if (elements !== old_elements) {
            old_elements = elements;
            elements.forEach((element) => {
                const link = element.getAttribute("href");
                const new_link = link.replace("players-modal", "players");
                element.setAttribute("href", new_link);
            });
        }
    }, 250);
})();
