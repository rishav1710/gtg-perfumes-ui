document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     STICKY HEADER LOGIC
  ===================================================== */
  const header = document.querySelector(".header");
  const heroWrapper = document.querySelector(".hero-wrapper-bg");

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");

      if (heroWrapper) {
        heroWrapper.style.paddingTop = `${header.offsetHeight}px`;
      }
    } else {
      header.classList.remove("scrolled");
      if (heroWrapper) {
        heroWrapper.style.paddingTop = "0";
      }
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Initial check in case the user reloads while scrolled down
  handleScroll();

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

  let hasAnimated = false;

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
      animateValue(el, 0, target, 2500);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          startStatsAnimation();
          hasAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);

  /* =====================================================
     PRODUCT GALLERY (UPDATED FOR SLIDING ANIMATION)
  ===================================================== */
  const gallery = [
    "assets/images/product-main.png",
    "assets/images/product-1.jpg",
    "assets/images/product-2.jpg",
    "assets/images/product-3.jpg",
    "assets/images/product-4.jpg",
  ];

  const slider = document.getElementById("psImageSlider");
  const prevBtn = document.getElementById("psPrev");
  const nextBtn = document.getElementById("psNext");
  const dotsContainer = document.getElementById("psDots");
  const thumbs = document.querySelectorAll(".ps-thumb");

  if (slider && prevBtn && nextBtn && dotsContainer) {
    let currentIndex = 0;

    function initializeSlider() {
      slider.innerHTML = "";
      gallery.forEach((src) => {
        const slide = document.createElement("div");
        slide.className = "ps-image-slide";
        slide.innerHTML = `<img src="${src}" alt="Product Image">`;
        slider.appendChild(slide);
      });
    }

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
      thumbs.forEach((t, index) => {
        const isThumbActive = index + 1 === currentIndex;
        t.classList.toggle("active", isThumbActive);
      });
    }

    function goTo(i) {
      if (i < 0) i = gallery.length - 1;
      if (i >= gallery.length) i = 0;
      currentIndex = i;

      const offset = -currentIndex * 100;
      slider.style.transform = `translateX(${offset}%)`;

      renderDots();
      updateThumbs();
    }

    initializeSlider();

    prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

    thumbs.forEach((t, index) => {
      t.addEventListener("click", () => {
        goTo(index + 1);
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
      const isBestSeller = f.id === "original";

      card.innerHTML = `
  ${isBestSeller ? `<span class="best-seller-tag">BEST-SELLER</span>` : ""}
  <div class="frag-head">
    <input type="radio" name="${name}" value="${f.id}" ${
        i === defaultIndex ? "checked" : ""
      }>
    <span class="frag-label">${f.label}</span>
  </div>
  <img src="${f.img}" alt="">
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

  const defaultPlanRow = document
    .querySelector("input[name='plan']:checked")
    ?.closest(".ps-plan");

  if (defaultPlanRow) {
    panelSingle.classList.add("no-anim");
    panelSingle.style.display = "block";

    defaultPlanRow.appendChild(panelSingle);

    panelSingle.style.maxHeight = panelSingle.scrollHeight + "px";
    panelSingle.offsetHeight;

    panelSingle.classList.add("is-expanded");
    panelSingle.classList.remove("no-anim");
  }

  function closePanel(panel) {
    panel.style.maxHeight = panel.scrollHeight + "px";
    panel.offsetHeight;

    panel.style.maxHeight = "0px";
    panel.classList.remove("is-expanded");
    panel.classList.add("is-collapsed");

    setTimeout(() => {
      panel.style.display = "none";
    }, 350);
  }

  function openPanelInsidePlan(panel, planRow) {
    panel.style.display = "block";

    planRow.appendChild(panel);

    panel.classList.remove("is-collapsed");
    panel.classList.add("is-expanded");

    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  let firstToggle = true;

  planRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (firstToggle) {
        panelDouble.classList.remove("no-anim");
        firstToggle = false;
      }

      const planRow = e.target.closest(".ps-plan");
      const isSingle = e.target.value === "single";

      const activePanel = isSingle ? panelSingle : panelDouble;
      const inactivePanel = isSingle ? panelDouble : panelSingle;

      closePanel(inactivePanel);
      openPanelInsidePlan(activePanel, planRow);

      updateAddToCart();
    });
  });

  /* =====================================================
     ADD TO CART URL BUILDER
  ===================================================== */
  const addToCartBtn = document.getElementById("psAddToCart");

  function buildCheckoutUrl() {
    const plan = document.querySelector("input[name='plan']:checked")?.value;
    if (!plan) return null;

    let url = `/checkout?plan=${plan}`;

    if (plan === "single") {
      const frag = document.querySelector(
        "input[name='frag_single']:checked"
      )?.value;
      if (frag) url += `&frag=${frag}`;
    } else {
      const f1 = document.querySelector(
        "input[name='frag_double_1']:checked"
      )?.value;
      const f2 = document.querySelector(
        "input[name='frag_double_2']:checked"
      )?.value;
      if (f1) url += `&f1=${f1}`;
      if (f2) url += `&f2=${f2}`;
    }

    return url;
  }

  function updateRedirectUrlInCurrentPage() {
    const checkoutUrl = buildCheckoutUrl();
    if (!checkoutUrl) return;

    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set(
      "redirect_url",
      encodeURIComponent(checkoutUrl)
    );

    window.history.replaceState({}, "", currentUrl.toString());
  }

  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    updateRedirectUrlInCurrentPage();
    console.log("redirect_url updated in current URL");
  });
});
