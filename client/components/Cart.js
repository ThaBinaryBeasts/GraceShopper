import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeItem, updateItem, insideCart, checkOut} from '../store/order';
import {Link} from 'react-router-dom';

//local storage
import axios from 'axios';
import {getSelectedItem} from '../store/item';
import {me} from '../store/user';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      itemList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentDidMount() {
    if (!this.props.user.id) {
      await this.getItemsFromLS();
    }
    await this.props.insideCart();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      quantity: e.target.value
    });
  }

  deleteItem(itemId, orderId) {
    this.props.removeItem(itemId, orderId);
  }

  async handleClick(itemId, orderId, quantity, price) {
    await this.props.updateItem(itemId, orderId, quantity, price);
    await this.props.insideCart();
  }

  async getItemsFromLS() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let itemId in cart) {
      let {data} = await axios.get(`/api/items/${itemId}`);
      data.quantity = cart[itemId];
      data.total = data.price * data.quantity;
      const newitemList = [...this.state.itemList, data];
      this.setState({itemList: newitemList});
    }
  }

  render() {
    return (
      <div>
        {this.props.user.id ? (
          <div>
            {this.props.cart.id ? (
              this.props.cart.items.length > 0 ? (
                this.props.cart.items[this.props.cart.items.length - 1]
                  .itemOrders ? (
                  <div>
                    {this.props.cart.items.map(item => {
                      return (
                        <div className="itemInCart" key={item.id}>
                          <button
                            onClick={() =>
                              this.deleteItem(item.id, this.props.cart.id)
                            }
                          >
                            <img
                              src="https://www.clipartwiki.com/clipimg/detail/12-125328_collection-of-free-transparent-transparent-garbage-bin-cartoon.png"
                              width={30}
                            />
                          </button>

                          <p>
                            <img src={item.imageUrl} width={150} />
                          </p>
                          <h2>{item.name}</h2>
                          <div>Price: {item.price}</div>
                          <div>Qt: {item.itemOrders.quantity}</div>
                          <label>
                            Quantity
                            <select
                              value={this.state.quantity}
                              onChange={e => this.handleChange(e)}
                            >
                              <option value={1}>Qty 1</option>
                              <option value={2}>Qty 2</option>
                              <option value={3}>Qty 3</option>
                              <option value={4}>Qty 4</option>
                            </select>
                          </label>
                          <button
                            type="submit"
                            onClick={() =>
                              this.handleClick(
                                item.id,
                                this.props.cart.id,
                                this.state.quantity,
                                item.price
                              )
                            }
                          >
                            Update
                          </button>

                          <div> Total: {item.itemOrders.total}</div>
                          <h1
                            onClick={() =>
                              this.props.removeItem(item.id, this.props.cart.id)
                            }
                          />
                        </div>
                      );
                    })}

                    <h2 id="totalPrice">Total: USD {this.props.cart.total}</h2>
                  </div>
                ) : null
              ) : null
            ) : null}
            <Link to="/cart/checkout">
              <button
                className="checkOut"
                type="submit"
                onClick={this.props.checkOut}
              >
                Checkout
              </button>
            </Link>
          </div>
        ) : localStorage.length ? (
          <div>
            {this.state.itemList.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.imageUrl} />
                  <h2>{item.name}</h2>
                  <div>Price: {item.price}</div>
                  <div>Qt: {item.quantity}</div>
                  <div>
                    {' '}
                    Total:<i className="dollar sign icon" />
                    {item.total}
                  </div>
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
    insideCart: () => dispatch(insideCart()),
    removeItem: (itemId, orderId) => dispatch(removeItem(itemId, orderId)),
    updateItem: (itemId, orderId, quantity, price) =>
      dispatch(updateItem(itemId, orderId, quantity, price)),
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    me: () => dispatch(me()),
    checkOut: () => dispatch(checkOut())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
