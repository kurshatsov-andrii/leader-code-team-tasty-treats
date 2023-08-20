const body = document.querySelector('body');
const switcher = document.getElementById('switch');

switcherOnLoad();

if (switcher) {
  switcher.addEventListener('change', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      localStorage.theme = 'light';
      uncheck();
      return;
    }
    body.classList.add('dark-theme');
    localStorage.theme = 'dark';
    check();
  });
}

function switcherOnLoad() {
  if (localStorage.theme !== undefined && localStorage.theme !== 'light') {
    body.classList.add('dark-theme');
  }
  if (switcher) {
    if (localStorage.theme === 'light') {
      uncheck();
      return;
    }
    check();
  }
}

function check() {
  switcher.checked = true;
}

function uncheck() {
  switcher.checked = false;
}
