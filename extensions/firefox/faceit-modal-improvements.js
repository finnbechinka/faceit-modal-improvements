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
        let elements = Array.from(document.querySelectorAll("button"));

        elements.some((e) => {
            if (e.lastChild.data == "Share") {
                const div = e.parentNode.parentNode;

                let button = e.cloneNode(true);
                button.removeChild(button.firstChild);
                button.lastChild.data = "OPEN IN NEW TAB";

                let link = document.createElement("a");
                link.title = "open this profile in a new tab";
                let url = current_url.replace("/players-modal/", "/players/");
                link.href = url;
                link.target = "_blank";
                link.style.textDecoration = "none";
                link.appendChild(button);

                div.lastChild.append(document.createElement("br"));
                div.lastChild.append(document.createElement("br"));
                div.lastChild.append(link);
                my_elements.push(link);
                return true;
            }
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

    let observer;

    const update = () => {
        observer.disconnect();
        const current_url = window.location.href;

        if (current_url != old_url) {
            old_url = current_url;
            remove_my_elements();
        }

        if (current_url.includes("/players-modal/")) {
            add_open_tab_button(current_url);
        }

        if (current_url.includes("/room/")) {
            change_profile_link();
        }

        observer.observe(targetNode, config);
    };

    let timer = setTimeout(update, 2000);

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        observer.disconnect();
        clearTimeout(timer);
        timer = setTimeout(update, 2000);
        change_profile_link();
        observer.observe(targetNode, config);
    };

    // Create an observer instance linked to the callback function
    observer = new MutationObserver(callback);

    observer.observe(targetNode, config);

    setTimeout(() => {
        if (!my_elements) {
            update();
        }
    }, 10000);
})();
