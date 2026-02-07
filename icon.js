// icon.js
(function () {
  // Remove old icons (if any)
  document
    .querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
    .forEach((el) => el.remove());

  // Create icon link
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = "./icon.png";

  // Add to <head>
  document.head.appendChild(link);
})();
