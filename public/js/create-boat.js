export const createBoat = async (name, description, price) => {
  try {
    const res = await axios({
      method: 'POST',
      url: "http://localhost:3000/boat/owner/createBoat",
      data: {
        name,
        description,
        price
      }
    })

    if (res.data.status === 'success') {
      alert('boat created successfully !')
      // redirect
      window.setTimeout(() => {
        location.assign('/boat-owner-account');
      }, 1500)
    }
    console.log(res)
  } catch (err) {
    alert(err.response.data.message)
  }
};
