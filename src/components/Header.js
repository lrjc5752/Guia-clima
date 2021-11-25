import React from 'react';
import PropTypes from 'prop-types';  // para documentar los componentes

const  Header = ({titulo}) => {
  return (
        <nav>
            <div className = 'nav-wrapper ligth-blue darken-2'>
                <a href = '#!' className = 'brand-logo'>{titulo}</a>
            </div>
        </nav>
  );
}
Header.propTypes = {
  mensaje: PropTypes.string.isRequired
}
export default Header;