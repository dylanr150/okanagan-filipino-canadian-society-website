  const header = document.querySelector(".main-header");
  const btn = document.querySelector(".menu-toggle");

  btn.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when going back to desktop size
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      header.classList.remove("menu-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
