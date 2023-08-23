// =============== PAGINATION=============
import { renderFavoritesCartsListMarkup, favoritesDataInit } from '../js/favorites';
let favoritesData = favoritesDataInit();
export function renderFavoritesCartsListMarkupPerPage() {
  const favoritesCards = document.querySelector('.favorite-render-cards');
  if (favoritesCards) {
    favoritesCards.innerHTML = '';
    let newfavoritesData = [];
    let startPoint = 1;
    let endPoint = 4;
    newfavoritesData = favoritesData.filter((recipe, index) => index >= startPoint && index <= endPoint);
    renderFavoritesCartsListMarkup(newfavoritesData);
  }
}
