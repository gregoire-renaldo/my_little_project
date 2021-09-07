
/* eslint-disable */

const login = async(email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: "http://localhost:3000/user/login",
      data: {
        email,
        password
      }
    })

    if(res.data.status === 'Success') {
      alert('Logged in successfully !')
      // redirect
      window.setTimeout(() => {
        location.assign('/');
      }, 1500)
    }
    console.log(res)
  } catch (err) {
    alert(err.response.data.message)
  }
};


document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email-login').value;
  const password = document.getElementById('password-login').value;
  login(email, password)
} )
