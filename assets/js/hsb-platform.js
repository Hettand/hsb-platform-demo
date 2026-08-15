(function (window, document) {
  function getConfig() {
    if (!window.HSB_PLATFORM || !window.HSB_PLATFORM.baseUrl) {
      throw new Error("HSB_PLATFORM.baseUrl is required.");
    }

    return window.HSB_PLATFORM;
  }

  function buildUrl(path) {
    var config = getConfig();
    var baseUrl = config.baseUrl.replace(/\/+$/, "");
    var cleanPath = String(path || "").replace(/^\/+/, "");
    return baseUrl + "/" + cleanPath;
  }

  function loadScript(path) {
    var script = document.createElement("script");
    script.src = buildUrl(path);
    script.async = true;
    script.dataset.hsbPlatformScript = path;
    document.body.appendChild(script);
    return script;
  }

  function platformFetch(path, options) {
    return window.fetch(buildUrl(path), options);
  }

  function preparePlatformSlots() {
    var config = getConfig();
    var platformKey = String(config.platformKey || "").trim();
    var modules = {
      "activity-list": "activity-list",
      "weekly-schedule": "weekly-schedule"
    };
    var placeholders = {
      "activity-list": "Cargando actividades...",
      "weekly-schedule": "Cargando horarios..."
    };

    document.querySelectorAll("[data-hsb-platform-slot]").forEach(function (slot) {
      var slotName = slot.getAttribute("data-hsb-platform-slot") || "";

      slot.removeAttribute("data-hsb");

      if (platformKey) {
        slot.setAttribute("data-hsb-platform", platformKey);
      } else {
        slot.removeAttribute("data-hsb-platform");
      }

      if (modules[slotName] && !slot.getAttribute("data-hsb-module")) {
        slot.setAttribute("data-hsb-module", modules[slotName]);
      }

      if (!slot.getAttribute("data-placeholder")) {
        slot.setAttribute("data-placeholder", placeholders[slotName] || "Cargando contenido...");
      }
    });
  }

  window.HSBPlatform = {
    buildUrl: buildUrl,
    fetch: platformFetch,
    loadScript: loadScript
  };

  preparePlatformSlots();
  loadScript("/platform/embed.js");
})(window, document);
