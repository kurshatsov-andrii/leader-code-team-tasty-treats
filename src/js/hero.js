// --------------------------------------------------
import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const EVENTS_API = 'https://tasty-treats-backend.p.goit.global/api/events';
const heroSlider = document.querySelector('.js-events');

fetchMasterclasses()
  .then(masterclass => {
    renderMasterclasses(masterclass);
    initSlider();
  })
  .catch(error => {
    showError(error.message);
  });

function fetchMasterclasses() {
  return fetch(EVENTS_API).then(response => {
    return response.json();
  });
}

function renderMasterclasses(masterclasses) {
  const sliderMarkup = masterclasses.map(
    ({ cook, topic, _id }) =>
      `
    <div class="swiper-slide" data-id="${_id}">
      <div class="event event--cook">
        <picture>
          <source srcset="${cook.imgWebpUrl}" type="image/webp" />
          <source srcset="${cook.imgUrl}" type="image/jpeg" />
          <img src="${cook.imgUrl}" alt="${cook.name}" width="137" height="442" />
        </picture>
      </div>
      <div class="event event--preview">
        <picture>
          <source srcset="${topic.previewWebpUrl}" type="image/webp" />
          <source srcset="${topic.previewUrl}" type="image/jpeg" />
          <img src="${topic.previewUrl}" alt="${topic.name}" width="304" height="271" />
        </picture>
        <div class="info">
          <strong>${topic.name}</strong>
          <p>${topic.area}</p>
        </div>
      </div>
      <div class="event event--image">
        <picture>
          <source srcset="${topic.imgWebpUrl}" type="image/webp" />
          <source srcset="${topic.imgUrl}" type="image/jpeg" />
          <img src="${topic.imgUrl}" alt="${topic.name}" width="137" height="442" />
        </picture>
      </div>
    </div>
    `
  );
  heroSlider.insertAdjacentHTML('afterbegin', sliderMarkup.join(''));
}

function showError(error) {
  Notify.failure(error);
}

function initSlider() {
  new Swiper('.swiper-hero', {
    loop: false,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.js-hero-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
  });
}
