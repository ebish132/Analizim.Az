document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("packages-grid");
  if (!grid) return;

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  fetch("content/packages.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var packages = data.packages || [];
      if (!packages.length) {
        grid.innerHTML = '<p style="color:var(--color-text-light);">Hələ paket əlavə olunmayıb.</p>';
        return;
      }
      grid.innerHTML = packages
        .map(function (pkg) {
          var items = (pkg.items || [])
            .map(function (item) { return "<li>" + escapeHtml(item) + "</li>"; })
            .join("");
          var cardClass = "package-card" + (pkg.featured ? " featured" : "");
          var reserveUrl = "elaqe.html?paket=" + encodeURIComponent(pkg.title) + "#reservation-form";
          return (
            '<div class="' + cardClass + '">' +
            (pkg.discount ? '<div class="package-badge">' + escapeHtml(pkg.discount) + "</div>" : "") +
            '<div class="package-header">' +
            '<span class="section-tag">' + escapeHtml(pkg.tag) + "</span>" +
            "<h3>" + escapeHtml(pkg.title) + "</h3>" +
            '<p class="package-subtitle">' + escapeHtml(pkg.subtitle) + "</p>" +
            "</div>" +
            '<ul class="package-list">' + items + "</ul>" +
            '<div class="package-price-row">' +
            '<span class="package-old-price">' + escapeHtml(pkg.old_price) + "</span>" +
            '<span class="package-new-price">' + escapeHtml(pkg.new_price) + "</span>" +
            "</div>" +
            '<a href="' + reserveUrl + '" class="btn btn-primary btn-block">Rezervasiya et</a>' +
            "</div>"
          );
        })
        .join("");
    })
    .catch(function () {
      grid.innerHTML = '<p style="color:var(--color-text-light);">Məlumat yüklənə bilmədi.</p>';
    });
});
