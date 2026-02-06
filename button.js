// ===================================
// Assetshome - Assets List (2 files)
// Created by BACM852
// ===================================

const assets = [
  {
    name: "ShutdownAnnouncement",
    link: "https://drive.google.com/uc?export=download&id=170zWF2bnr3ojk_v7LfCjKbFi4HaVo3ve"
  },
  {
    name: "Drag System",
    link: "https://drive.google.com/uc?export=download&id=194aWbNcfLj7sJL4QRLqTGktsI_Z_KaE-"
  }
];

const list = document.getElementById("assetsList");

// Create cards
assets.forEach((asset) => {
  const card = document.createElement("div");
  card.className = "assetCard";

  const name = document.createElement("div");
  name.className = "assetName";
  name.innerText = "Name: " + asset.name;

  const btn = document.createElement("button");
  btn.className = "downloadBtn";
  btn.innerText = "⬇ Download";

  btn.addEventListener("click", () => {
    window.open(asset.link, "_blank");
  });

  card.appendChild(name);
  card.appendChild(btn);
  list.appendChild(card);
});
