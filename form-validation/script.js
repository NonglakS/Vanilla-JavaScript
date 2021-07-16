const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirm password');

const showError = (elem, message) => {
  const formControl = elem.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

const showSuccess = (elem) => {
  const formControl = elem.parentElement;
  formControl.className = 'form-control success';
};

const checkEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(email.value.trim()).toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid!');
  }
};

const checkPassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
  if (!re.test(password.value)) {
    showError(password, 'At least 1 number, 1 lowercase and 1 uppercase letter, at least 6 characters that are letters, numbers or the underscore');
  }
};

const checkPasswordMatch = (password1, password2) => {
  if (password1.value !== password2.value) {
    showError(password2, 'Invalid password!');
  }
};

const checkRequired = (inputArray) => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  })
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkPassword(password);
  checkPasswordMatch(password, password2);

});