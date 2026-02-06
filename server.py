from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

ASSETS_FOLDER = "Assets"

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/icon.png")
def icon():
    return send_from_directory(".", "icon.png")

@app.route("/api/assets")
def api_assets():
    if not os.path.exists(ASSETS_FOLDER):
        return jsonify([])

    files = []
    for f in os.listdir(ASSETS_FOLDER):
        path = os.path.join(ASSETS_FOLDER, f)

        # ✅ Only show FILES (not folders)
        if os.path.isfile(path):
            files.append({
                "name": f,
                "file": f"/Assets/{f}"
            })

    # ✅ Sort A-Z
    files.sort(key=lambda x: x["name"].lower())
    return jsonify(files)

@app.route("/Assets/<path:filename>")
def download_asset(filename):
    return send_from_directory(ASSETS_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500, debug=True)
