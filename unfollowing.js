// ==UserScript==
// @name         X/Twitter Unfollowing
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://x.com/*/following
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms))

    const unFollowButton = document.createElement('button')
    unFollowButton.innerText = "取关"
    unFollowButton.style.position = "fixed"
    unFollowButton.style.padding = "10px"
    unFollowButton.style.top = "0px"
    unFollowButton.style.right = "0px"
    unFollowButton.style.background = "#5E53F5"
    unFollowButton.zIndex = 999999
    let finished = false

    function getConfirmButton() {
        for(const item of document.querySelectorAll("button[role='button']")) {
            if(item.innerText == 'Unfollow') {
                return item
            }
        }
    }

    async function unFollow() {
        finished = true
        for(const item of document.querySelectorAll("button[role='button']")) {
            if(item.innerText == 'Following') {
                finished = false
                await sleep(2000)
                item.click()
                await sleep(1000)
                const confirmButton = getConfirmButton()
                confirmButton.click()
            }
        }
        document.documentElement.scrollTo(0, 999999999)
        if (finished) {
            unFollowButton.innerText = "取关 unfollow"
            if(confirm('Finished. 已经帮你全部取关，感谢您的使用。如果觉得本项目对你有帮助，麻烦给我一个star！')) {
                document.location = 'https://github.com/sedgwickz/unfollowing'
            }
            running = false
            throw 'finished'
        }
    }

    unFollowButton.addEventListener('click', async () => {
        unFollowButton.innerText = "进行中...刷新停止"
        while (1) {
            await unFollow()
        }
    })
    document.body.append(unFollowButton)


})();
