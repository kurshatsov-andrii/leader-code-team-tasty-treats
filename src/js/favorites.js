import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';
localStorage.favorites = '';

const favoriteRecepies = [];
//let favoriteRecipesData = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
window.addEventListener('click', onFavBtnClick);

function onFavBtnClick(evt) {
    if (evt.target.classList.contains("icon-heart") || evt.target.classList.contains("favorite-btn")) {
        console.log('hi');
        localStorage.setItem("feedback-form-state", JSON.stringify(favoriteRecepies));
    }
}

initFavoriteSlider();

function initFavoriteSlider() {
    new Swiper('.swiper-favorite-navigation', {
    speed: 1000,
    slidesPerView: "auto",
    spaceBetween: 12,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
    },
  });
}

