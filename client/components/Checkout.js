import React from 'react';
import {connect} from 'react-redux';

// Local Storage
import axios from 'axios';
import {getSelectedItem} from '../store/item';
import {me} from '../store/user';

export class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      guestSubtotal: 0
    };
  }
  async componentDidMount() {
    if (!this.props.user.id) {
      await this.getItemsFromLS();
      await this.updateStock();
    }
  }

  async getItemsFromLS() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let subtotal = 0;
    const newItemList = [];
    // eslint-disable-next-line guard-for-in
    for (let itemId in cart) {
      let {data} = await axios.get(`/api/items/${itemId}`);
      data.quantity = cart[itemId];
      data.total = data.price * data.quantity;
      newItemList.push(data);
      subtotal += data.total;
    }
    this.setState({
      ...this.state,
      itemList: newItemList,
      guestSubtotal: subtotal
    });
  }

  async updateStock() {
    let cart = JSON.parse(localStorage.getItem('cart'));

    for (let itemId in cart) {
      let {data} = await axios.put(`/api/items/${itemId}`, {
        quantity: cart[itemId]
      });
    }
    localStorage.removeItem('cart');
  }

  render() {
    return (
      <div className="checkout">
        <h1>Your order is on the way</h1>
        {this.state.itemList.map(item => {
          return (
            <div key={item.id}>
              <img src={item.imageUrl} />
              <h2>{item.name}</h2>
              <div>Price: {item.price.toFixed(2)}</div>
              <div>Qt: {item.quantity}</div>
              <div>
                Total:
                <i className="dollar sign icon" />
                {item.total.toFixed(2)}
              </div>
            </div>
          );
        })}
        <h2>Total price of cart {this.state.guestSubtotal.toFixed(2)}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    me: () => dispatch(me())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
