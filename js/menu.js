// ===== MENU.JS =====

document.addEventListener('DOMContentLoaded', () => {

  const tabs       = document.querySelectorAll('.tab');
  const cards      = document.querySelectorAll('.dish-card');
  const catHeaders = document.querySelectorAll('.category-header');
  const menuGrids  = document.querySelectorAll('.menu-grid');
  const searchInput = document.getElementById('searchInput');
  const noResults  = document.getElementById('noResults');

  // ── Filter by category tab ──
  function filterByCategory(cat) {
    catHeaders.forEach(h => {
      h.style.display = (cat === 'all' || h.dataset.cat === cat) ? '' : 'none';
    });
    menuGrids.forEach(g => {
      // show/hide each card within the grid
      const allCards = g.querySelectorAll('.dish-card');
      let visible = 0;
      allCards.forEach(c => {
        const match = cat === 'all' || c.dataset.cat === cat;
        c.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      g.style.display = visible === 0 ? 'none' : '';
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterByCategory(tab.dataset.cat);
      if (searchInput) searchInput.value = '';
    });
  });

  // ── Search ──
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();

      // Reset tab highlight
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector('.tab[data-cat="all"]').classList.add('active');

      let totalVisible = 0;

      cards.forEach(card => {
        const name = (card.dataset.name || '').toLowerCase();
        const match = name.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) totalVisible++;
      });

      // show/hide category headers and grids
      menuGrids.forEach(g => {
        const visible = Array.from(g.querySelectorAll('.dish-card'))
          .filter(c => c.style.display !== 'none').length;
        g.style.display = visible === 0 ? 'none' : '';
      });
      catHeaders.forEach(h => {
        const catCards = document.querySelectorAll(`.dish-card[data-cat="${h.dataset.cat}"]`);
        const visible  = Array.from(catCards).filter(c => c.style.display !== 'none').length;
        h.style.display = visible === 0 ? 'none' : '';
      });

      if (noResults) {
        noResults.style.display = totalVisible === 0 ? 'block' : 'none';
      }
    });
  }

});
