import axios from 'axios';
import _ from 'lodash';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const recipeList = document.querySelector('.recipe-list');
const searchInput = document.querySelector('.search-input');
const pagList = document.querySelector('.pagination-list');
const reset = document.querySelector('.reset-wrap');

// ==================VARIABLES================
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

let PER_PAGE = 0;
if (document.documentElement.clientWidth < 768) {
  PER_PAGE = 6;
} else if (
  document.documentElement.clientWidth >= 768 &&
  document.documentElement.clientWidth < 1280
) {
  PER_PAGE = 8;
} else {
  PER_PAGE = 9;
}

// ================EVENT LISTENERS=================
searchInput.addEventListener('input', _.debounce(handleSearchInput, 500));

function handleSearchInput(event) {
  const searchedTitle = event.target.value.trim();
  renderSearchedRecipes(searchedTitle);
}

reset.addEventListener('click', handleResetClick);

function handleResetClick() {
  searchInput.value = '';
  renderAllRecipes();
}

// =================FETCH FUNCTIONS===================
export async function fetchAllRecipes() {
  const response = await axios.get(`${BASE_URL}recipes?limit=${PER_PAGE}`);
  return response;
}

async function fetchRecipeByTitle(title) {
  const response = await axios.get(`${BASE_URL}recipes?title=${title}`);
  return response;
}

// ================= CREATE MARK-UP FUNCTIONS=================
export function createAllRecipesMarkUp(allRecipesObj) {
  return allRecipesObj.results
    .map(({ title, description, preview, rating }) => {
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
          <h3 class="recipe-title">${title}</h3>
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
          <button type="button" class="open-recipe-btn">See recipe
          </button>
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
  } else if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1280
  ) {
    maxWidth = 60;
  } else {
    maxWidth = 68;
  }

  result =
    description.length <= maxWidth
      ? description
      : description.slice(0, maxWidth) + ' ...';

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

// ================== MAIN ACTIONS ==================
renderAllRecipes();
