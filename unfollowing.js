// ==UserScript==
// @name         Twitter Unfollowing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/sedgwickz/following
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))

    function getConfirmButton() {
        for(const item of document.querySelectorAll("div[role='button']")) {
            if(item.innerText == 'Unfollow') {
                return item
            }
        }
    }

    async function unFollow() {
        for(const item of document.querySelectorAll("div[role='button']")) {
            if(item.innerText == 'Following') {
                await sleep(2000)
                item.click()
                const confirmButton = getConfirmButton()
                confirmButton.click()
                console.log(item.innerText)
            }
        }
    }
    const unFollowButton = document.createElement('button')
    unFollowButton.innerText = "取关"
    unFollowButton.style.position = "fixed"
    unFollowButton.style.padding = "10px"
    unFollowButton.style.bottom = "100px"
    unFollowButton.style.right = "100px"
    unFollowButton.zIndex = 9999
    unFollowButton.addEventListener('click', async () => {
        unFollowButton.innerText = "进行中..."
        while (1) {
            await unFollow()
            // window.scrollTo(0,document.body.scrollHeight);
            await sleep(3)
        }
    })
    document.body.append(unFollowButton)


})();
