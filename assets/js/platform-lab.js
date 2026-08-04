(function () {
  function getLayout(width) {
    if (width > 760) return "Desktop";
    if (width > 520) return "Tablet";
    return "Mobile";
  }

  function getStatusLabel(status) {
    if (status === "ready") return "Cargado correctamente";
    if (status === "loading") return "Cargando";
    if (status === "error") return "Error";
    return "Pendiente";
  }

  function getStatusState(status) {
    if (status === "ready") return "ready";
    if (status === "loading") return "loading";
    if (status === "error") return "error";
    return "pending";
  }

  function getComponentName(caseElement, embedElement) {
    var configured = caseElement.getAttribute("data-lab-component");
    if (configured) return configured;

    var moduleName = embedElement ? embedElement.getAttribute("data-hsb-platform-slot") : "";
    var componentName = embedElement ? embedElement.getAttribute("data-hsb") : "";
    return [moduleName, componentName].filter(Boolean).join(" / ") || "Componente";
  }

  function updateLabCase(caseElement) {
    var viewport = caseElement.querySelector(".lab-viewport");
    var embedElement = caseElement.querySelector("[data-hsb], [data-hsb-platform-slot]");
    var width = viewport ? Math.round(viewport.getBoundingClientRect().width) : Number(caseElement.getAttribute("data-lab-width") || 0);
    var status = embedElement ? embedElement.getAttribute("data-hsb-embed-status") : "";

    var componentOutput = caseElement.querySelector("[data-lab-component-output]");
    var layoutOutput = caseElement.querySelector("[data-lab-layout]");
    var widthOutput = caseElement.querySelector("[data-lab-effective-width]");
    var statusOutput = caseElement.querySelector("[data-lab-status]");

    if (componentOutput) componentOutput.textContent = getComponentName(caseElement, embedElement);
    if (layoutOutput) layoutOutput.textContent = getLayout(width);
    if (widthOutput) widthOutput.textContent = width ? width + " px" : "Sin medir";
    if (statusOutput) statusOutput.textContent = getStatusLabel(status);

    caseElement.setAttribute("data-lab-state", getStatusState(status));
  }

  function initLabCase(caseElement) {
    var embedElement = caseElement.querySelector("[data-hsb], [data-hsb-platform-slot]");
    var viewport = caseElement.querySelector(".lab-viewport");

    updateLabCase(caseElement);

    if (window.ResizeObserver && viewport) {
      var resizeObserver = new ResizeObserver(function () {
        updateLabCase(caseElement);
      });
      resizeObserver.observe(viewport);
    }

    if (window.MutationObserver && embedElement) {
      var mutationObserver = new MutationObserver(function () {
        updateLabCase(caseElement);
      });
      mutationObserver.observe(embedElement, {
        attributes: true,
        attributeFilter: ["data-hsb-embed-status", "data-hsb-embed-mounted"]
      });
    }
  }

  function initPlatformLab() {
    document.querySelectorAll("[data-lab-case]").forEach(initLabCase);
  }

  document.addEventListener("hsb:embed:ready", function (event) {
    var caseElement = event.target && event.target.closest ? event.target.closest("[data-lab-case]") : null;
    if (caseElement) updateLabCase(caseElement);
  });

  document.addEventListener("hsb:embed:error", function (event) {
    var caseElement = event.target && event.target.closest ? event.target.closest("[data-lab-case]") : null;
    if (caseElement) updateLabCase(caseElement);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlatformLab);
  } else {
    initPlatformLab();
  }
})();
