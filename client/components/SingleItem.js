import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSelectedItem} from '../store/item';
import {addToCart} from '../store/order';
import {me} from '../store/user';

export class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getSelectedItem(this.props.match.params.id);
  }

  handleAddToCart(event) {
    event.preventDefault();
    if (!this.props.user.id) {
      let valObj = JSON.parse(localStorage.getItem('cart')) || {};
      valObj[this.props.item.id] = this.state.quantity;
      localStorage.setItem('cart', JSON.stringify(valObj));
    } else {
      this.props.addToCart(
        this.props.match.params.id,
        this.state.quantity,
        this.props.item.price
      );
    }
  }

  handleChange(event) {
    this.setState({quantity: Number(event.target.value)});
  }

  render() {
    console.log('props at SINGLE ITEM >>>>>>', this.props);
    console.log('current STATE >>>>>>', this.state);
    const {name, description, price, imageUrl, stock, region} = this.props.item;
    return (
      <div id="singleItem">
        <img src={imageUrl} />
        <p>{name}</p>
        <p>{description}</p>
        <p>{region}</p>
        <p>{price}</p>
        <label>
          Quantity
          <select value={this.state.quantity} onChange={this.handleChange}>
            <option value={0}>Qty 0</option>
            <option value={1}>Qty 1</option>
            <option value={2}>Qty 2</option>
            <option value={3}>Qty 3</option>
            <option value={4}>Qty 4</option>
          </select>
        </label>
        <button type="submit" onClick={this.handleAddToCart}>
          Add To Cart
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item.item,
  user: state.user
});
const mapDispatchToProps = dispatch => {
  return {
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    addToCart: (id, price, quantity) =>
      dispatch(addToCart(id, price, quantity)),
    me: () => dispatch(me())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
