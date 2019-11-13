import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="plate">
      <p className="script">
        <span>Off</span>
      </p>
      <p className="shadow text1">The</p>
      <p className="shadow text2">Barrel</p>
      <p className="script">
        <span>by Binary Beast</span>
      </p>
    </div>
    <nav>
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}
          <Link to="/">
            <img
              src="https://www.uncommongoods.com/images/items/23900/23960_1_640px.jpg"
              width={50}
            />
          </Link>
          <Link to="/catalog" id="catalog">
            Catalog
          </Link>
          <Link to="/user/me" id="userPage">
            My Profile
          </Link>
          <Link to="/cart">
            <img
              src="http://iconsetc.com/icons-watermarks/flat-rounded-square-white-on-black/bfa/bfa_shopping-cart/bfa_shopping-cart_flat-rounded-square-white-on-black_512x512.png"
              width={50}
            />
          </Link>
          <Link to="/">
            <p onClick={handleClick}>Logout</p>
          </Link>
        </div>
      ) : (
        <div id="navBarGuest">
          {/* The navbar will show these links before you log in */}
          <Link to="/">
            <img
              src="https://www.uncommongoods.com/images/items/23900/23960_1_640px.jpg"
              width={50}
            />
          </Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">
            <img
              src="https://pngriver.com/wp-content/uploads/2018/04/Download-Shopping-Cart-Logo-Png-Image-78016-For-Designing-Projects.png"
              width={50}
            />
          </Link>
        </div>
      )}
      <div id="centerNav">
        <img
          src="https://thewhiskyclub.com.au/wp-content/themes/MeetGavernWP/images/ornament_down.png"
          alt="The Whisky Club down ornament black"
          border="0"
        />
      </div>
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
