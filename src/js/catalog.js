const recipeList = document.querySelector('.recipe-list');

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

async function fetchAllRecipes() {
  const response = await fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes?limit=${PER_PAGE}`
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

async function renderAllRecipes() {
  const response = await fetchAllRecipes();
  const allRecipes = await response.json();

  recipeList.innerHTML = createAllRecipesMarkUp(allRecipes);
}

renderAllRecipes();

// HELPERS //

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
