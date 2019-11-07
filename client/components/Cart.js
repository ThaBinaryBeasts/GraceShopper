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
        {this.props.cart.id ? (
          <div>
            {this.props.cart.items.map(c => {
              return (
                <div key={c.id}>
                  <img src={c.imageUrl} />
                  <h2>{c.name}</h2>
                  <div>Price: {c.price}</div>
                  <div>Qt: {c.itemOrders.quantity}</div>
                  <div> Total: {c.itemOrders.total}</div>
                </div>
              );
            })}

            <h2>Total price at cart {this.props.cart.total}</h2>
          </div>
        ) : null}
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
