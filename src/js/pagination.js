import { page } from './catalog';
import { totalPages } from './catalog';

const pagList = document.querySelector('.pagination-list');
const preLastLeft = document.querySelector('.prelast-left');

if (pagList) {
  pagList.addEventListener('click', handlePagListClick);
}

function handlePagListClick(event) {
  if (!event.target.classList.contains('pag-item') || event.target.classList.contains('unactive')) {
    //return;
  }

  page = Number(event.target.textContent);

  if (!isNaN(page)) {
    pagList.innerHTML = createPagination(totalPages, page);
  }
}

function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page >= 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="pag-item prev unactive" onclick="createPagination(totalPages, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> <<</span></li>
    <li class="pag-item prev unactive" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i> <</span></li>`;
  }
  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb pag-item" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots pag-item"><span>...</span></li>`;
    }
  }
  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }
  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = 'active';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    liTag += `<li class="numb ${active} pag-item" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }
  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots pag-item"><span>...</span></li>`;
    }
  }
  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="pag-item next active" onclick="createPagination(totalPages, ${
      page + 1
    })"><span> > <i class="fas fa-angle-right"></i></span></li>
    <li class="pag-item next active" onclick="createPagination(totalPages, ${page + 1})"><span> >> <i class="fas fa-angle-right"></i></span></li>`;
  }
  pagList.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}

if (pagList) {
  pagList.innerHTML = createPagination(totalPages, 1);
}
