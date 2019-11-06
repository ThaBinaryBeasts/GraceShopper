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
        <div>
          {/* The navbar will show these links after you log in */}
          <p>
            <Link to="/">
              <img
                src="https://cdn5.vectorstock.com/i/1000x1000/60/34/whiskey-barrel-premium-quality-wheat-wreath-flat-vector-13806034.jpg"
                width={50}
              />
            </Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/checkout">
              <img
                src="https://pngriver.com/wp-content/uploads/2018/04/Download-Shopping-Cart-Logo-Png-Image-78016-For-Designing-Projects.png"
                width={50}
              />
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </p>
        </div>
      ) : (
        <div id="navBar">
          {/* The navbar will show these links before you log in */}
          <Link to="/">
            <img
              src="https://cdn5.vectorstock.com/i/1000x1000/60/34/whiskey-barrel-premium-quality-wheat-wreath-flat-vector-13806034.jpg"
              width={50}
            />
          </Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/checkout">
            <img
              src="https://pngriver.com/wp-content/uploads/2018/04/Download-Shopping-Cart-Logo-Png-Image-78016-For-Designing-Projects.png"
              width={50}
            />
          </Link>
        </div>
      )}
    </nav>
    <hr />
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
