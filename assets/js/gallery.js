document.addEventListener("DOMContentLoaded", () => {
  // ✅ EDIT THIS ARRAY ONLY (easy updates)
  const slidesData = [
    {
      type: "Event",
      title: "Community Gathering — Details Coming Soon",
      text: "We’re updating the events calendar. In the meantime, check our Events page for updates.",
      image: "https://picsum.photos/id/1011/1600/900",
      linkText: "Read more",
      linkHref: "events.html"
    },
    {
      type: "News",
      title: "Society Updates & Announcements",
      text: "Important updates will be shared here as the site grows. For now, refer to our Facebook page.",
      image: "https://picsum.photos/id/1015/1600/900",
      linkText: "Read more",
      linkHref: "news.html"
    },
    {
      type: "Community",
      title: "Celebrating Culture in the Okanagan",
      text: "We’re building a space to highlight Filipino-Canadian culture, stories, and community connection.",
      image: "https://picsum.photos/id/1025/1600/900",
      linkText: "Learn more",
      linkHref: "about_us.html"
    }
  ];

  const track = document.getElementById("galleryTrack");
  const dotsWrap = document.getElementById("galleryDots");
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const nextBtn = document.querySelector(".gallery-btn.next");

  if (!track || !dotsWrap) return;

  // Build slides + dots
  track.innerHTML = slidesData.map((s, i) => `
    <article class="slide ${i === 0 ? "is-active" : ""}">
      <img src="${s.image}" alt="${s.title}">
      <div class="overlay">
        <div class="overlay-inner">
          <div class="kicker">${s.type}</div>
          <h2>${s.title}</h2>
          <p>${s.text}</p>
          <a class="readmore" href="${s.linkHref}">${s.linkText}</a>
        </div>
      </div>
    </article>
  `).join("");

  dotsWrap.innerHTML = slidesData.map((_, i) => `
    <button class="dot ${i === 0 ? "is-active" : ""}" type="button" aria-label="Go to slide ${i + 1}"></button>
  `).join("");

  const slides = Array.from(document.querySelectorAll(".home-gallery .slide"));
  const dots = Array.from(document.querySelectorAll(".home-gallery .dot"));

  let current = 0;
  let timer = null;

  function show(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, 6000);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  nextBtn?.addEventListener("click", () => { next(); startAuto(); });
  prevBtn?.addEventListener("click", () => { prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { show(i); startAuto(); });
  });

  // Pause on hover
  const slider = document.querySelector(".home-gallery");
  slider?.addEventListener("mouseenter", stopAuto);
  slider?.addEventListener("mouseleave", startAuto);

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { prev(); startAuto(); }
    if (e.key === "ArrowRight") { next(); startAuto(); }
  });

  startAuto();
});
