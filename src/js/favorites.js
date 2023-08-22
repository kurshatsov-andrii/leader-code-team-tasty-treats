// import axios from 'axios';

// export class FechFullRecipe {
//   #BASE_URL = `https://tasty-treats-backend.p.goit.global/api/recipes`;
//   constructor(ID) {
//     this.ID = ID;
//   }

//   async getRecipe() {
//     try {
//       const recipe = await axios.get(`${this.#BASE_URL}/${this.ID}`);
//       return recipe;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// import _ from 'lodash';
// import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { recipeList } from '../js/catalog';

// //const recipeList = document.querySelector('.recipe-list');
// const searchInput = document.querySelector('.search-input');
// const reset = document.querySelector('.reset-wrap');
// const allCategories = document.querySelector('.all-categories');

// const categoriesList = document.querySelector('.categories-wrapper');

// // ==================ЗМІННІ================
// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

// export let page = 1;

// let PER_PAGE = 0;
// if (document.documentElement.clientWidth < 768) {
//   PER_PAGE = 6;
// } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//   PER_PAGE = 8;
// } else {
//   PER_PAGE = 9;
// }

// export let totalPages = 0;
// if (document.documentElement.clientWidth < 768) {
//   totalPages = 48;
// } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//   totalPages = 36;
// } else {
//   totalPages = 32;
// }

// // ================ПРОСЛУХОВУВАЧІ ПОДІЙ=================

// if (searchInput) {
//   searchInput.addEventListener('input', _.debounce(handleSearchInput, 500));
// }

// function handleSearchInput(event) {
//   const searchedTitle = event.target.value.trim();
//   renderSearchedRecipes(searchedTitle);
// }

// if (reset) {
//   reset.addEventListener('click', handleResetClick);
// }

// function handleResetClick() {
//   searchInput.value = '';
//   renderAllRecipes();
// }

// if (allCategories) {
//   allCategories.addEventListener('click', handleAllCategoriesClick);
// }

// function handleAllCategoriesClick() {
//   searchInput.value = '';
//   renderAllRecipes();
// }

// if (categoriesList) {
//   categoriesList.addEventListener('click', handleCategoriesListClick);
// }

// function handleCategoriesListClick(event) {
//   if (!event.target.classList.contains('btn')) {
//     return;
//   }
//   console.log(event.target.innerText);
//   let pickedCategory = event.target.innerText;
//   renderRecipe(pickedCategory);
// }

// // =================ФУНКЦІЇ ДЛЯ ЗАПИТІВ===================
// export async function fetchAllRecipes() {
//   const response = await axios.get(`${BASE_URL}recipes?limit=${PER_PAGE}&page=${page}`);
//   return response;
// }

// async function fetchRecipeByTitle(title) {
//   const response = await axios.get(`${BASE_URL}recipes?title=${title}`);
//   return response;
// }

// async function fetchRecipeByCategory(category) {
//   const response = await axios.get(`${BASE_URL}recipes?category=${category}`);
//   return response;
// }

// // ================= ФУНКЦІЇ ДЛЯ СТВОРЕННЯ РОЗМІТКИ=================
// export function createAllRecipesMarkUp(allRecipesObj) {
//   return allRecipesObj.results
//     .map(({ title, description, preview, rating, _id }) => {
//       return `<li class="recipe-item">
//         <a href="${preview}" class="recipe-link">
//           <img src="${preview}" alt="${title}" class="recipe-image" />
//           <div class="recipe-card-bg-cover">
//             <svg class="icon-heart">
//               <path
//                 d="M15.991 6.848c-2.665-3.117-7.111-3.956-10.449-1.103-3.34 2.854-3.811 7.625-1.187 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.503 0.364 0.057 0.017 0.123 0.027 0.191 0.027s0.134-0.010 0.195-0.029l-0.005 0.001c0.141-0.042 0.262-0.15 0.505-0.364 2.163-1.916 8.764-7.834 10.944-10.64 2.623-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.786-2.016-10.452 1.101z"
//               ></path>
//             </svg>
//             <div class="recipe-card-text-wrap">
//               <h3 class="recipe-title">${formatTitle(title)}</h3>
//               <p class="recipe-description">${formatDescription(description)}</p>
//               <div class="ratio-btn-wrap">
//                 <div class="rating">
//                   <div class="rating-value-white">${rating}</div>
//                   <div class="rating-body">
//                     <div class="rating-active" style="width:${(rating * 100) / 5}%">
//                       <div class="rating-items">
//                         <input type="radio" class="rating-item" value="1" name="rating" />
//                         <input type="radio" class="rating-item" value="2" name="rating" />
//                         <input type="radio" class="rating-item" value="3" name="rating" />
//                         <input type="radio" class="rating-item" value="4" name="rating" />
//                         <input type="radio" class="rating-item" value="5" name="rating" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button type="button" class="open-recipe-btn" data-id=${_id} data-popup="recipe">Дивитися рецепт</button>
//               </div>
//             </div>
//           </div>
//         </a>
//       </li>`;
//     })
//     .join('');
// }

