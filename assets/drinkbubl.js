const hero = document.getElementById('hero');
const thumbnails = [...document.querySelectorAll('.thumbs button')];

thumbnails.forEach((button, index) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    hero.src = image.src;
    hero.alt = button.getAttribute('aria-label');
    hero.classList.toggle('zoom', index === 1 || index === 3);
    thumbnails.forEach(thumbnail => {
      thumbnail.setAttribute('aria-pressed', String(thumbnail === button));
    });
  });
});

const flavorButtons = [...document.querySelectorAll('.options button')];
flavorButtons.forEach(button => {
  button.addEventListener('click', () => {
    flavorButtons.forEach(option => {
      const selected = option === button;
      option.classList.toggle('selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
  });
});

const purchaseCards = [...document.querySelectorAll('.purchase-card')];
purchaseCards.forEach(card => {
  card.addEventListener('change', () => {
    purchaseCards.forEach(option => option.classList.toggle('selected', option === card));
  });
});

const variantSelect = document.getElementById('variant-id');
const nativeAdd = document.getElementById('add');
const floatingAdd = document.getElementById('floating-add');
const floatingPurchase = document.getElementById('floating-purchase');

if (variantSelect) {
  variantSelect.addEventListener('change', () => {
    const selected = variantSelect.selectedOptions[0];
    const price = selected.dataset.price;
    document.getElementById('total').textContent = price;
    floatingAdd.textContent = `ADD TO BAG | ${price}`;
  });
}

if (nativeAdd && floatingAdd) {
  floatingAdd.addEventListener('click', () => nativeAdd.click());

  function updateFloatingAdd() {
    if (!window.matchMedia('(max-width: 760px)').matches) {
      floatingPurchase.classList.remove('is-visible');
      return;
    }

    const nativeButton = nativeAdd.getBoundingClientRect();
    floatingAdd.style.width = `${nativeButton.width}px`;
    floatingAdd.style.height = `${nativeButton.height}px`;
    floatingPurchase.classList.toggle('is-visible', nativeButton.top > floatingAdd.getBoundingClientRect().top);
  }

  window.addEventListener('scroll', updateFloatingAdd, { passive: true });
  window.addEventListener('resize', updateFloatingAdd);
  updateFloatingAdd();
}
