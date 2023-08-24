import { renderFavoritesCartsListMarkup, renderFavoritesFilterNavigationMarkup, favoritesDataInit } from '../js/favorites';
const filterNavigation = document.querySelector('.js-favorites-filter');

let favoritesData = favoritesDataInit();

if (filterNavigation) {
  filterNavigation.addEventListener('click', favoritesFilter);
}

function favoritesFilter(e) {
  if (e.target.classList.contains('fav-categoty-btn')) {
    const category = e.target.dataset.category;
    addActiveClass(category);
    renderFilteredCards(category);
  }
}

export function renderFilteredCards(currentCategory) {
  if (currentCategory === 'all') {
    renderFavoritesFilterNavigationMarkup();
    renderFavoritesCartsListMarkup(JSON.parse(localStorage.favorites));
    addActiveClass('all');
    return;
  }
  let filteredCardsList = JSON.parse(localStorage.favorites).filter(card => card.category === currentCategory);
  renderFavoritesCartsListMarkup(filteredCardsList);
  renderFavoritesFilterNavigationMarkup();
  addActiveClass(currentCategory);
}

function addActiveClass(name) {
  const ollFilterButtons = document.querySelectorAll('.fav-categoty-btn');
  ollFilterButtons.forEach(btn => {
    if (btn.dataset.category === name) {
      btn.classList.add('active');
    }
  });
}
