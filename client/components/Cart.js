import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeItem, updateItem, insideCart} from '../store/order';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.insideCart();
  }

  handleChange(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  // this.props.updateItem(item.id, this.props.cart.id, event.tatget.value, item.price)

  render() {
    console.log('State in Update', this.state.quantity);

    return (
      <div>
        {this.props.cart.id ? (
          this.props.cart.items.length > 0 ? (
            this.props.cart.items[this.props.cart.items.length - 1]
              .itemOrders ? (
              <div>
                {this.props.cart.items.map(item => {
                  return (
                    <div className="itemInCart" key={item.id}>
                      <img src={item.imageUrl} />
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
                          this.props.updateItem(
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
                      >
                        XXX
                      </h1>
                    </div>
                  );
                })}

                <h2>Total price at cart {this.props.cart.total}</h2>
              </div>
            ) : null
          ) : null
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
    insideCart: () => dispatch(insideCart()),
    removeItem: (itemId, orderId) => dispatch(removeItem(itemId, orderId)),
    updateItem: (itemId, orderId, quantity, price) =>
      dispatch(updateItem(itemId, orderId, quantity, price))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
