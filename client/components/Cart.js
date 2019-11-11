import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeItem, updateItem, insideCart} from '../store/order';

//local storage
import axios from 'axios';
import item, {getSelectedItem} from '../store/item';
import {me} from '../store/user';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      itemList: [],
      guestSubtotal: 0,
      itemId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async componentDidMount() {
    if (!this.props.user.id) {
      await this.getItemsFromLS();
    } else {
      await this.props.insideCart();
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      quantity: e.target.value
    });
  }

  async deleteItem(itemId, orderId) {
    if (!this.props.user.id) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      delete cart[itemId];
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('inside delete', cart);
      if (!Object.keys(cart).length) {
        this.setState({
          ...this.state,
          itemList: [],
          guestSubtotal: 0
        });
      } else {
        let subtotal = 0;
        let newItemList = [];
        for (let itemID in cart) {
          let {data} = await axios.get(`/api/items/${itemID}`);
          data.quantity = cart[itemID];
          data.total = data.price * data.quantity;
          newItemList.push(data);
          subtotal += data.total;
          this.setState({
            ...this.state,
            itemList: newItemList,
            guestSubtotal: subtotal
          });
        }
      }
    } else {
      this.props.removeItem(itemId, orderId);
    }
  }

  async handleClick(itemId, orderId, quantity, price) {
    await this.props.updateItem(itemId, orderId, quantity, price);
    await this.props.insideCart();
    this.setState({
      itemId: itemId
    });
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
      this.setState({
        ...this.state,
        itemList: newitemList,
        guestSubtotal: subtotal
      });
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
                          <div>Price: {item.price.toFixed(2)}</div>
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
                        </div>
                      );
                    })}

                    <h2 id="totalPrice">Total: USD {this.props.cart.total}</h2>
                  </div>
                ) : null
              ) : null
            ) : null}
          </div>
        ) : localStorage.length ? (
          <div>
            {this.state.itemList.map(item => {
              return (
                <div key={item.id}>
                  {' '}
                  <button
                    onClick={() => this.deleteItem(item.id, this.props.cart.id)}
                  >
                    <img
                      src="https://www.clipartwiki.com/clipimg/detail/12-125328_collection-of-free-transparent-transparent-garbage-bin-cartoon.png"
                      width={30}
                    />
                  </button>
                  <img src={item.imageUrl} />
                  <h2>{item.name}</h2>
                  <div>Price: {item.price.toFixed(2)}</div>
                  <div>Qt: {item.quantity}</div>
                  <div>
                    {' '}
                    Total:<i className="dollar sign icon" />
                    {item.total.toFixed(2)}
                  </div>
                </div>
              );
            })}
            <h2>Total price of cart {this.state.guestSubtotal.toFixed(2)}</h2>
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
    me: () => dispatch(me())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
