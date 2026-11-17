/* =========================================================
   SETTINGS: change these to Eleni's real details
   ========================================================= */
const WHATSAPP_NUMBER = "35700000000"; // country code + number, digits only (e.g. 35799123456)
const FACEBOOK_URL = "https://www.facebook.com/"; // her Facebook page link

/* ---------- WhatsApp links with pre-filled messages ---------- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(a.dataset.wa)}`;
  a.target = "_blank";
  a.rel = "noopener";
});
document.getElementById("facebookLink").href = FACEBOOK_URL;
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Photo placeholders when an image file is missing ---------- */
/* Only an image that truly failed gets the placeholder. Safari can briefly report
   "complete" with no size while a photo is still downloading, so a successful
   load always removes the placeholder again. */
document.querySelectorAll(".photo img").forEach((img) => {
  const box = img.closest(".photo");
  // Whole-cake frames use a soft blurred copy of the same photo as their background
  if (box.classList.contains("fit")) box.style.setProperty("--src", `url("${img.getAttribute("src")}")`);
  img.addEventListener("error", () => box.classList.add("ph"));
  img.addEventListener("load", () => box.classList.remove("ph"));
  if (img.complete && img.naturalWidth > 0) box.classList.remove("ph");
});

/* ---------- Nav: background on scroll + mobile menu ---------- */
const nav = document.querySelector(".nav");
const burger = document.getElementById("burger");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
document.querySelectorAll("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Menu filters ---------- */
const chips = document.querySelectorAll(".chip");
const products = document.querySelectorAll(".product");
const productList = document.querySelector(".products");
chips.forEach((chip) =>
  chip.addEventListener("click", () => {
    chips.forEach((c) => {
      c.classList.toggle("active", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    const f = chip.dataset.filter;
    products.forEach((p) => {
      const show = f === "all" || p.dataset.cat === f;
      p.classList.toggle("hidden", !show);
      if (show) p.classList.add("in");
    });
    productList.scrollTo({ left: 0, behavior: "smooth" });
  })
);

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Floating order button: hide over hero & final CTA ---------- */
const floatCta = document.querySelector(".float-cta");
const hidden = new Set();
const ctaObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => (e.isIntersecting ? hidden.add(e.target) : hidden.delete(e.target)));
  floatCta.classList.toggle("show", hidden.size === 0);
});
[document.querySelector(".hero"), document.querySelector(".cta"), document.querySelector(".footer")].forEach((el) =>
  ctaObserver.observe(el)
);
