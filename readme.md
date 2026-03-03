Local Flask API (Tesseract OCR) + Tampermonkey script that calls it from any HTTPS site. No CORS pain. Zero fluff.

1. Local API (solver.py) – runs on http://127.0.0.1:5000

`pip install flask pillow pytesseract`

How to use:

Start `python solver.py`

Install the Tampermonkey script

On any site with a captcha → click the pink 🧠 Solve Captcha button (or Tampermonkey menu)

Done. Your local Tesseract beast is now one click away from any HTTPS page.

Go break some captchas (responsibly 😉).
