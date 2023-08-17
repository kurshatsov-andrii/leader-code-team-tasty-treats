// import { refs } from './refs';
// import { createGallery } from './markup';
// import { showButton, hideButton } from './buttons';
import Notiflix from 'notiflix';
//import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//Initialize the Notify Module with some options
Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});

//Опції SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  disableScroll: true,
});

//Опції Intersection Observer API
let options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};
