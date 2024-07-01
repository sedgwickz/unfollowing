// ==UserScript==
// @name         X/Twitter Unfollowing
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://x.com/*/following
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/423259/XTwitter%20Unfollowing.user.js
// @updateURL https://update.greasyfork.org/scripts/423259/XTwitter%20Unfollowing.meta.js
// ==/UserScript==

(function() {
    'use strict';
    const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))
    function applyStyles(element, styles) {
        for (let property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property] = styles[property];
            }
        }
    }

    const container = document.createElement('div')
    applyStyles(container, {
        position: 'fixed',
        'z-index': 9999999,
        padding: '10px',
        top: '0',
        right: '0',
        background: '#fff',
        display: 'flex',
        'gap': '4px',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
    })
    document.body.append(container)

    const unFollowButton = document.createElement('button')
    unFollowButton.innerText = "Unfollow Start"
    container.append(unFollowButton)

    const descDiv = document.createElement('div')
    descDiv.innerHTML = `<div>Feedback & Support 😇 click here ⬇️ </div><div><a href='' target='_blank'> github</a></div>`
    applyStyles(descDiv, { color: '#999', 'text-align': 'center'})
    container.append(descDiv)

    function getConfirmButton() {
        for(const item of document.querySelectorAll("button[role='button']")) {
            if(item.innerText == 'Unfollow') {
                return item
            }
        }
    }

    async function unFollow() {
        for(const item of document.querySelectorAll("button[role='button']")) {
            if(item.innerText == 'Following') {
                await sleep(2000)
                item.click()
                await sleep(1000)
                const confirmButton = getConfirmButton()
                confirmButton.click()
            }
        }
        document.documentElement.scrollTo(0, 999999999)
        await sleep(2000)
    }

    unFollowButton.addEventListener('click', async () => {
        unFollowButton.innerText = "Unfollowing is working...refresh to stop"
        while (1) {
            await unFollow()
        }
    })


})();
