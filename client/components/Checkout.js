import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {checkOut} from '../store/order';

export function Checkout(props) {
  const cartTotal = props.cart.total;

  function handleToken(token) {
    if (token.id) {
      props.checkOut(token, cartTotal);
    }
  }

  return (
    <div>
      <div>
        <h1>Case of Whiskey for my boys:</h1>
        <h3>Total Price · ${cartTotal}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_QKVl0gcbzP4rkY2ona3fa7Up00It2MIOSj"
        token={handleToken}
        amount={cartTotal}
        billingAddress
        shippingAddress
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.order.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkOut: (token, cartTotal) => dispatch(checkOut(token, cartTotal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
