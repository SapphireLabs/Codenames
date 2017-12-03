import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <div>
    <h1>Waiting for players...</h1>
    <h2>Access Code: {props.accessCode}</h2>
  </div>
);

Header.propTypes = {
  accessCode: PropTypes.string.isRequired
};

export default Header;
