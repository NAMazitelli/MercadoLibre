import React from 'react';
import SearchBox from 'containers/SearchBox';
import Logo from '../../images/Logo_ML.png';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <section className="navbar nav">
        <div className="flexbox fullwidth center">
          <div className="column is-10-desktop is-offset-1-desktop nopad">
            <div className="flexbox">
              <img className="nav-brand" src={Logo} alt="MercadoLibre - Logo" />
              <SearchBox />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
