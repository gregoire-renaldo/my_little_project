
import "@babel/polyfill";
import { login, logout } from './login';
import  {updateSettings}  from './updateSettings';
import  {createBoat}  from './create-boat';
import { bookBoat } from './stripe';
// DOM ELEMENTS
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const updateMeForm = document.getElementById('update-me-form');
const updatePasswordForm = document.getElementById('update-password-form');
const bookButton = document.getElementById('book-boat');
const createBoatForm = document.getElementById('form-create-boat');

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
  // create form for axios
  const form = new FormData();
  form.append('firstname', document.getElementById('firstname-update').value )
  form.append('lastname', document.getElementById('lastname-update').value )
  form.append('email', document.getElementById('email-update').value)
  // .files == array
  if (document.getElementById('photo').files[0] != undefined) form.append('photo', document.getElementById('photo').files[0]);

  updateSettings(form, 'data')
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


if (bookButton)
  bookButton.addEventListener('click', e => {
    // boatId = data-tour-id, converted
    e.target.textContent = 'Processing ...'
    const boatId = e.target.dataset.boatId;
    // equivalent
    // const { boatId } = e.target.dataSet.boatId;
    bookBoat(boatId);
  })

if (createBoatForm)
  createBoatForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const maxPeople = document.getElementById('maxPeople').value;
    const photo = document.getElementById('photo').value;
    // const form = new FormData();
    // form.append('name', document.getElementById('name').value)
    // form.append('description', document.getElementById('description').value)
    // form.append('price', document.getElementById('price').value)
    // form.append('maxPeople', document.getElementById('maxPeople').value)
    // form.append('photo', document.getElementById('photo').files[0])
    // console.log(form)
    await createBoat({name, description, price, maxPeople, photo})
  })



// idFields = [ ]
const deleteFields = (idFields) => {
  idFields.forEach(idField => {
    document.getElementById(idField).value = '';
  });

}
