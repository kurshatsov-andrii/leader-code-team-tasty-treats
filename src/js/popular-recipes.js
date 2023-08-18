import axios from "axios"

const popularRecipes = document.querySelector('.popular-recipes-js');

// Асинхронна функція для отримання популярних рецептів
async function getFetchPopularRecipes() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

  try {
      const response = await axios.get(BASE_URL);
      return response.data; 
  } catch (error) {
    Notify.failure(error.message);
    throw new Error(error);
  }
}

// Виклик асинхронної функції та вставка розмітки в DOM
async function getPopularRecipes() {
  try {
      const data = await getFetchPopularRecipes();
      const markup = createPopularRecipesMarkup(data);
      popularRecipes.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    Notify.failure(error.message);
  }
}

getPopularRecipes();

// Функція для створення розмітки популярних рецептів
function createPopularRecipesMarkup(recipes) {
    return recipes.map(({ title, description, preview }) => {
        return `
        <ul class="popular-recipes-list list">
            <a class="popular-recipes-link" href="#">
                <li class="popular-recipes-item">
                <img class="popular-recipes-img" src="${preview}" alt="${title}">
                <div class="popular-recipes-wraper">
                    <h3 class="popular-recipes-title">${title}</h3>
                    <p class="popular-recipes-description">${description}</p>
                </div>
            </li>
            </a>
        </ul>`
    }).join("");
}