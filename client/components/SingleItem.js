import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSelectedItem} from '../store/item';
import {addToCart} from '../store/order';

//local storage
import {me} from '../store/user';

export class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      toggleOn: false
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
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

  handleDescription() {
    this.setState({
      toggleOn: !this.state.toggleOn
    });
  }

  render() {
    const {name, description, price, imageUrl, stock, region} = this.props.item;
    return (
      <div id="singleItem">
        <p>{name}</p>
        <img src={imageUrl} width={200} />
        <p>
          <button type="submit" onClick={this.handleDescription}>
            Description
          </button>
          {this.state.toggleOn ? <p>{description}</p> : null}
        </p>
        <p>Country Of Origin: {region}</p>
        <p>
          Price: ${price}
          <label id="quanColor">
            Quantity
            <select value={this.state.quantity} onChange={this.handleChange}>
              <option value={0}>Choose quantity</option>
              <option value={1}>Qty 1</option>
              <option value={2}>Qty 2</option>
              <option value={3}>Qty 3</option>
              <option value={4}>Qty 4</option>
            </select>
          </label>
        </p>
        <button type="submit" onClick={this.handleAddToCart}>
          <img
            src="https://t4.ftcdn.net/jpg/00/26/12/45/240_F_26124567_sPp9oby9DAjrDlnqZ6iSEriV4DJbWMZF.jpg"
            width={100}
          />
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
