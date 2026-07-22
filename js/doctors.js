document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("doctors-grid");
  if (!grid) return;

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  fetch("content/doctors.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var doctors = data.doctors || [];
      if (!doctors.length) {
        grid.innerHTML = '<p style="color:var(--color-text-light);">Hələ həkim əlavə olunmayıb.</p>';
        return;
      }
      grid.innerHTML = doctors
        .map(function (doc) {
          var photoHtml = doc.photo
            ? '<img src="' + escapeHtml(doc.photo) + '" alt="' + escapeHtml(doc.name) + '" style="width:100%;height:100%;object-fit:cover;">'
            : escapeHtml((doc.name || "Dr").charAt(0));
          return (
            '<div class="doctor-card">' +
            '<div class="doctor-photo">' + photoHtml + "</div>" +
            "<h3>" + escapeHtml(doc.name) + "</h3>" +
            '<div class="role">' + escapeHtml(doc.specialty) + "</div>" +
            '<p style="font-size:13.5px; color:var(--color-text-light);">' + escapeHtml(doc.experience) + "</p>" +
            "</div>"
          );
        })
        .join("");
    })
    .catch(function () {
      grid.innerHTML = '<p style="color:var(--color-text-light);">Məlumat yüklənə bilmədi.</p>';
    });
});
