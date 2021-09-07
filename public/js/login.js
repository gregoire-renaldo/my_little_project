
/* eslint-disable */

const login = async(email, password) => {
  console.log(email, password)
  try {
    const res = await axios({
      method: 'POST',
      url: "http://localhost:3000/user/login",
      data: {
        email,
        password
      }
    })
    console.log(res);
  } catch (err) {
    console.log(err.response.data)
  }
}


document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  login(email, password)
} )
