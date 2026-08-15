(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.matches("a")) {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = contactForm.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Consulta registrada para la demo. No se envio ningun dato real.";
      }
      contactForm.reset();
    });
  }

  document.querySelectorAll("[data-hsb-platform-slot]").forEach(function (slot) {
    var slotName = slot.getAttribute("data-hsb-platform-slot") || "";
    var placeholders = {
      "activity-list": "Cargando actividades...",
      "weekly-schedule": "Cargando horarios..."
    };

    slot.setAttribute("data-placeholder", placeholders[slotName] || "Cargando contenido...");
  });
})();
