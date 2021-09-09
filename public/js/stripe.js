/* eslint-disable */
import axios from 'axios';

const stripe = Stripe('pk_test_51JXnQNC3UW2q90bhKOSUj6q9dywO3AQq7BoY1fD14Ls3LlUpl3EEKinDf0YbcHh7fsW6Go6663cIVhJzcdq1wet900gtKbT3U3');

export const bookBoat = async boatId => {
  try {
    // get checkout session
    const session = await axios(`http://localhost:3000/bookings/checkout-session/${boatId}`)
    console.log(session);

  // 2 create checkout form
  await stripe.redirectToCheckout({
    sessionId: session.data.session.id
  })
  } catch (err) {

  }

}
