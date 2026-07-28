// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // ===== Package card links -> store choice before navigating (delegated: cards may be rendered dynamically) =====
  document.addEventListener("click", function (e) {
    var link = e.target.closest(".package-card a.btn-primary");
    if (!link) return;
    var card = link.closest(".package-card");
    var heading = card && card.querySelector("h3");
    if (heading) sessionStorage.setItem("selectedPackage", heading.textContent.trim());
  });

  // ===== Preselect service/package (from sessionStorage, or ?paket= URL param) =====
  var serviceSelect = document.getElementById("res-service");
  if (serviceSelect) {
    var params = new URLSearchParams(window.location.search);
    var paket = params.get("paket") || sessionStorage.getItem("selectedPackage");
    sessionStorage.removeItem("selectedPackage");
    if (paket) {
      var matched = Array.from(serviceSelect.options).some(function (opt) {
        if (opt.value === paket) {
          opt.selected = true;
          return true;
        }
        return false;
      });
      if (!matched) {
        var newOpt = document.createElement("option");
        newOpt.value = paket;
        newOpt.textContent = paket;
        newOpt.selected = true;
        serviceSelect.appendChild(newOpt);
      }
    }
  }

  // ===== Reservation form -> WhatsApp =====
  var form = document.getElementById("reservation-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var whatsappNumber = "994105286445"; // 010 528 64 45

      var name = form.querySelector("#res-name").value.trim();
      var phone = form.querySelector("#res-phone").value.trim();
      var service = form.querySelector("#res-service").value;
      var date = form.querySelector("#res-date").value;
      var time = form.querySelector("#res-time").value;
      var note = form.querySelector("#res-note").value.trim();

      var dateTime = [date, time].filter(Boolean).join(" ");

      var lines = [
        "Salam, Analizim üzərindən rezervasiya etmək istəyirəm.",
        "",
        "Ad Soyad: " + name,
        "Telefon: " + phone,
        "Xidmət: " + (service || "Qeyd olunmayıb"),
        "Tarix / Vaxt: " + (dateTime || "Qeyd olunmayıb"),
      ];

      if (note) {
        lines.push("Qeyd: " + note);
      }

      var message = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + whatsappNumber + "?text=" + message;

      var overlay = document.getElementById("reservation-modal-overlay");
      if (overlay) {
        overlay.dataset.whatsappUrl = url;
        overlay.classList.add("show");
      }

      form.reset();
    });
  }

  // ===== Reservation success modal -> proceed to WhatsApp / close =====
  var modalOverlay = document.getElementById("reservation-modal-overlay");
  if (modalOverlay) {
    var goToWhatsapp = document.getElementById("modal-whatsapp-btn");
    var closeModal = document.getElementById("modal-close-btn");

    if (goToWhatsapp) {
      goToWhatsapp.addEventListener("click", function () {
        var url = modalOverlay.dataset.whatsappUrl;
        if (url) window.open(url, "_blank");
        modalOverlay.classList.remove("show");
      });
    }
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        modalOverlay.classList.remove("show");
      });
    }
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) modalOverlay.classList.remove("show");
    });
  }

  // ===== Active nav link highlighting =====
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});
