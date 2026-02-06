from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, "Assets")

# =========================================================
# MAIN WEBSITE
# =========================================================
@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/index.html")
def index_html():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/icon.png")
def icon_png():
    return send_from_directory(BASE_DIR, "icon.png")

# =========================================================
# API: LIST ONLY LUA FILES
# =========================================================
@app.route("/api/assets")
def api_assets():
    assets = []

    if not os.path.exists(ASSETS_DIR):
        os.makedirs(ASSETS_DIR)

    for file in os.listdir(ASSETS_DIR):
        full = os.path.join(ASSETS_DIR, file)

        # ✅ ONLY .lua FILES
        if os.path.isfile(full) and file.lower().endswith(".lua"):
            assets.append({
                "name": file,
                "url": f"/Assets/{file}"
            })

    assets.sort(key=lambda x: x["name"].lower())
    return jsonify(assets)

# =========================================================
# DOWNLOAD LUA FILES
# =========================================================
@app.route("/Assets/<path:filename>")
def download_asset(filename):
    # ✅ EXTRA SAFETY: ONLY ALLOW .lua DOWNLOAD
    if not filename.lower().endswith(".lua"):
        return "Only .lua files allowed!", 403

    return send_from_directory(ASSETS_DIR, filename, as_attachment=True)

# =========================================================
# RUN SERVER
# =========================================================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)
