/* eslint-disable */
import axios from 'axios';

// type is password or data
export const updateSettings = async(data, type) => {
  try {
    const url = type === 'password' ? 'http://localhost:3000/user/updatePassword' : 'http://localhost:3000/user/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      alert(`${type} updated`)
      // redirect
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500)


    }
  } catch (err) {
    alert(err.response.data.message)
  }
};
