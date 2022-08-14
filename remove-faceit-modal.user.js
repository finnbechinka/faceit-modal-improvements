// ==UserScript==
// @name         [dev] remove faceit modal
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
    const faceit_icon =
        "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://faceit.com&size=32";
    let elements;
    let old_elements;
    let open_profile;
    window.setInterval(() => {
        if (window.location.href.includes("players-modal")) {
            if (!open_profile) {
                // find the shadow root(s) (very cringe)
                const shadows = Array.from(document.querySelectorAll("*"))
                    .map((el) => el.shadowRoot)
                    .filter(Boolean);
                shadows.forEach((s) => {
                    elements = s.querySelectorAll("button");
                    if (elements != old_elements) {
                        old_elements = elements;
                        elements.forEach((e) => {
                            if (e.lastChild.data == "Share") {
                                let img = document.createElement("img");
                                img.src = faceit_icon;
                                img.style.marginTop = "15px";
                                open_profile = document.createElement("a");
                                open_profile.appendChild(img);
                                open_profile.title =
                                    "open this profile in a new tab";
                                let url = window.location.href;
                                url = url.replace("players-modal", "players");
                                open_profile.href = url;
                                open_profile.target = "_blank";
                                open_profile.style.marginTop = "15px";

                                e.parentNode.parentNode.append(open_profile);
                            }
                        });
                    }
                });
            }
        } else {
            elements = document.querySelectorAll("[href*='/players-modal/']");
            if (elements !== old_elements) {
                old_elements = elements;
                elements.forEach((element) => {
                    const link = element.getAttribute("href");
                    const new_link = link.replace("players-modal", "players");
                    element.setAttribute("href", new_link);
                });
            }
        }
    }, 250);
})();
