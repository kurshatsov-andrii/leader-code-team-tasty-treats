import axios from "axios"
import { Notify } from "notiflix";
import { createAllRecipesMarkUp } from "./catalog"
import { PER_PAGE } from './pagination';


const categoryContainer = document.querySelector('all-categories-js');
const categoriesAll = document.querySelector('.categories-wrapper');
const btnCategory = document.querySelector(".btn-all");
const recipeList = document.querySelector('.recipe-list');
const allCategories = document.querySelector('.all-categories');
const blokCategory = document.querySelector('.categories-container');
const itemCat = document.querySelector('.categories-item');


//------
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

//------
async function getFetchCategories() {
  try {
      const response = await axios.get(`${BASE_URL}categories`);
      return response.data;
  } catch (error) {
   Notiflix.Notify.failure('Ooops! No categories found');
  }
}
//-----
async function getCategoriesAll() {
  try {
      const data = await getFetchCategories();
      const categoriesList = createAllCategoriesMarkup(data);
      categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
  } catch (error) {
    Notiflix.Notify.failure('Ooops! No categories found');
  }
}
if (categoriesAll) {
  getCategoriesAll();
}
//------
function createAllCategoriesMarkup(categories) {
    return categories.map(({ _id, name }) => {
        return `
        <li class="categories-item" data-id=${_id}>
        <button class="btn-all">${name}</button>
        </li>`
    }).join("");  
}
//-----------------------------------------//


if (categoriesAll) {
  categoriesAll.addEventListener('click', handleCategoriesListClick);
}

function handleCategoriesListClick(event) {
  if (!event.target.classList.contains('btn-all')) {
    return;
  }
  console.log(event.target.innerText);
  let pickedCategory = event.target.innerText;
  renderRecipe(pickedCategory);
}

async function fetchRecipeByCategory(category) {
const response = await axios.get(`${BASE_URL}recipes?category=${category}&limit=${PER_PAGE}`);
  return response;
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
// //////////////////////////////////////////////////////


// const categoryContainer = document.querySelector('all-categories-js');
// const categoriesAll = document.querySelector('.categories-wrapper');
// const btnCategory = document.querySelector(".btn-all");
// const allCategories = document.querySelector('.all-categories');
// const blokCategory = document.querySelector('.categories-container');
// const itemCat = document.querySelector('.categories-item');

// allCategories.addEventListener('click', handleBtnClick);
// console.log(btnCategory)
// categoriesAll.addEventListener('click', handleBtnClick);
// let clicked = null;

// function handleBtnClick(event) {
//   console.log("click")
//   const Btn = event.target;
//   clicked = Btn;
//   Btn.classList.add('active');

//   if (Btn.nodeName !== 'BUTTON') {
//     return;
//   }

//   if (Btn) {
//     Btn.classList.remove('active');
//   }
    
//   if (Btn === allCategories) {
//     removeActiveCategoryBtn();
//   }
//   else {
//   allCategories.classList.remove('active');
//   }
// }

// function removeActiveCategoryBtn() {
//   const buttons = categoriesAll.querySelectorAll('.btn-all')
//   buttons.forEach(button => {
//    button.classList.remove('active')
//   })
   
// }
//  categoriesAll.addEventListener('click', event => {
//   if (!event.target.classList.contains('btn-all')) {
//     event.stopPropagation();
//   }
// });




// categoriesAll.addEventListener('click', handleBtnClick);
// allCategories.addEventListener('click', handleBtnClick);
// function handleBtnClick(event) {
//   console.log("event.target")
// }
// const buttons = btnCategory.querySelectorAll('.btn')
// buttons.forEach(button => {
//   button.addEventListener('click', handleBtnClick)
// })
// const handleBtnClick = (event) => {
//    console.log("click")
// }