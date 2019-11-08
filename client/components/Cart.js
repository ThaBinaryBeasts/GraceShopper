import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {insideCart} from '../store/order';
import {getSelectedItem} from '../store/item';
import {me} from '../store/user';
export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      itemList: [],
      guestSubtotal: 0
    };
  }
  async componentDidMount() {
    if (!this.props.user.id) {
      await this.getItemsFromLS();
    } else {
      await this.props.insideCart();
      await this.props.getSelectedItem();
    }
  }

  async getItemsFromLS() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let subtotal = 0;

    // eslint-disable-next-line guard-for-in
    for (let itemId in cart) {
      let {data} = await axios.get(`/api/items/${itemId}`);
      data.quantity = cart[itemId];
      data.total = data.price * data.quantity;
      const newitemList = [...this.state.itemList, data];
      subtotal += data.total;
      this.setState({itemList: newitemList});
    }
    this.setState({...this.state, guestSubtotal: subtotal});
  }

  render() {
    return (
      <div>
        {this.props.user.id ? (
          this.props.cart.id ? (
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
          ) : (
            <p>nothing is in your logged in cart</p>
          )
        ) : localStorage.length ? (
          <div>
            {this.state.itemList.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.imageUrl} />
                  <h2>{item.name}</h2>
                  <div>Price: {item.price}</div>
                  <div>Qt: {item.quantity}</div>
                  <div> Total: {item.total}</div>
                </div>
              );
            })}
            <h2>Total price at cart {this.state.guestSubtotal}</h2>
          </div>
        ) : (
          <p>nothing is in your local storage cart!</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.order.cart,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    insideCart: id => dispatch(insideCart(id)),
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    me: () => dispatch(me())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
