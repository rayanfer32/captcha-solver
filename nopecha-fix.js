// ==UserScript==
// @name        captcha eci.gov.in
// @namespace   Violentmonkey Scripts
// @match       https://voters.eci.gov.in/searchInSIR/S2UA4DPDF-JK4QWODSE*
// @version     1.0
// @author      -
// @description 3/4/2026, 11:41:24 PM
// ==/UserScript==

(function () {
  'use strict';

 setTimeout(() => {
   let captchaInputEl = document.querySelector("[name='captcha']")
    let btn = document.createElement('button')
    btn.innerHTML = captchaInputEl.placeholder
    btn.style = '';
    btn.addEventListener('click', () => {
        captchaInputEl.setAttribute('placeholder', 'Captcha');
        setTimeout(() => {
                captchaInputEl.removeAttribute('placeholder')
                btn.innerHTML = 'solve'
        }, 1000)
    })

    captchaInputEl.parentElement.append(btn)
     }, 2000)
})()
