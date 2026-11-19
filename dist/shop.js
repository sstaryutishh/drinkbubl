const el = id => document.getElementById(id);
const thumbnails = [...document.querySelectorAll('.thumbs button')];
const images = [
  ['maker-white.jpg', 'Ivory sparkling water maker beside a glass of lemon sparkling water', false],
  ['maker-white.jpg', 'Close-up of the sparkling water maker', true],
  ['pour.jpg', 'Sparkling water poured into a glass with lemon', false],
  ['maker.jpg', 'Refillable bottle on the sparkling water maker', true],
  ['maker.jpg', 'Glass of sparkling water beside the maker', false]
];
let current = 0;
function showImage(index) {
  current = (index + images.length) % images.length;
  const [file, description, zoom] = images[current];
  el('hero').src = 'assets/' + file;
  el('hero').alt = description;
  el('hero').classList.toggle('zoom', zoom);
  thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
}
thumbnails.forEach((button, index) => button.onclick = () => showImage(index));

let bag = 0;
try {
  const saved = Number(localStorage.getItem('drinkbubl-bag'));
  if (Number.isSafeInteger(saved) && saved > 0) bag = saved;
} catch {}
function renderBag() {
  el('count').textContent = bag;
  el('contents').innerHTML = bag
    ? `<div class="line"><img src="assets/maker-white.jpg" alt=""><div><strong>Sparkling Water Maker</strong><p>Quantity · ${bag}</p></div><button id="remove">Remove</button></div><div class="line"><strong>Subtotal</strong><strong>$${bag * 99}</strong></div><p class="note">Checkout is coming soon.</p>`
    : '<p>Your bag is empty.</p>';
  if (bag) el('remove').onclick = () => saveBag(0);
}
function saveBag(value) {
  bag = value;
  try { localStorage.setItem('drinkbubl-bag', String(bag)); } catch {}
  renderBag();
}
el('add').onclick = () => { saveBag(bag + 1); el('drawer').showModal(); };
const floatingAdd = el('floating-add');
floatingAdd.onclick = () => el('add').click();
function updateFloatingAdd() {
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  if (!isMobile) {
    floatingAdd.classList.remove('is-visible');
    return;
  }

  const nativeButton = el('add').getBoundingClientRect();
  floatingAdd.style.left = `${nativeButton.left}px`;
  floatingAdd.style.width = `${nativeButton.width}px`;
  floatingAdd.style.height = `${nativeButton.height}px`;

  const floatingButtonTop = floatingAdd.getBoundingClientRect().top;
  floatingAdd.classList.toggle('is-visible', nativeButton.top > floatingButtonTop);
}
window.addEventListener('scroll', updateFloatingAdd, { passive: true });
window.addEventListener('resize', updateFloatingAdd);
el('bag').onclick = () => el('drawer').showModal();
el('close').onclick = () => el('drawer').close();
renderBag();
updateFloatingAdd();
