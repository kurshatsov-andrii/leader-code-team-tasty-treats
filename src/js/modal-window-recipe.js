import Notiflix from 'notiflix';

import axios from "axios";

import { openPopupById } from '../js/custom-popup';
import { functions } from 'lodash';


const recipeId = "6462a8f74c3d0ddd28897fbc";
const recipeModalWindow = document.querySelector(".backend-info");
const popularRecipeList = document.querySelector('.popular-recipes-js');

const recipeList = document.querySelector('.recipe-list');

popularRecipeList.addEventListener('click', onRecipe);
recipeList.addEventListener('click', onRecipe);


function onRecipe(evt) {
  evt.preventDefault();
  // if (evt.target.nodeName !== 'BUTTON') {
  //   return
  // }
  console.dir(evt.target);
}

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
      <div class="video-recipe">
      <video
  src=${youtube}
  poster=${preview}
  width="467"
  height="250"
  controls
  autoplay
  loop
  preload="auto"
></video>
      </div>
      <div class="info-panel">
        <div class="tags">
          <ul class="tags-list">
          ${tags.map((tag) => `<li><span class="tag-item"><p>#${tag}</p></span></li>`).join("")}
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
        ${ingredients.map(({name, measure} = ingredients) => `<li class="ingredients-item"><div><p>${name}</p></div><div><p>${measure}</p></div></li>`).join("")}
        </ul>
      </div>
      <div class="instructions-container">
      <p class="instructions-text">${instructions}</p></div>
      <button type="button" class="favorite-btn btn">Add to favorite</button>
      `
      
      return addHtml;
      
    
}



renderModalWindow()


// openPopupById('recepie');
// data-popup=''recepie';