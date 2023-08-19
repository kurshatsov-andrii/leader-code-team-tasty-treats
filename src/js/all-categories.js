import axios from "axios"
import { Notify } from "notiflix";
// import { createAllRecipesMarkUp, fetchAllRecipes } from "./catalog.js"
const categoriesAll = document.querySelector('.categories-wrapper');
async function getFetchCategories() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';
  try {
      const response = await axios.get(BASE_URL);
      return response.data;
  } catch (error) {
    Notify.failure(error.message);
    throw new Error(error);
  }
}

async function getCategoriesAll() {
  try {
      const data = await getFetchCategories();
      const categoriesList = createAllCategoriesMarkup(data);
      categoriesAll.insertAdjacentHTML('beforeend', categoriesList);
  } catch (error) {
    Notify.failure(error.message);
  }
}
getCategoriesAll();

function createAllCategoriesMarkup(categories) {
    return categories.map(({ id, name }) => {
        return `
        <li class="categories-item" data-id=${id}>
        <button class="btn">${name}</button>
        </li>`
    }).join("");
    
}