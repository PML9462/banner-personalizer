(() => {
  "use strict";

  const bannerId = window.location.pathname.split("/").filter(Boolean).pop();
  const params = new URLSearchParams(window.location.search);
  const prefillName = (params.get("name") || "").slice(0, 60);

  const loadingState = document.getElementById("loadingState");
  const errorState = document.getElementById("errorState");
  const errorMessage = document.getElementById("errorMessage");
  const content = document.getElementById("content");
  const cardImg = document.getElementById("cardImg");
  const nameForm = document.getElementById("nameForm");
  const nameInput = document.getElementById("nameInput");
  const generateBtn = document.getElementById("generateBtn");
  const hint = document.getElementById("hint");
  const cardActions = document.getElementById("cardActions");
  const downloadBtn = document.getElementById("downloadBtn");
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  const toast = document.getElementById("toast");

  let banner = null;
  let lastRenderedName = "";
  let debounceTimer = null;
  let toastTimer = null;

  function renderUrlFor(name) {
    return `/api/banners/${bannerId}/render?name=${encodeURIComponent(name)}`;
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  async function init() {
    try {
      const res = await fetch(`/api/banners/${bannerId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "This banner link isn't available.");
      if (!data.config) throw new Error("This banner isn't ready yet — please check back soon.");

      banner = data;
      document.title = `Personalize: ${banner.title}`;
      cardImg.src = banner.previewUrl;
      cardImg.alt = banner.title;

      loadingState.hidden = true;
      content.hidden = false;

      if (prefillName) {
        nameInput.value = prefillName;
        generate(prefillName);
      } else {
        nameInput.focus();
      }
    } catch (err) {
      showError(err.message);
    }
  }

  function showError(msg) {
    loadingState.hidden = true;
    errorMessage.textContent = msg;
    errorState.hidden = false;
  }

  function generate(rawName) {
    const name = rawName.trim();

    if (!name) {
      cardImg.src = banner.previewUrl;
      cardActions.hidden = true;
      hint.textContent = "Type your name above and we'll add it to the banner.";
      lastRenderedName = "";
      return;
    }
    if (name === lastRenderedName) return;
    lastRenderedName = name;

    generateBtn.disabled = true;
    cardImg.classList.add("is-loading");
    hint.textContent = "Personalizing your banner…";

    const url = renderUrlFor(name);
    const preload = new Image();
    preload.onload = () => {
      cardImg.src = url;
      cardImg.classList.remove("is-loading");
      generateBtn.disabled = false;
      hint.textContent = "Looking good! Download it or share your own link below.";
      downloadBtn.href = url;
      downloadBtn.setAttribute("download", `banner-${name}.png`);
      cardActions.hidden = false;
    };
    preload.onerror = () => {
      cardImg.classList.remove("is-loading");
      generateBtn.disabled = false;
      hint.textContent = "Couldn't generate that just now — please try again.";
      lastRenderedName = "";
    };
    preload.src = url;
  }

  nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearTimeout(debounceTimer);
    generate(nameInput.value);
  });

  nameInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const value = nameInput.value;
    debounceTimer = setTimeout(() => generate(value), 600);
  });

  copyLinkBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    if (!name) return;
    const shareUrl = `${window.location.origin}/customer/${bannerId}?name=${encodeURIComponent(name)}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Link copied");
    } catch {
      showToast("Couldn't copy — copy it from the address bar instead");
    }
  });

  init();
})();
