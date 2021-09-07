
import "@babel/polyfill";
import { login, logout } from './login';
// import { updateMe } from '/updateMe';

// DOM ELEMENTS
const loginForm = document.getElementById('login-form')
const logoutButton = document.getElementById('logout-button')
// const updateMeForm = document.getElementById('update-me-form')

if (loginForm)
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  login(email, password)
});


if(logoutButton) logoutButton.addEventListener('click', e => {logout() })
