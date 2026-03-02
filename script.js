"use strict";

/** ---------- Small helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** ---------- Year in footer ---------- */
$("#year").textContent = String(new Date().getFullYear());

/** ---------- Mobile nav toggle ---------- */
const navToggle = $("#navToggle");
const siteNav = $("#siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// close nav when clicking a link (mobile)
$$(".site-nav a").forEach((a) => {
  a.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/** ---------- Facts data (placeholders) ---------- */
const facts = [
  { title: "Pigeons Have Impressive Cognitive Skills", category: "Biology", text: "Research has shown that pigeons can recognize human faces and remember them for long periods of time. They are able to categorize objects and make distinctions between visual patterns with surprising accuracy. In laboratory experiments, pigeons have even demonstrated the ability to understand basic concepts such as similarity and difference. Their brains may be small, but their problem-solving abilities challenge many assumptions about bird intelligence." },
  { title: "Pigeons used to be messengers", category: "History", text: "For centuries, pigeons played a crucial role in communication. Long before telephones and the internet existed, trained homing pigeons were used to deliver messages across great distances. Their natural ability to return to their home loft made them highly reliable. During wars, especially in the 19th and early 20th centuries, pigeons carried military messages that saved lives when other communication systems failed. Some even received awards for their service. Their role as messengers is one of the most remarkable examples of human–animal cooperation in history." },
  { title: "Pigeons recognize places", category: "Biology", text: "Pigeons have an extraordinary ability to recognize and remember locations. They use a combination of visual landmarks, the position of the sun, and even Earth’s magnetic field to navigate. Studies have shown that pigeons can remember complex routes and return home from unfamiliar areas many kilometers away. In urban environments, they quickly learn the layout of streets, buildings, and regular feeding spots. Their spatial memory is highly developed, making them one of the best natural navigators among birds." },
  { title: "City pigeons descend from rock pigeons", category: "City", text: "Modern city pigeons are descendants of the rock pigeon, a species originally native to cliffs and rocky coastlines. As human cities developed, tall buildings and bridges provided ideal substitutes for natural cliffs. Over time, domesticated and feral pigeons spread into urban areas and adapted to life alongside humans. Despite their city lifestyle, their instincts and behaviors still reflect their cliff-dwelling ancestry. In many ways, cities simply became artificial rock habitats." },
  { title: "Pigeons can be trained", category: "Biology", text: "Pigeons are highly trainable and surprisingly intelligent. They can learn to recognize shapes, colors, patterns, and even distinguish between different artistic styles in experiments. With positive reinforcement, pigeons can be trained to perform tasks, follow signals, and return to specific locations. Their learning ability has made them subjects in scientific research, particularly in studies about memory, perception, and decision-making. Far from being simple birds, pigeons are capable of complex cognitive processes." },
  { title: "Pigeons in Ancient Civilizations", category: "History", text: "Pigeons were already domesticated thousands of years ago. Ancient Egyptians, Greeks, and Romans kept pigeons for food, religious symbolism, and communication. In Ancient Greece, pigeons were reportedly used to announce the winners of the Olympic Games to distant cities. Their ability to return home made them valuable long before modern communication systems existed." },
  { title: "Pigeons in World War I and II", category: "History", text: "During both World War I and World War II, pigeons were used extensively by military forces to carry critical messages across enemy lines. When radio communication failed or was intercepted, pigeons provided a reliable alternative. One famous pigeon, known as Cher Ami, delivered a message in 1918 that helped save nearly 200 soldiers despite being seriously injured. Thousands of military pigeons were deployed during wartime, proving their strategic importance in modern history." },
];

/* -------- Random Fun Fact -------- */
const randomFactEl = document.getElementById("randomFact");

if (randomFactEl) {
  const randomIndex = Math.floor(Math.random() * facts.length);
  randomFactEl.textContent = facts[randomIndex].title;
}

const factList = $("#factList");
const factSearch = $("#factSearch");
const factFilter = $("#factFilter");

function renderFacts(items) {
  factList.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.className = "fact-item";
    li.textContent = "Keine Treffer. Tauben bleiben mysteriös.";
    factList.appendChild(li);
    return;
  }

  for (const f of items) {
    const li = document.createElement("li");
    li.className = "fact-item";

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = f.category;

    const h3 = document.createElement("h3");
    h3.textContent = f.title;

    const p = document.createElement("p");
    p.textContent = f.text;

    li.appendChild(badge);
    li.appendChild(h3);
    li.appendChild(p);

    factList.appendChild(li);
  }
}

function filterFacts() {
  const q = (factSearch.value || "").trim().toLowerCase();
  const cat = factFilter.value.trim().toLowerCase();

  console.log("Selected:", cat);
console.log("Facts categories:", facts.map(f => f.category));

  const filtered = facts.filter((f) => {
    const matchesCat =
      cat === "all"
        ? true
        : f.category.toLowerCase() === cat;

    const hay = `${f.title} ${f.text} ${f.category}`.toLowerCase();
    const matchesText = q.length === 0 ? true : hay.includes(q);

    return matchesCat && matchesText;
  });

  renderFacts(filtered);
}

factSearch.addEventListener("input", filterFacts);
factFilter.addEventListener("change", filterFacts);
renderFacts(facts);

/** ---------- Gallery modal ---------- */
const imgModal = $("#imgModal");
const modalImg = $("#modalImg");
const modalCaption = $("#modalCaption");
const modalClose = $("#modalClose");

function openModal(src, alt) {
  modalImg.src = src;
  modalImg.alt = alt || "Bild";
  modalCaption.textContent = alt || "";
  if (typeof imgModal.showModal === "function") imgModal.showModal();
}

function closeModal() {
  if (typeof imgModal.close === "function") imgModal.close();
}

$("#galleryGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".tile");
  if (!btn) return;

  const src = btn.getAttribute("data-img");
  const alt = btn.getAttribute("data-alt");
  openModal(src, alt);
});

modalClose.addEventListener("click", closeModal);
imgModal.addEventListener("click", (e) => {
  // click outside image closes
  const rect = imgModal.getBoundingClientRect();
  const clickedOutside =
    e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
  if (clickedOutside) closeModal();
});

