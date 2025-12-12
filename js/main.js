const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const drawer = document.getElementById("mobileDrawer");
const overlay = document.getElementById("mobileOverlay");

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

// ---------- Product gallery & subscription logic ----------
(() => {
  /* ---------------------------
     GALLERY CONFIG (5 images)
  ----------------------------*/
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

  let currentIndex = 0;

  /* Render dots */
  function renderDots() {
    dotsContainer.innerHTML = "";
    gallery.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "ps-dot" + (i === currentIndex ? " active" : "");
      dot.dataset.index = i;
      dot.onclick = () => goTo(i);
      dotsContainer.appendChild(dot);
    });
  }

  /* Activate thumbnail */
  function updateThumbs() {
    thumbs.forEach((t) => {
      const idx = parseInt(t.dataset.index);
      t.classList.toggle("active", idx === currentIndex);
    });
  }

  /* Change image */
  function goTo(i) {
    if (i < 0) i = gallery.length - 1;
    if (i >= gallery.length) i = 0;
    currentIndex = i;

    mainImage.src = gallery[currentIndex];
    renderDots();
    updateThumbs();
  }

  prevBtn.onclick = () => goTo(currentIndex - 1);
  nextBtn.onclick = () => goTo(currentIndex + 1);

  thumbs.forEach((t) => {
    t.onclick = () => {
      goTo(parseInt(t.dataset.index));
    };
  });

  goTo(0); // init gallery

  /* ---------------------------
     FRAGRANCES (3 shared)
  ----------------------------*/
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

  function renderFragranceOptions() {
    // Single
    fragSingleWrap.innerHTML = "";
    fragrances.forEach((f, i) => {
      const card = document.createElement("label");
      card.className = "frag-card" + (i === 0 ? " active" : "");
      card.innerHTML = `
        <input type="radio" name="frag_single" value="${f.id}" ${
        i === 0 ? "checked" : ""
      }>
        <img src="${f.img}" alt="">
        <span>${f.label}</span>
      `;
      card.onclick = () => {
        fragSingleWrap
          .querySelectorAll(".frag-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        card.querySelector("input").checked = true;
        updateAddToCart();
      };
      fragSingleWrap.appendChild(card);
    });

    // Double 1
    fragDouble1Wrap.innerHTML = "";
    fragrances.forEach((f, i) => {
      const card = document.createElement("label");
      card.className = "frag-card" + (i === 0 ? " active" : "");
      card.innerHTML = `
        <input type="radio" name="frag_double_1" value="${f.id}" ${
        i === 0 ? "checked" : ""
      }>
        <img src="${f.img}" alt="">
        <span>${f.label}</span>
      `;
      card.onclick = () => {
        fragDouble1Wrap
          .querySelectorAll(".frag-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        card.querySelector("input").checked = true;
        updateAddToCart();
      };
      fragDouble1Wrap.appendChild(card);
    });

    // Double 2
    fragDouble2Wrap.innerHTML = "";
    fragrances.forEach((f, i) => {
      const card = document.createElement("label");
      card.className = "frag-card" + (i === 1 ? " active" : "");
      card.innerHTML = `
        <input type="radio" name="frag_double_2" value="${f.id}" ${
        i === 1 ? "checked" : ""
      }>
        <img src="${f.img}" alt="">
        <span>${f.label}</span>
      `;
      card.onclick = () => {
        fragDouble2Wrap
          .querySelectorAll(".frag-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        card.querySelector("input").checked = true;
        updateAddToCart();
      };
      fragDouble2Wrap.appendChild(card);
    });
  }

  renderFragranceOptions();

  /* ---------------------------
     PLAN SWITCHER
  ----------------------------*/
  const planRadios = document.querySelectorAll("input[name='plan']");
  const panelSingle = document.querySelector(".ps-single");
  const panelDouble = document.querySelector(".ps-double");

  planRadios.forEach((r) => {
    r.onchange = () => {
      if (r.value === "single") {
        panelSingle.style.display = "block";
        panelDouble.style.display = "none";
      } else {
        panelSingle.style.display = "none";
        panelDouble.style.display = "block";
      }
      updateAddToCart();
    };
  });

  /* ---------------------------
     PURCHASE TYPE
  ----------------------------*/
  document
    .querySelectorAll("input[name='purchaseType']")
    .forEach((r) => (r.onchange = updateAddToCart));

  /* ---------------------------
     ADD TO CART URL BUILDER
  ----------------------------*/
  const addToCart = document.getElementById("psAddToCart");

  function updateAddToCart() {
    const plan = document.querySelector("input[name='plan']:checked").value;
    const purchase = document.querySelector(
      "input[name='purchaseType']:checked"
    ).value;

    let url = "/checkout?plan=" + plan;

    if (plan === "single") {
      const frag = document.querySelector(
        "input[name='frag_single']:checked"
      ).value;
      url += `&product=main&frag=${frag}&type=${purchase}`;
    } else {
      const f1 = document.querySelector(
        "input[name='frag_double_1']:checked"
      ).value;
      const f2 = document.querySelector(
        "input[name='frag_double_2']:checked"
      ).value;
      url += `&product=main&f1=${f1}&f2=${f2}&type=${purchase}`;
    }

    addToCart.href = url;
  }

  updateAddToCart();
})();
