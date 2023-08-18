const recipeList = document.querySelector('.recipe-list');

async function fetchAllRecipes() {
  const response = await fetch(
    'https://tasty-treats-backend.p.goit.global/api/recipes?limit=9'
  );

  return response;
}

function createAllRecipesMarkUp(allRecipesObj) {
  return allRecipesObj.results
    .map(({ title, description, preview, rating }) => {
      return `<li class="recipe-item">
        <a href="${preview}" class="recipe-link">
          <img src="${preview}" alt="${title}" class="recipe-image" />
          <div class="recipe-card-bg-cover">
          <svg class="icon-heart" width="22" height="22">
    <use href="./images/icons.svg#icon-heart"></use>
  </svg>
          <div class="recipe-card-text-wrap">
                      
          <h3 class="recipe-title">${title}</h3>

          <p class="recipe-description">${formatDescription(description)}</p>
          <div class="ratio-btn-wrap">
          <span class="recipe-rating">${rating}</span>
          <button type="button" class="open-recipe-btn">See recipe</button>
          </div>
          </div>
          </div>

        </a>
      </li>`;
    })
    .join('');
}

async function renderAllRecipes() {
  const response = await fetchAllRecipes();
  const allRecipes = await response.json();

  recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
}

renderAllRecipes();

// HELPERS //

function formatDescription(description) {
  let result;

  result =
    description.length <= 95 ? description : description.slice(0, 95) + ' ...';

  return result;
}
