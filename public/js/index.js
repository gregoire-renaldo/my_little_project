
import "@babel/polyfill";
import { login, logout } from './login'

// DOM ELEMENTS
const loginForm = document.getElementById('login-form')
const logoutButton = document.getElementById('logout-button')

if (loginForm)
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  login(email, password)
});


if(logoutButton) logoutButton.addEventListener('click', e => {logout() })
