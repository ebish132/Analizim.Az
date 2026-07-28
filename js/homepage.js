document.addEventListener("DOMContentLoaded", function () {
  var heroMedia = document.getElementById("hero-media");
  var aboutMedia = document.getElementById("about-media");
  if (!heroMedia && !aboutMedia) return;

  fetch("content/homepage.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      // Only touch the DOM if the CMS value differs from what's already
      // rendered — the markup already ships with the current image, so this
      // avoids a visible flash/pop-in on every page load.
      if (heroMedia && data.hero_image) {
        var existingImg = heroMedia.querySelector("img");
        if (!existingImg) {
          existingImg = document.createElement("img");
          existingImg.alt = "Analizim";
          existingImg.style.width = "100%";
          existingImg.style.height = "100%";
          existingImg.style.objectFit = "cover";
          heroMedia.innerHTML = "";
          heroMedia.appendChild(existingImg);
        }
        if (!existingImg.getAttribute("src").endsWith(data.hero_image)) {
          existingImg.src = data.hero_image;
        }
      }
      if (aboutMedia && data.about_image) {
        var current = aboutMedia.style.backgroundImage;
        if (current.indexOf(data.about_image) === -1) {
          aboutMedia.style.backgroundImage = 'url("' + data.about_image + '")';
          aboutMedia.style.backgroundSize = "cover";
          aboutMedia.style.backgroundPosition = "center";
        }
      }
    })
    .catch(function () {});
});
