import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyOrders} from '../store/order';
import Item from './Item';

export class MyOrders extends Component {
  componentDidMount() {
    this.props.getMyOrders();
  }
  render() {
    return (
      <div>
        {this.props.order.map(order => {
          return (
            <div key={order.id}>
              <p>Order Status: {order.status}</p>
              <p>Order Total $: {order.total / 100}</p>
              {order.items ? (
                <div className="allItems">
                  {order.items.map(item => {
                    return <Item key={item.id} item={item} />;
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order: state.order.myOrders
});
const mapDispatchToProps = dispatch => ({
  getMyOrders: () => dispatch(getMyOrders())
});
export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
