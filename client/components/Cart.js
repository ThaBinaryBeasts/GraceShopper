import React, {Component} from 'react';
import {connect} from 'react-redux';
import {insideCart} from '../store/order';
export class Cart extends Component {
  componentDidMount() {
    this.props.insideCart();
  }
  render() {
    console.log(this.props.cart);
    return (
      <div>
        {this.props.cart.id
          ? this.props.cart.items.map(c => {
              return (
                <div key={c.id}>
                  <h1>111111</h1>
                  <p>{c.imageUrl}</p>
                  <p>{c.items}</p>
                  <p>{c.price}</p>
                  <p>{c.quanity}</p>
                  <p>{c.total}</p>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.order.cart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    insideCart: id => dispatch(insideCart(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
