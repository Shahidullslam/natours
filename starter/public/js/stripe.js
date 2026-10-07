import axios from 'axios';

const stripeKey = 'pk_test_51SEOj6CCDiZJWueANPtdWP05DDsvWcEkXuZDqTJDtPSWPnvDqh7BQRjkCzKyiDPNbIxkdCV6JpLhpmxCX41sifLd00mw4ENv0i';

export const bookTour = async (tourId) => {
  if (typeof window === 'undefined' || !window.Stripe) {
    console.warn('Stripe is not loaded yet.');
    return;
  }

  const stripe = window.Stripe(stripeKey);

  try {
    const sessionResponse = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    const result = await stripe.redirectToCheckout({
      sessionId: sessionResponse.data.session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (err) {
    console.error('Checkout session error:', err.response ? err.response.data : err.message);
  }
};