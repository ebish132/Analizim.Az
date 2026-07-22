document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("blog-grid");
  if (!grid) return;

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    var months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  var thumbIcon = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';

  fetch("content/blog.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var posts = (data.posts || []).slice().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      if (!posts.length) {
        grid.innerHTML = '<p style="color:var(--color-text-light);">Hələ yazı əlavə olunmayıb.</p>';
        return;
      }
      grid.innerHTML = posts
        .map(function (post) {
          var thumbHtml = post.image
            ? '<img src="' + escapeHtml(post.image) + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">'
            : thumbIcon;
          return (
            '<div class="blog-card">' +
            '<div class="blog-thumb">' + thumbHtml + "</div>" +
            '<div class="blog-date">' + escapeHtml(formatDate(post.date)) + "</div>" +
            "<h3>" + escapeHtml(post.title) + "</h3>" +
            "<p>" + escapeHtml(post.excerpt) + "</p>" +
            "</div>"
          );
        })
        .join("");
    })
    .catch(function () {
      grid.innerHTML = '<p style="color:var(--color-text-light);">Məlumat yüklənə bilmədi.</p>';
    });
});
