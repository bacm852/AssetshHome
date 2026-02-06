// ===============================
// Assetshome - UI Builder
// Created by BACM852
// ===============================

// Your Google Drive DIRECT download link
const DOWNLOAD_LINK =
  "https://drive.google.com/uc?export=download&id=170zWF2bnr3ojk_v7LfCjKbFi4HaVo3ve";

// Create main card/frame
const app = document.getElementById("app");

const card = document.createElement("div");
card.style.padding = "28px";
card.style.borderRadius = "22px";
card.style.background = "rgba(255,255,255,0.06)";
card.style.border = "1px solid rgba(255,255,255,0.10)";
card.style.backdropFilter = "blur(12px)";
card.style.boxShadow = "0 0 30px rgba(0,0,0,0.65)";
card.style.textAlign = "center";

// Badge
const badge = document.createElement("div");
badge.innerText = "🔥 Assetshome";
badge.style.display = "inline-block";
badge.style.padding = "7px 14px";
badge.style.borderRadius = "999px";
badge.style.fontSize = "13px";
badge.style.background = "rgba(0,255,204,0.10)";
badge.style.border = "1px solid rgba(0,255,204,0.25)";
badge.style.color = "#00ffcc";
badge.style.fontWeight = "bold";
badge.style.marginBottom = "12px";

// Title
const title = document.createElement("h1");
title.innerHTML = `Welcome <span style="
  color:#00ffcc;
  text-shadow:0 0 12px rgba(0,255,204,0.8);
">BACM852</span>`;
title.style.margin = "0";
title.style.fontSize = "34px";
title.style.letterSpacing = "1px";

// Text
const text = document.createElement("p");
text.innerHTML = `Download my file here 😎<br>One button, real download.`;
text.style.opacity = "0.9";
text.style.marginTop = "10px";
text.style.fontSize = "15px";
text.style.lineHeight = "1.5";

// Download Button
const btn = document.createElement("button");
btn.innerText = "⬇ Download";
btn.style.width = "100%";
btn.style.marginTop = "18px";
btn.style.padding = "14px 18px";
btn.style.borderRadius = "16px";
btn.style.border = "none";
btn.style.cursor = "pointer";
btn.style.fontWeight = "bold";
btn.style.fontSize = "16px";
btn.style.background = "#00ffcc";
btn.style.color = "black";
btn.style.transition = "0.2s";

// Hover effect
btn.addEventListener("mouseenter", () => {
  btn.style.transform = "scale(1.04)";
  btn.style.boxShadow = "0 0 20px rgba(0,255,204,0.6)";
});
btn.addEventListener("mouseleave", () => {
  btn.style.transform = "scale(1)";
  btn.style.boxShadow = "none";
});

// Click download
btn.addEventListener("click", () => {
  window.open(DOWNLOAD_LINK, "_blank");
});

// Footer
const footer = document.createElement("div");
footer.innerText = "© 2026 - BACM852";
footer.style.marginTop = "18px";
footer.style.fontSize = "13px";
footer.style.opacity = "0.55";

// Add everything
card.appendChild(badge);
card.appendChild(title);
card.appendChild(text);
card.appendChild(btn);
card.appendChild(footer);

app.appendChild(card);
