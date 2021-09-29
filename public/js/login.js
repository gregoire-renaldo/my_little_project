/* eslint-disable */
import axios from 'axios';

export const login = async(email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: "http://localhost:8000/user/login",
      data: {
        email,
        password
      }
    })

    if(res.data.status === 'success') {
      alert('Logged in successfully !')
      // redirect
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500)
    }
    console.log(res)
  } catch (err) {
    alert(err.response.data.message)
  }
};


export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: "http://localhost:3000/user/logout",
    });
    // reload true to force reload (not from the cache, from the server)
    if (res.data.status = 'success') location.reload(true); alert('Logged out successfully !');
  } catch(err) {
    alert('error logging out')
  }
}
