(() => {
  "use strict";

  const linkId = window.location.pathname.split("/").filter(Boolean).pop();

  const loadingState = document.getElementById("loadingState");
  const errorState = document.getElementById("errorState");
  const errorMessage = document.getElementById("errorMessage");
  const cardFigure = document.getElementById("cardFigure");
  const cardImg = document.getElementById("cardImg");
  const cardActions = document.getElementById("cardActions");
  const downloadBtn = document.getElementById("downloadBtn");

  async function init() {
    try {
      const res = await fetch(`/api/links/${linkId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "This link doesn't exist or has expired.");

      document.title = `A banner for ${data.name}`;

      cardImg.alt = `Personalized banner for ${data.name}`;
      cardImg.src = data.renderUrl;
      downloadBtn.href = data.renderUrl;
      downloadBtn.setAttribute("download", `banner-${data.name}.png`);

      cardImg.onload = () => {
        loadingState.hidden = true;
        cardFigure.hidden = false;
        cardActions.hidden = false;
      };
      cardImg.onerror = () => showError("Couldn't load the banner image.");
    } catch (err) {
      showError(err.message);
    }
  }

  function showError(msg) {
    loadingState.hidden = true;
    errorMessage.textContent = msg;
    errorState.hidden = false;
  }

  init();
})();
