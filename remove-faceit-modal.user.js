// ==UserScript==
// @name         remove faceit modal
// @namespace    https://www.faceit.com/
// @version      1.1.2
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
    let old_url;
    let open_profiles = [];

    // Select the node that will be observed for mutations
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        /*
        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
            } else if (mutation.type === "attributes") {
                console.log(
                    `The ${mutation.attributeName} attribute was modified.`
                );
            }
        }
        */
        console.log("observer");
        const current_url = window.location.href;

        old_url = current_url;
        open_profiles.forEach((open_profile) => {
            let div = open_profile.parentNode;
            if (div) {
                div.removeChild(div.lastChild);
                div.removeChild(div.lastChild);
                div.removeChild(div.lastChild);
            }
        });
        open_profiles = [];

        if (current_url.includes("players-modal")) {
            if (
                (old_url.includes("/players/") && open_profiles.length < 2) ||
                open_profiles.length < 1
            ) {
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
                                const div = e.parentNode.parentNode;

                                let button = e.cloneNode(true);
                                button.removeChild(button.firstChild);
                                button.lastChild.data = "OPEN IN NEW TAB";

                                let link = document.createElement("a");
                                link.title = "open this profile in a new tab";
                                let url = current_url.replace(
                                    "players-modal",
                                    "players"
                                );
                                link.href = url;
                                link.target = "_blank";
                                link.style.textDecoration = "none";
                                link.appendChild(button);

                                div.lastChild.append(
                                    document.createElement("br")
                                );
                                div.lastChild.append(
                                    document.createElement("br")
                                );
                                div.lastChild.append(link);
                                open_profiles.push(link);
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
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();
