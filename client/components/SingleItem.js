import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSelectedItem} from '../store/item';

export class SingleItem extends Component {
  componentDidMount() {
    this.props.getSelectedItem(this.props.match.params.id);
  }
  render() {
    console.log('props at SINGLE ITEM >>>>>>', this.props);
    const {name, description, price, imageUrl, stock, region} = this.props.item;
    return (
      <div id="singleItem">
        <img src={imageUrl} />
        <p>{name}</p>
        <p>{description}</p>
        <p>{region}</p>
        <p>{price}</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item.item
});
const mapDispatchToProps = dispatch => {
  return {
    getSelectedItem: id => dispatch(getSelectedItem(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
