from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import base64
from io import BytesIO

app = Flask(__name__)

# === EDIT IF NEEDED (Windows example) ===
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

@app.route('/solve', methods=['POST'])
def solve():
    try:
        data = request.get_json()
        b64 = data['image']
        if ',' in b64:
            b64 = b64.split(',')[1]
        
        img = Image.open(BytesIO(base64.b64decode(b64)))
        img = img.convert('L')                    # grayscale
        text = pytesseract.image_to_string(img, config='--psm 8').strip()
        
        return jsonify({"solved": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Tesseract API running → http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000)
