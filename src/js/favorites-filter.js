import { renderFavoritesCartsListMarkup, favoritesDataInit } from '../js/favorites';
const filterNavigation = document.querySelector('.js-favorites-filter');
const filterNavigationButtons = document.querySelectorAll('.fav-categoty-btn');

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

function addActiveClass(category) {
  filterNavigationButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });
}

function renderFilteredCards(currentCategory) {
  if (currentCategory === 'all') {
    renderFavoritesCartsListMarkup(favoritesData);
    return;
  }
  let filteredCardsList = favoritesData.filter(card => card.category === currentCategory);
  renderFavoritesCartsListMarkup(filteredCardsList);
}