// // ===============ДОПОМІЖНІ ФУНКЦІЇ============== //

// function formatDescription(description) {
//   let result;
//   let maxWidth = 0;
//   if (document.documentElement.clientWidth < 768) {
//     maxWidth = 98;
//   } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280) {
//     maxWidth = 60;
//   } else {
//     maxWidth = 68;
//   }

//   result = description.length <= maxWidth ? description : description.slice(0, maxWidth) + ' ...';

//   return result;
// }

// function formatTitle(title) {
//   let result;
//   result = title.length <= 20 ? title : title.slice(0, 20) + ' ...';
//   return result;
// }

// // ==============ФУНКЦІЇ ДЛЯ ВІДОБРАЖЕННЯ======================
// export async function renderAllRecipes() {
//   try {
//     const response = await fetchAllRecipes();

//     if (!response.data.totalPages) {
//       Notiflix.Notify.failure('Ой! Рецепти не знайдено');
//       return;
//     }

//     const allRecipes = response.data;

//     recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Ой! Рецепти не знайдено');
//   }
// }

// async function renderSearchedRecipes(searchedTitle) {
//   try {
//     const response = await fetchRecipeByTitle(searchedTitle);

//     if (!response.data.totalPages) {
//       Notiflix.Notify.failure('Ой! Рецепти не знайдено');
//       return;
//     }

//     const allRecipes = response.data;

//     recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Ой! Рецепти не знайдено');
//   }
// }

// async function renderRecipe(category) {
//   try {
//     const response = await fetchRecipeByCategory(category);
//     if (!response.data.totalPages) {
//       Notiflix.Notify.failure('Ой! Рецепти не знайдено');
//       return;
//     }
//     const pickedRecipes = response.data;
//     recipeList.innerHTML = createAllRecipesMarkUp(pickedRecipes);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Ой! Рецепти не знайдено');
//   }
// }
//================ Bogdan >>>>>
// if (recipeList) {
//   renderAllRecipes();
// }
const favoritesList = document.querySelector('.favorite-render-cards');
// додаю рецепт до списку улюблених
function addToFavorites(recipeId) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  if (!favoriteRecipes.includes(recipeId)) {
    favoriteRecipes.push(recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    updateFavoriteButtons();
    Notiflix.Notify.success('Рецепт додано до улюблених');
  }
}

// видаляю рецепт зі списку улюблених
function removeFromFavorites(recipeId) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const updatedFavorites = favoriteRecipes.filter(id => id !== recipeId);

  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  updateFavoriteButtons();
  Notiflix.Notify.success('Рецепт видалено з улюблених');
}

// оновлення кнопок додавання до улюблених на всіх рецептах
function updateFavoriteButtons() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const recipeItems = document.querySelectorAll('.recipe-item');

  recipeItems.forEach(item => {
    const recipeId = item.querySelector('.open-recipe-btn').dataset.id;
    const addToFavoriteButton = item.querySelector('.add-to-favorite-btn');

    if (addToFavoriteButton) {
      if (favoriteRecipes.includes(recipeId)) {
        addToFavoriteButton.textContent = 'Видалити з улюблених';
      } else {
        addToFavoriteButton.textContent = 'Додати до улюблених';
      }
    }
  });
}
// створюю розмітку для рецепта
function createRecipeMarkup(allRecipesObj) {
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
                  <div class="rating-value-white">${rating}</div>
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
                <button type="button" class="open-recipe-btn" data-id=${_id} data-popup="recipe">See recipe</button>
              </div>
            </div>
          </div>
        </a>
      </li>`;
    })
    .join('');
}

// document.addEventListener('DOMContentLoaded', () => {

//   // Оновлюю стан кнопок додавання до улюблених
//   updateFavoriteButtons();

//   // Додавання/видалення з улюблених при кліку на кнопку
//   recipeList.addEventListener('click', event => {
//     const target = event.target;
//     const recipeId = target.dataset.id;

//     if (target.classList.contains('add-to-favorite-btn')) {
//       if (target.textContent === 'Додати до улюблених') {
//         addToFavorites(recipeId);
//       } else if (target.textContent === 'Видалити з улюблених') {
//         removeFromFavorites(recipeId);
//       }
//     }
//   });

// });
