import { renderFavoritesCartsListMarkup, favoritesDataInit } from '../js/favorites';
import { createFavPagination } from './pagination';

const paginationWrap2 = document.querySelector('#pagination2');
let favoritesData = favoritesDataInit();

let PER_PAGE_FAV = 0;
if (document.documentElement.clientWidth < 768) {
  PER_PAGE_FAV = 9;
} else {
  PER_PAGE_FAV = 12;
}

let totalFavItems = 0;
if (localStorage.favorites) {
  favoritesData = JSON.parse(localStorage.favorites);
  totalFavItems = favoritesData.length;
}

if (document.title === 'Favorites tasty treats' && totalFavItems > PER_PAGE_FAV) {
  createFavPagination(totalFavItems);
}

export function renderFavoritesCartsListMarkupPerPage(page) {
  const favoritesCards = document.querySelector('.favorite-render-cards');
  if (favoritesCards) {
    favoritesCards.innerHTML = '';
    let newfavoritesData = [];
    let startPoint = (page - 1) * PER_PAGE_FAV;
    let endPoint = startPoint + PER_PAGE_FAV - 1;
    newfavoritesData = favoritesData.filter((recipe, index) => index >= startPoint && index <= endPoint);
    renderFavoritesCartsListMarkup(newfavoritesData);
  }
}

// Експортувати змінну filterNavigation з favorites-filtes.js
const filterNavigation = document.querySelector('.js-favorites-filter');
let pickedFavCategory = '';
export let pickedFavCategoryArray = [];

if (filterNavigation) {
  filterNavigation.addEventListener('click', handleFavNavigationClick);
}

function handleFavNavigationClick(event) {
  if (event.target.classList.contains('fav-categoty-btn')) {
    pickedFavCategory = event.target.dataset.category;

    if (pickedFavCategory === 'all') {
      pickedFavCategory = '';
      pickedFavCategoryArray = favoritesData;

      if (localStorage.favorites) {
        totalFavItems = JSON.parse(localStorage.favorites).length;
      }

      createFavPagination(totalFavItems);

      if (paginationWrap2.classList.contains('is-hidden')) {
        paginationWrap2.classList.remove('is-hidden');
      }
    } else {
      pickedFavCategoryArray = favoritesData.filter(({ category }) => category === pickedFavCategory);

      if (pickedFavCategoryArray.length <= PER_PAGE_FAV) {
        paginationWrap2.classList.add('is-hidden');
      } else {
        totalFavItems = pickedFavCategoryArray.length;
        createFavPagination(totalFavItems);
        paginationWrap2.classList.remove('is-hidden');
      }
    }
  }
}

export function renderFavoritesCartsListMarkupByCategoryPerPage(array, page) {
  const favoritesCards = document.querySelector('.favorite-render-cards');
  if (favoritesCards) {
    favoritesCards.innerHTML = '';
    let newfavoritesData = [];
    let startPoint = (page - 1) * PER_PAGE_FAV;
    let endPoint = startPoint + PER_PAGE_FAV - 1;
    newfavoritesData = array.filter((recipe, index) => index >= startPoint && index <= endPoint);
    renderFavoritesCartsListMarkup(newfavoritesData);
  }
}
