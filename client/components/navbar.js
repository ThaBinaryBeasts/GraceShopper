import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">
            <img
              src="https://s3.envato.com/files/240420392/oiugsaa70wh.jpg"
              width={50}
            />
          </Link>
          <Link to="/catalog">Catalog</Link>
          <h1>Off The Barrel</h1>
          <Link to="/checkout">
            <img
              src="https://pngriver.com/wp-content/uploads/2018/04/Download-Shopping-Cart-Logo-Png-Image-78016-For-Designing-Projects.png"
              width={50}
            />
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/">
            <img
              src="https://s3.envato.com/files/240420392/oiugsaa70wh.jpg"
              width={50}
            />
          </Link>
          <Link to="/catalog">Catalog</Link>
          <h1>Off The Barrel</h1>
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
