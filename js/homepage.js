document.addEventListener("DOMContentLoaded", function () {
  var heroMedia = document.getElementById("hero-media");
  var aboutMedia = document.getElementById("about-media");
  if (!heroMedia && !aboutMedia) return;

  fetch("content/homepage.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (heroMedia && data.hero_image) {
        var img = document.createElement("img");
        img.src = data.hero_image;
        img.alt = "Analizim";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        heroMedia.innerHTML = "";
        heroMedia.appendChild(img);
      }
      if (aboutMedia && data.about_image) {
        aboutMedia.style.backgroundImage = 'url("' + data.about_image + '")';
        aboutMedia.style.backgroundSize = "cover";
        aboutMedia.style.backgroundPosition = "center";
        aboutMedia.textContent = "";
      }
    })
    .catch(function () {});
});
