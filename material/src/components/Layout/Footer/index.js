import React from 'react';
import APPCONFIG from 'constants/appConfig';
import DEMO from 'constants/demoData';

class Footer extends React.Component {
  render() {
    return (
      <section className="app-footer">
        <div className="container-fluid">
          <span className="float-left">
            <span>Copyright © <a className="brand" target="_blank" href={DEMO.productLink}>{APPCONFIG.brand}</a> {APPCONFIG.year}</span>
          </span>
          <span className="float-right">
            <span>Built with Love <i className="material-icons">favorite_border</i></span>
          </span>
        </div>
      </section>
    );
  }
}

export default Footer;
