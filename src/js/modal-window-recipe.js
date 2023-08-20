import Notiflix from 'notiflix';

import axios from "axios";


const recipeId = "6462a8f74c3d0ddd28897fbc";
const recipeModalWindow = document.querySelector(".backend-info")

async function fetchRecipes(id) {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
    );
  
    return response;
    
  }

  async function renderModalWindow() {
    try {
    const response = await fetchRecipes(recipeId);
    const recipes = await response.json();
    console.log(recipes);
    recipeModalWindow.innerHTML = modalWindowRecipesMarkUp(recipes);
}
catch(err) {Notiflix.Report.failure(err); console.log(err)}
  }

function modalWindowRecipesMarkUp(obj) {
const { title, instructions, youtube, ingredients, rating, tags, time, preview } = obj;
const addHtml = `<h2>${title.toUpperCase()}</h2>
      <div class="video-recipe"><video src=${youtube} autoplay poster=${preview}>
      </video></div>
      <div class="info-panel">
        <div class="tags">
          <ul class="tags-list">
          ${tags.map((tag) => `<li><p>#${tag}</p></li>`).join("")}
          </ul>
        </div>
  <div class="rating">
  ${rating}
  </div>
  <p class="time">
  ${time} min
  </p>
      </div>
      <div class="ingredients">
        <ul class="ingredients-list">
  
        </ul>
      </div>
      <div class="instructions-container">
      <p class="instructions-text">${instructions}</p></div>`
      
      return addHtml;
    
}



renderModalWindow()


// openPopupById('recepie');
// data-popup=''recepie';