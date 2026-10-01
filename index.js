function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

async function showLoadingState(content, loading, filter = null) {
  if (!content || !loading) return;

  loading.hidden = false;
  content.hidden = true;
  content.setAttribute("aria-busy", "true");
  if (filter) filter.disabled = true;

  let timeout;
  try {
    const imagesReady = Promise.all(
      Array.from(content.querySelectorAll("img"), (img) =>
        img.decode().catch(() => {})
      )
    );

    await Promise.all([
      // Keep the spinner briefly visible even when images are cached.
      new Promise((resolve) => setTimeout(resolve, 350)),
      Promise.race([
        imagesReady,
        // Reveal the page even if an image takes too long to load.
        new Promise((resolve) => { timeout = setTimeout(resolve, 8000); }),
      ]),
    ]);
  } finally {
    clearTimeout(timeout);
    loading.hidden = true;
    content.hidden = false;
    content.setAttribute("aria-busy", "false");
    if (filter) filter.disabled = false;
  }
}

showLoadingState(
  document.getElementById("home-content"),
  document.getElementById("home-loading")
);
