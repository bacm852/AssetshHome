from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "Assets")

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/icon.png")
def icon():
    return send_from_directory(BASE_DIR, "icon.png")

@app.route("/api/assets")
def api_assets():
    assets = []

    if not os.path.exists(ASSETS_DIR):
        os.makedirs(ASSETS_DIR)

    for file in os.listdir(ASSETS_DIR):
        path = os.path.join(ASSETS_DIR, file)
        if os.path.isfile(path):
            assets.append({
                "name": file,
                "file": f"/Assets/{file}"
            })

    assets.sort(key=lambda x: x["name"].lower())
    return jsonify(assets)

@app.route("/Assets/<path:filename>")
def download_asset(filename):
    return send_from_directory(ASSETS_DIR, filename, as_attachment=True)

if __name__ == "__main__":
    print("AssetsHome Running!")
    print("Open: http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
