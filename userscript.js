// ==UserScript==
// @name         Tesseract Local Captcha Solver
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  One-click Tesseract OCR via localhost
// @author       Grok
// @match        https://*/*
// @connect      127.0.0.1
// @grant        GM.xmlHttpRequest
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    const API = 'http://127.0.0.1:5000/solve';

    // === CUSTOMIZE FOR YOUR SITE ===
    const IMG_SELECTOR = 'img[alt*="captcha" i], img[src*="captcha" i], img[id*="captcha" i]';
    const INPUT_SELECTOR = 'input[placeholder*="captcha" i], input[id*="captcha" i], input[name*="captcha" i]';

    function imgToBase64(img) {
        return new Promise(resolve => {
            const c = document.createElement('canvas');
            c.width = img.naturalWidth || img.width;
            c.height = img.naturalHeight || img.height;
            c.getContext('2d').drawImage(img, 0, 0);
            resolve(c.toDataURL('image/png'));
        });
    }

    async function solveNow() {
        const img = document.querySelector(IMG_SELECTOR);
        if (!img) return alert("No captcha image found. Edit IMG_SELECTOR in script.");

        const b64 = await imgToBase64(img);

        GM.xmlHttpRequest({
            method: "POST",
            url: API,
            data: JSON.stringify({ image: b64 }),
            headers: { "Content-Type": "application/json" },
            onload: r => {
                try {
                    const res = JSON.parse(r.responseText);
                    if (res.solved) {
                        const input = document.querySelector(INPUT_SELECTOR) || document.querySelector('input[type="text"]');
                        if (input) input.value = res.solved;
                        alert(`✅ Solved: ${res.solved}`);
                    } else alert("❌ " + (res.error || "Empty response"));
                } catch(e) { alert("Raw: " + r.responseText); }
            },
            onerror: () => alert("❌ Local API not running! Start solver.py")
        });
    }

    // Floating button + menu command
    const btn = document.createElement('button');
    btn.textContent = '🧠 Solve Captcha';
    btn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:99999;padding:12px 16px;background:#ff00aa;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;';
    btn.onclick = solveNow;
    document.body.appendChild(btn);

    GM_registerMenuCommand("Solve Captcha Now", solveNow);
})();
