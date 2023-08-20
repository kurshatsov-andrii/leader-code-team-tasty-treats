import axios from 'axios';
import _ from 'lodash';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const recipeList = document.querySelector('.recipe-list');
const searchInput = document.querySelector('.search-input');
const pagList = document.querySelector('.pagination-list');
const reset = document.querySelector('.reset-wrap');
const allCategories = document.querySelector('.all-categories');
const jsGuard = document.querySelector('.js-guard');
const preLastLeft = document.querySelector('.prelast-left');
const categoriesList = document.querySelector('.categories-wrapper');

// ==================VARIABLES================
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

let page = 1;

let PER_PAGE = 0;
if (document.documentElement.clientWidth < 768) {
  PER_PAGE = 6;
} else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
  PER_PAGE = 8;
} else {
  PER_PAGE = 9;
}

let totalPages = 0;
if (document.documentElement.clientWidth < 768) {
  totalPages = 48;
} else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
  totalPages = 36;
} else {
  totalPages = 32;
}

// ================EVENT LISTENERS=================

if (searchInput) {
  searchInput.addEventListener('input', _.debounce(handleSearchInput, 500));
}

function handleSearchInput(event) {
  const searchedTitle = event.target.value.trim();
  renderSearchedRecipes(searchedTitle);
}

if (reset) {
  reset.addEventListener('click', handleResetClick);
}

function handleResetClick() {
  searchInput.value = '';
  renderAllRecipes();
}

if (allCategories) {
  allCategories.addEventListener('click', handleAllCategoriesClick);
}

function handleAllCategoriesClick() {
  searchInput.value = '';
  renderAllRecipes();
}

if (categoriesList) {
  categoriesList.addEventListener('click', handleCategoriesListClick);
}

function handleCategoriesListClick(event) {
  if (!event.target.classList.contains('btn')) {
    return;
  }
  console.log(event.target.innerText);
  let pickedCategory = event.target.innerText;
  renderRecipe(pickedCategory);
}

if (pagList) {
  pagList.addEventListener('click', handlePagListClick);
}

function handlePagListClick(event) {
  if (!event.target.classList.contains('pag-item') || event.target.classList.contains('unactive')) {
    return;
  }

  page = Number(event.target.textContent);

  if (!isNaN(page)) {
    pagList.innerHTML = createPagination(totalPages, page);
  }
}
// =================FETCH FUNCTIONS===================
export async function fetchAllRecipes() {
  const response = await axios.get(`${BASE_URL}recipes?limit=${PER_PAGE}&page=${page}`);
  return response;
}

async function fetchRecipeByTitle(title) {
  const response = await axios.get(`${BASE_URL}recipes?title=${title}`);
  return response;
}

async function fetchRecipeByCategory(category) {
  const response = await axios.get(`${BASE_URL}recipes?category=${category}`);
  return response;
}

// ================= CREATE MARK-UP FUNCTIONS=================
export function createAllRecipesMarkUp(allRecipesObj) {
  return allRecipesObj.results
    .map(({ title, description, preview, rating, _id }) => {
      return `<li class="recipe-item">
        <a href="${preview}" class="recipe-link">
          <img src="${preview}" alt="${title}" class="recipe-image" />
          <div class="recipe-card-bg-cover">
  <svg class="icon-heart">
    <path
      d="M15.991 6.848c-2.665-3.117-7.111-3.956-10.449-1.103-3.34 2.854-3.811 7.625-1.187 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.503 0.364 0.057 0.017 0.123 0.027 0.191 0.027s0.134-0.010 0.195-0.029l-0.005 0.001c0.141-0.042 0.262-0.15 0.505-0.364 2.163-1.916 8.764-7.834 10.944-10.64 2.623-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.786-2.016-10.452 1.101z"
    ></path>
  </svg>
          <div class="recipe-card-text-wrap">         
          <h3 class="recipe-title">${formatTitle(title)}</h3>
          <p class="recipe-description">${formatDescription(description)}</p>
          <div class="ratio-btn-wrap">
           <div class="rating">
    <div class="rating-value">${rating}</div>
    <div class="rating-body">
      <div class="rating-active" style="width:${(rating * 100) / 5}%">
        <div class="rating-items">
          <input type="radio" class="rating-item" value="1" name="rating" />
          <input type="radio" class="rating-item" value="2" name="rating" />
          <input type="radio" class="rating-item" value="3" name="rating" />
          <input type="radio" class="rating-item" value="4" name="rating" />
          <input type="radio" class="rating-item" value="5" name="rating" />
        </div>
      </div>
    </div>
  </div>
          <button type="button" class="open-recipe-btn" data-id=${_id} data-popup="recepie">See recipe</button>
          </div>
          </div>
          </div>

        </a>
      </li>`;
    })
    .join('');
}

// ===============HELPER FUNCTIONS============== //

function formatDescription(description) {
  let result;
  let maxWidth = 0;
  if (document.documentElement.clientWidth < 768) {
    maxWidth = 98;
  } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
    maxWidth = 60;
  } else {
    maxWidth = 68;
  }

  result = description.length <= maxWidth ? description : description.slice(0, maxWidth) + ' ...';

  return result;
}

function formatTitle(title) {
  let result;
  result = title.length <= 20 ? title : title.slice(0, 20) + ' ...';
  return result;
}

// ==============RENDER FUNCTIONS======================
export async function renderAllRecipes() {
  try {
    const response = await fetchAllRecipes();

    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }

    const allRecipes = response.data;

    recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

async function renderSearchedRecipes(searchedTitle) {
  try {
    const response = await fetchRecipeByTitle(searchedTitle);

    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }

    const allRecipes = response.data;

    recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

async function renderRecipe(category) {
  try {
    const response = await fetchRecipeByCategory(category);
    if (!response.data.totalPages) {
      Notiflix.Notify.failure('Ooops! No recipes found');
      return;
    }
    const pickedRecipes = response.data;
    recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Ooops! No recipes found');
  }
}

// ===================PAGINATION=====================
// function createPaginationList(totalPages, page) {
//   let liTag = '';
//   let beforePages = page - 1;
//   let afterPages = page + 1;
//   let activeLi;

//   if (page > 1) {
//     liTag += `<li class="pag-item" ><span class="last-left"><<</span></li>
//     <li class="pag-item"><span class="prelast-left"><</span></li>`;
//   }

//   for (let pageLength = beforePages; pageLength < afterPages; pageLength += 1) {
//     if (page === pageLength) {
//       activeLi = 'active';
//     } else {
//       activeLi = '';
//     }
//     liTag += `<li class="numb pag-item ${activeLi}"><span>${pageLength}</span></li>`;
//   }

//   if (page < totalPages) {
//     liTag += `<li class="pag-item"><span class="prelast-right">></span></li>
//     <li class="pag-item"><span class="past-right">>></span></li>`;
//   }
//   pagList.innerHTML = liTag;
// }

function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="pag-item prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i> <</span></li>`;
  }
  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb pag-item" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots pag-item"><span>...</span></li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = 'active';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    liTag += `<li class="numb ${active} pag-item" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }
  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots pag-item"><span>...</span></li>`;
    }
  }
  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="pag-item next" onclick="createPagination(totalPages, ${page + 1})"><span> > <i class="fas fa-angle-right"></i></span></li>`;
  }
  pagList.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}

// ================== MAIN ACTIONS ==================
if (recipeList) {
  renderAllRecipes();
}

if (pagList) {
  pagList.innerHTML = createPagination(totalPages, 1);
}
