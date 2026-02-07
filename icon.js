// icon.js (PRO - icon.png only)
(function () {
  const ICON = "./icon.png";

  // Remove old icons
  document
    .querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
    .forEach((el) => el.remove());

  // Cache bypass (forces refresh)
  const cache = "?v=" + Date.now();

  // Create icon
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = ICON + cache;

  // Add to <head>
  document.head.appendChild(link);
})();
