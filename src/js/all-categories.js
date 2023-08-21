import axios from "axios"
import { Notify } from "notiflix";
import { createAllRecipesMarkUp } from "./catalog"
const active = document.querySelector('.active');
const categoriesAll = document.querySelector('.categories-wrapper');
const btnCategory = document.querySelector(".btn");
const recipeList = document.querySelector('.recipe-list');
const allCategories = document.querySelector('.all-categories');
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
        <button class="btn">${name}</button>
        </li>`
    }).join("");  
}
//-----------------------------------------//


if (categoriesAll) {
  categoriesAll.addEventListener('click', handleCategoriesListClick);
}


function handleCategoriesListClick(event) {
  if (!event.target.classList.contains('btn')) {
    return;
  }
  console.log(event.target.innerText);
  let pickedCategory = event.target.innerText;
  event.target.classList.add("active")
  renderRecipe(pickedCategory);
}

async function fetchRecipeByCategory(category) {
  const response = await axios.get(`${BASE_URL}recipes?category=${category}`);
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
// _____
const handleClick = () => {
  console.log("click event listener callback");
};

addListenerBtn.addEventListener("click", () => {
  btn.addEventListener("click", handleClick);
  console.log("click event listener was added to btn");
});

removeListenerBtn.addEventListener("click", () => {
  btn.removeEventListener("click", handleClick);
  console.log("click event listener was removed from btn");
});
