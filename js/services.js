document.addEventListener("DOMContentLoaded", function () {
  var sectionIds = {
    lab: "services-grid-lab",
    panels: "services-grid-panels",
    diagnostic: "services-grid-diagnostic",
    cardio: "services-grid-cardio",
    pediatric: "services-grid-pediatric"
  };

  var anyGrid = Object.keys(sectionIds).some(function (key) {
    return document.getElementById(sectionIds[key]);
  });
  if (!anyGrid) return;

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  fetch("content/services.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var services = data.services || [];
      var grouped = {};
      services.forEach(function (svc) {
        if (!grouped[svc.section]) grouped[svc.section] = [];
        grouped[svc.section].push(svc);
      });

      Object.keys(sectionIds).forEach(function (key) {
        var grid = document.getElementById(sectionIds[key]);
        if (!grid) return;
        var items = grouped[key] || [];
        if (!items.length) {
          grid.innerHTML = '<p style="color:var(--color-text-light);">Hələ xidmət əlavə olunmayıb.</p>';
          return;
        }
        grid.innerHTML = items
          .map(function (svc) {
            return (
              '<div class="card">' +
              '<div class="card-icon">' + analizimIconSvg(svc.icon) + "</div>" +
              "<h3>" + escapeHtml(svc.title) + "</h3>" +
              "<p>" + escapeHtml(svc.description) + "</p>" +
              "</div>"
            );
          })
          .join("");
      });
    })
    .catch(function () {
      Object.keys(sectionIds).forEach(function (key) {
        var grid = document.getElementById(sectionIds[key]);
        if (grid) grid.innerHTML = '<p style="color:var(--color-text-light);">Məlumat yüklənə bilmədi.</p>';
      });
    });
});
