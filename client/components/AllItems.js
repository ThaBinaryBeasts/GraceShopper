import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllItems} from '../store/item';
import Item from './Item';

export class AllItems extends Component {
  componentDidMount() {
    this.props.getAllItems();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.items[0] ? (
          <div>
            {this.props.items.map(item => {
              return <Item key={item.id} item={item} />;
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.item.items
});

const mapDispatchToProps = dispatch => ({
  getAllItems: () => dispatch(getAllItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
