// ==UserScript==
// @name         remove faceit modal
// @namespace    https://www.faceit.com/
// @version      1.1
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
    let old_url;
    let br;
    window.setInterval(() => {
        const current_url = window.location.href;
        if (current_url != old_url) {
            old_url = current_url;
            open_profile.parentNode.removeChild(br);
            open_profile.parentNode.removeChild(open_profile);
            open_profile = null;
        }
        if (current_url.includes("players-modal")) {
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
                                const div = e.parentNode.parentNode;

                                open_profile = e.cloneNode(true);
                                open_profile.removeChild(
                                    open_profile.firstChild
                                );
                                open_profile.lastChild.data = "OPEN IN NEW TAB";
                                let link = document.createElement("a");
                                link.title = "open this profile in a new tab";
                                let url = current_url.replace(
                                    "players-modal",
                                    "players"
                                );
                                link.href = url;
                                link.target = "_blank";
                                link.style.textDecoration = "none";
                                link.appendChild(open_profile);
                                br = document.createElement("br");
                                div.lastChild.append(br.cloneNode(true));
                                div.lastChild.append(br.cloneNode(true));
                                div.lastChild.append(link);

                                /*
                                let img = document.createElement("img");
                                img.src = faceit_icon;
                                img.style.marginTop = "15px";
                                open_profile = document.createElement("a");
                                open_profile.appendChild(img);
                                open_profile.title =
                                    "open this profile in a new tab";
                                let url = current_url.replace(
                                    "players-modal",
                                    "players"
                                );
                                open_profile.href = url;
                                open_profile.target = "_blank";
                                open_profile.style.marginTop = "15px";

                                e.parentNode.parentNode.append(open_profile);
                                */
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
