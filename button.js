// ================================
// ASSETS LIST (EDIT HERE)
// ================================

const ASSETS = [
  {
    name: "ShutdownAnnouncement",
    url: "https://drive.google.com/uc?export=download&id=170zWF2bnr3ojk_v7LfCjKbFi4HaVo3ve"
  },
  {
    name: "Drag System",
    url: "https://drive.google.com/uc?export=download&id=194aWbNcfLj7sJL4QRLqTGktsI_Z_KaE-"
  },
  {
    name: "sickeningscustomchat",
    url: "https://drive.google.com/file/d/10U0if4VIyn40YLzSLGh3Xe6OJBM7wtT7/view?usp=drive_link"
  }
];

// ================================
// RENDER
// ================================

const assetsList = document.getElementById("assetsList");

ASSETS.forEach(asset => {
  const row = document.createElement("div");
  row.className = "assetRow";

  row.innerHTML = `
    <div class="assetName">${asset.name}</div>
    <button class="downloadBtn">⬇ Download</button>
  `;

  row.querySelector(".downloadBtn").onclick = () => {
    window.open(asset.url, "_blank");
  };

  assetsList.appendChild(row);
});
