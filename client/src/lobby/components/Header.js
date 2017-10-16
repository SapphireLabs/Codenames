import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div>
    <h1>Waiting for players...</h1>
    <h4>Access Code: {props.accessCode}</h4>
  </div>
);

Header.propTypes = {
  accessCode: PropTypes.string.isRequired,
};

export default Header;
