document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     MOBILE MENU
  ===================================================== */
  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");

  if (openBtn && closeBtn && drawer && overlay) {
    openBtn.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
    });

    overlay.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
    });
  }

  /* =====================================================
     ACCORDION
  ===================================================== */
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const icon = item.querySelector(".icon");

    // If initially active, set correct height
    if (item.classList.contains("active")) {
      content.style.height = content.scrollHeight + "px";
      icon.textContent = "−";
    }

    header.addEventListener("click", () => {
      accordionItems.forEach((i) => {
        const c = i.querySelector(".accordion-content");
        const ic = i.querySelector(".icon");

        if (i !== item) {
          i.classList.remove("active");
          c.style.height = "0px";
          ic.textContent = "+";
        }
      });

      if (item.classList.contains("active")) {
        // CLOSE
        item.classList.remove("active");
        content.style.height = "0px";
        icon.textContent = "+";
      } else {
        // OPEN
        item.classList.add("active");
        content.style.height = content.scrollHeight + "px";
        icon.textContent = "−";
      }
    });
  });

  /* =====================================================
   STATS COUNT-UP (RESTART ON RE-ENTER VIEW)
===================================================== */

  const statsSection = document.getElementById("statsSection");
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateValue(el, start, end, duration) {
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);

      el.textContent = value + "%";

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end + "%";
      }
    }

    requestAnimationFrame(step);
  }

  function startStatsAnimation() {
    statNumbers.forEach((el) => {
      const target = Number(el.dataset.target);
      animateValue(el, 0, target, 2500); // control speed here
    });
  }

  function resetStats() {
    statNumbers.forEach((el) => {
      el.textContent = "0%";
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startStatsAnimation();
        } else {
          resetStats();
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(statsSection);

  /* =====================================================
     PRODUCT GALLERY
  ===================================================== */
  const gallery = [
    "assets/images/product-main.png",
    "assets/images/product-1.jpg",
    "assets/images/product-2.jpg",
    "assets/images/product-3.jpg",
    "assets/images/product-4.jpg",
  ];

  const mainImage = document.getElementById("psMainImage");
  const prevBtn = document.getElementById("psPrev");
  const nextBtn = document.getElementById("psNext");
  const dotsContainer = document.getElementById("psDots");
  const thumbs = document.querySelectorAll(".ps-thumb");

  if (mainImage && prevBtn && nextBtn && dotsContainer) {
    let currentIndex = 0;

    function renderDots() {
      dotsContainer.innerHTML = "";
      gallery.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "ps-dot" + (i === currentIndex ? " active" : "");
        dot.onclick = () => goTo(i);
        dotsContainer.appendChild(dot);
      });
    }

    function updateThumbs() {
      thumbs.forEach((t) => {
        const idx = parseInt(t.dataset.index, 10);
        t.classList.toggle("active", idx === currentIndex);
      });
    }

    function goTo(i) {
      if (i < 0) i = gallery.length - 1;
      if (i >= gallery.length) i = 0;
      currentIndex = i;

      mainImage.src = gallery[currentIndex];
      renderDots();
      updateThumbs();
    }

    prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

    thumbs.forEach((t) => {
      t.addEventListener("click", () => {
        goTo(parseInt(t.dataset.index, 10));
      });
    });

    goTo(0);
  }

  /* =====================================================
     FRAGRANCE SELECTION
  ===================================================== */
  const fragrances = [
    {
      id: "original",
      label: "Original",
      img: "assets/images/frag-original.png",
    },
    { id: "lily", label: "Lily", img: "assets/images/frag-lily.png" },
    { id: "rose", label: "Rose", img: "assets/images/frag-rose.png" },
  ];

  const fragSingleWrap = document.getElementById("psFragSingle");
  const fragDouble1Wrap = document.getElementById("psFragDouble1");
  const fragDouble2Wrap = document.getElementById("psFragDouble2");

  function renderFragrances(wrapper, name, defaultIndex = 0) {
    if (!wrapper) return;

    wrapper.innerHTML = "";
    fragrances.forEach((f, i) => {
      const card = document.createElement("label");
      card.className = "frag-card" + (i === defaultIndex ? " active" : "");
      card.innerHTML = `
        <input type="radio" name="${name}" value="${f.id}" ${
        i === defaultIndex ? "checked" : ""
      }>
        <img src="${f.img}" alt="">
        <span>${f.label}</span>
      `;

      card.addEventListener("click", () => {
        wrapper
          .querySelectorAll(".frag-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        card.querySelector("input").checked = true;
        updateAddToCart();
      });

      wrapper.appendChild(card);
    });
  }

  renderFragrances(fragSingleWrap, "frag_single", 0);
  renderFragrances(fragDouble1Wrap, "frag_double_1", 0);
  renderFragrances(fragDouble2Wrap, "frag_double_2", 1);

  /* =====================================================
     PLAN SWITCHER
  ===================================================== */
  const planRadios = document.querySelectorAll("input[name='plan']");
  const panelSingle = document.querySelector(".ps-single");
  const panelDouble = document.querySelector(".ps-double");

  planRadios.forEach((r) => {
    r.addEventListener("change", () => {
      const isSingle = r.value === "single";
      panelSingle.style.display = isSingle ? "block" : "none";
      panelDouble.style.display = isSingle ? "none" : "block";
      updateAddToCart();
    });
  });

  /* =====================================================
     ADD TO CART URL BUILDER
  ===================================================== */
  const addToCart = document.getElementById("psAddToCart");

  function updateAddToCart() {
    if (!addToCart) return;

    const plan = document.querySelector("input[name='plan']:checked")?.value;

    let url = `/checkout?plan=${plan}`;

    if (plan === "single") {
      const frag = document.querySelector(
        "input[name='frag_single']:checked"
      )?.value;
      url += `&frag=${frag}`;
    } else {
      const f1 = document.querySelector(
        "input[name='frag_double_1']:checked"
      )?.value;
      const f2 = document.querySelector(
        "input[name='frag_double_2']:checked"
      )?.value;
      url += `&f1=${f1}&f2=${f2}`;
    }

    addToCart.href = url;
  }

  updateAddToCart();
});
