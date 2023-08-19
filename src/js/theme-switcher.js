const body = document.querySelector('body');
const switcher = document.querySelector('[data-switcher]');
if (localStorage.theme !== undefined && localStorage.theme !== 'light') {
  body.classList.add('dark-theme');
}

switcher.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    localStorage.theme = 'light';
    return;
  }
  body.classList.add('dark-theme');
  localStorage.theme = 'dark';
});
