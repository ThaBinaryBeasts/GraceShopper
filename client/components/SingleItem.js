import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSelectedItem} from '../store/item';
import {addToCart} from '../store/order';

export class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: ''
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getSelectedItem(this.props.match.params.id);
  }

  handleAddToCart(event) {
    event.preventDefault();
    this.props.addToCart(
      this.props.match.params.id,
      this.state.quantity,
      this.props.item.price
    );
  }

  handleChange(event) {
    this.setState({[event.target.name]: Number(event.target.value)});
  }

  render() {
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
          <input
            type="number"
            name="quantity"
            onChange={this.handleChange}
            value={this.state.quantity}
          />
        </label>
        <button type="submit" onClick={this.handleAddToCart}>
          Add To Cart
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item.item
});
const mapDispatchToProps = dispatch => {
  return {
    getSelectedItem: id => dispatch(getSelectedItem(id)),
    addToCart: (id, price, quantity) => dispatch(addToCart(id, price, quantity))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
