import os
import json
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

PORT = 8520

ASSETS_FOLDER = "Assets"

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)

        # API: list all zip assets
        if parsed.path == "/api/assets":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            assets = []
            if os.path.exists(ASSETS_FOLDER):
                for file in sorted(os.listdir(ASSETS_FOLDER)):
                    if file.lower().endswith(".zip"):
                        name = file[:-4]
                        assets.append({
                            "name": name,
                            "file": f"{ASSETS_FOLDER}/{file}"
                        })

            self.wfile.write(json.dumps(assets, indent=2).encode("utf-8"))
            return

        return super().do_GET()

print(f"🔥 Bacm852Home running: http://localhost:{PORT}")
HTTPServer(("localhost", PORT), Handler).serve_forever()
