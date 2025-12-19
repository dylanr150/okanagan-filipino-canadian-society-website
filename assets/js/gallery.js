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
      linkHref: "https://www.facebook.com/groups/okanaganfilipinoclub/discussion/preview"
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

// Build slides + dots (DOM nodes = no HTML parsing quirks)
track.innerHTML = "";
dotsWrap.innerHTML = "";

slidesData.forEach((s, i) => {
  const article = document.createElement("article");
  article.className = "slide" + (i === 0 ? " is-active" : "");

  const img = document.createElement("img");
  img.src = s.image;
  img.alt = s.title;

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const inner = document.createElement("div");
  inner.className = "overlay-inner";

  const kicker = document.createElement("div");
  kicker.className = "kicker";
  kicker.textContent = s.type;

  const h2 = document.createElement("h2");
  h2.textContent = s.title;

  const p = document.createElement("p");
  p.textContent = s.text;

const a = document.createElement("a");
a.className = "readmore";
a.textContent = s.linkText;

// keep href for right-click / accessibility
a.href = s.linkHref;

// force correct navigation on left click
a.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const url = s.linkHref;
  if (url.startsWith("http")) {
    window.open(url, "_blank", "noopener");
  } else {
    window.location.href = url;
  }
}, true); // <-- capture phase (wins against other listeners)


  inner.append(kicker, h2, p, a);
  overlay.appendChild(inner);
  article.append(img, overlay);
  track.appendChild(article);

  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " is-active" : "");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dotsWrap.appendChild(dot);
});


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

  document.addEventListener("click", (e) => {
  console.log("CLICKED:", e.target);
}, true);

});
