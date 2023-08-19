import { openPopupById } from '../js/custom-popup';
import { alertError } from '../js/custom-popup';

const orderForm = document.querySelector('.order-form');
const inputs = document.querySelectorAll('.custom-input');
const addErrorText = true;

if (orderForm) {
  orderForm.addEventListener('submit', orderSend);
}

async function orderSend(e) {
  e.preventDefault();
  const answer = formValidation(this);
  if (answer != false) {
    openPopupById('loading');
    setTimeout(() => {
      alertError('Order not sendet. Javascript in process! :))');
    }, 3000);
  }
}

inputs.forEach(input => {
  input.addEventListener('focus', clearInput);
});

function clearInput() {
  const label = this.closest('.label');
  const labelError = label.querySelector('.label__error');
  if (labelError) {
    labelError.classList.remove('active');
    setTimeout(() => {
      labelError.remove();
    }, 250);
  }
  this.classList.remove('red');
}

//FORM VALIDATION
function formValidation(formId) {
  let checker = true;
  formId.querySelectorAll('[required]').forEach(required => {
    const requiredLabel = required.closest('.label');
    if (required.value.length === 0) {
      addErrorMarkup(requiredLabel, 'The field is empty!');
    } else {
      //Name
      if (
        required.name == 'name' &&
        /[^A-zА-яЁё\+ ()\-]/.test(required.value)
      ) {
        addErrorMarkup(requiredLabel, 'Name cannot contain digits!');
      }
      //type tel
      if (required.type == 'tel' && /[^0-9\+ ()\-]/.test(required.value)) {
        addErrorMarkup(requiredLabel, 'Wrong phone format!');
      }
      //email
      if (
        required.type == 'email' &&
        !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(
          required.value
        )
      ) {
        addErrorMarkup(requiredLabel, 'Wrong E-mail format!');
      }
    }

    //ERROR TEXT CREATE
    function addErrorMarkup(correntLabel, text) {
      if (addErrorText === true) {
        const errors = correntLabel.querySelectorAll('.label__error').length;
        if (errors < 1) {
          correntLabel.insertAdjacentHTML(
            'beforeend',
            '<div class="label__error">' + text + '</div>'
          );
          setTimeout(function () {
            correntLabel.querySelector('.label__error').classList.add('active');
          }, 5);
        }
      }
      checkerFalse();
    }

    //ADD "RED" CLASS TO INPUTS
    function checkerFalse() {
      required.classList.add('red');
      checker = false;
    }
  });
  return checker;
}
