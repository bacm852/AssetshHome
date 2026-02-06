const ASSETS = [
  {
    name: "ShutdownAnnouncement",
    version: "v1.0.0",
    desc: "Roblox shutdown announcement system.",
    tags: ["SYSTEM"],
    icon: "⚙️",
    url: "https://drive.google.com/uc?export=download&id=170zWF2bnr3ojk_v7LfCjKbFi4HaVo3ve"
  },
  {
    name: "Drag System",
    version: "v1.0.0",
    desc: "Smooth draggable UI system.",
    tags: ["UI"],
    icon: "🖥️",
    url: "https://drive.google.com/uc?export=download&id=194aWbNcfLj7sJL4QRLqTGktsI_Z_KaE-"
  },
  {
    name: "sickeningscustomchat",
    version: "v1.0.0",
    desc: "Custom Roblox chat UI.",
    tags: ["UI"],
    icon: "💬",
    url: "https://drive.google.com/uc?export=download&id=10U0if4VIyn40YLzSLGh3Xe6OJBM7wtT7"
  }
];

let currentFilter = "all";

function guessCategory(asset) {
  const n = asset.name.toLowerCase();
  if (n.includes("chat") || n.includes("ui") || n.includes("drag")) return "ui";
  if (n.includes("security") || n.includes("whitelist") || n.includes("ban")) return "security";
  if (n.includes("avatar") || n.includes("camera")) return "avatar";
  if (n.includes("donation") || n.includes("economy")) return "economy";
  return "system";
}

function render() {
  const list = document.getElementById("assetsList");
  const search = document.getElementById("search").value.trim().toLowerCase();

  list.innerHTML = "";

  const filtered = ASSETS.filter(a => {
    const cat = guessCategory(a);
    const okFilter = (currentFilter === "all") || (cat === currentFilter);
    const okSearch = a.name.toLowerCase().includes(search);
    return okFilter && okSearch;
  });

  filtered.forEach(asset => {
    const cat = guessCategory(asset);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div>
        <div class="cardTop">
          <div class="cardIcon">${asset.icon || "⚙️"}</div>
          <div>
            <div class="cardName">${asset.name}</div>
            <div class="cardVer">${asset.version || ""}</div>
            <div class="cardDesc">${asset.desc || ""}</div>

            <div class="tags">
              <span class="tag">${cat.toUpperCase()}</span>
              ${(asset.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>

      <button class="downloadBtn">⬇ Download</button>
    `;

    card.querySelector(".downloadBtn").onclick = () => {
      window.location.href = asset.url; // REAL DOWNLOAD
    };

    list.appendChild(card);
  });
}

/* FILTER BUTTONS */
document.querySelectorAll(".pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    render();
  });
});

/* SEARCH */
document.getElementB
