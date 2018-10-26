import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Header from 'components/Layout/Header';
import Sidenav from 'components/Layout/Sidenav';
import Footer from 'components/Layout/Footer';
import Customizer from 'components/Customizer';
import LoadingComponent from 'components/Loading';

let Table = loadable({
  loader: () => import('routes/app/routes/table/'),
  loading: LoadingComponent
})



class MainApp extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className="main-app-container">
        <Sidenav {...this.props} />

        <section id="page-container" className="app-page-container">
          <Header  {...this.props} />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="h-100">
                {/* <Route path={`${match.url}/dashboard`} component={Dashboard} />
                <Route path={`${match.url}/chart`} component={Chart} />
                <Route path={`${match.url}/ecommerce`} component={ECommerce} />
                <Route path={`${match.url}/form`} component={Form} />
                <Route path={`${match.url}/page`} component={Page} />
                <Route path={`${match.url}/pglayout`} component={PageLayout} /> */}
                <Route path={`${match.url}/table`} component={Table} />
                {/* <Route path={`${match.url}/ui`} component={UI} /> */}
                {/* <Route path={`${match.url}/exception`} component={Exception} /> */}
              </div>
            </div>

            <Footer />
          </div>
        </section>

        <Customizer />
      </div>
    );
  }
}

export default MainApp;
