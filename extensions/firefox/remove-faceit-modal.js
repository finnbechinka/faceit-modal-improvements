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
