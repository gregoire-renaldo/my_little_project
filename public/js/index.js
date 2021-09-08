
import "@babel/polyfill";
import { login, logout } from './login';
import  {updateSettings}  from './updateSettings';

// DOM ELEMENTS
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const updateMeForm = document.getElementById('update-me-form');
const updatePasswordForm = document.getElementById('update-password-form');

if (loginForm)
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  login(email, password)
});


if(logoutButton) logoutButton.addEventListener('click', e => {logout() })

if (updateMeForm)
updateMeForm.addEventListener('submit', e => {
  e.preventDefault();
  const firstname = document.getElementById('firstname-update').value;
  const lastname = document.getElementById('lastname-update').value;
  const email = document.getElementById('email-update').value;
  updateSettings({firstname, lastname,email}, 'data')
})

if (updatePasswordForm)
updatePasswordForm.addEventListener('submit', async e => {
  e.preventDefault();
  const passwordCurrent = document.getElementById('current-password').value;
  const password = document.getElementById('new-password').value;
  const passwordConfirm = document.getElementById('confirm-new-password').value;
  // update password is asynchronous
  // clear the fieldsafter update : async await till it's finished
  await updateSettings({ passwordCurrent, password, passwordConfirm}, 'password');

})

// idFields = [ ]
const deleteFields = (idFields) => {
  idFields.forEach(idField => {
    document.getElementById(idField).value = '';
  });

}
