const openPopupButtons = document.querySelectorAll('[data-popup]');
const allCustomPopups = document.querySelectorAll('.custom-popup');
export const body = document.querySelector('body');

openPopupButtons.forEach(openBtn => {
  openBtn.addEventListener('click', popupOpen);
});

allCustomPopups.forEach(popup => {
  popup.addEventListener('click', popupClose);
});

export function popupOpen(e) {
  e.preventDefault();
  const popupId = this.dataset.popup;
  openPopupById(popupId);
}

export function popupClose(e) {
  if (e.target.classList.contains('js-popup-close') || e.target.classList.contains('custom-popup')) {
    closeOllPopups();
    setTimeout(() => {
      scrollbarReset();
    }, 400);
  }
}

export function openPopupById(id) {
  closeOllPopups();
  if (!body.classList.contains('locked')) {
    scrollbarModify();
    body.classList.add('locked');
  }
  document.getElementById(id).classList.add('is-open');
}

export function closeOllPopups() {
  allCustomPopups.forEach(popup => {
    popup.classList.remove('is-open');
  });
}

export function scrollbarModify() {
  const scrollbarWidth = window.innerWidth - document.querySelector('main').offsetWidth;
  body.style.paddingRight = scrollbarWidth + 'px';
}

export function scrollbarReset() {
  body.style.paddingRight = '0px';
  body.classList.remove('locked');
}

export function alertError(title, subtitle) {
  const errorTitle = document.querySelector('.js-error-title');
  const errorSubtitle = document.querySelector('.js-error-text');
  errorTitle.innerHTML = title;
  errorSubtitle.innerHTML = subtitle;
  openPopupById('error');
}
