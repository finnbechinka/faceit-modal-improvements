// ==UserScript==
// @name         remove faceit modal
// @namespace    https://www.faceit.com/
// @version      1.2.0
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

    let old_url;
    let my_elements = [];

    function remove_my_elements() {
        my_elements.forEach((open_profile) => {
            let parent = open_profile.parentNode;
            if (parent) {
                parent.removeChild(parent.lastChild);
                parent.removeChild(parent.lastChild);
                parent.removeChild(parent.lastChild);
            }
        });
        my_elements = [];
    }

    function add_open_tab_button(current_url) {
        if (my_elements.length != 0) {
            remove_my_elements();
        }
        // find the shadow root(s) (very cringe)
        const shadows = Array.from(document.querySelectorAll("*"))
            .map((el) => el.shadowRoot)
            .filter(Boolean);
        shadows.forEach((s) => {
            let elements = s.querySelectorAll("button");
            elements.forEach((e) => {
                if (e.lastChild.data == "Share") {
                    const div = e.parentNode.parentNode;

                    let button = e.cloneNode(true);
                    button.removeChild(button.firstChild);
                    button.lastChild.data = "OPEN IN NEW TAB";

                    let link = document.createElement("a");
                    link.title = "open this profile in a new tab";
                    let url = current_url.replace(
                        "/players-modal/",
                        "/players/"
                    );
                    link.href = url;
                    link.target = "_blank";
                    link.style.textDecoration = "none";
                    link.appendChild(button);

                    div.lastChild.append(document.createElement("br"));
                    div.lastChild.append(document.createElement("br"));
                    div.lastChild.append(link);
                    my_elements.push(link);
                }
            });
        });
    }

    function change_profile_link() {
        const elements = document.querySelectorAll("[href*='/players-modal/']");
        elements.forEach((element) => {
            const link = element.getAttribute("href");
            const new_link = link.replace("/players-modal/", "/players/");
            element.setAttribute("href", new_link);
        });
    }

    // Select the node that will be observed for mutations
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        const current_url = window.location.href;

        if (current_url.includes("/players-modal/")) {
            add_open_tab_button(current_url);
        }

        if (current_url.includes("/room/")) {
            change_profile_link();
        }

        if (current_url != old_url) {
            old_url = current_url;
            remove_my_elements();
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();
