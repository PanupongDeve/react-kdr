import React from 'react';
import APPCONFIG from 'constants/appConfig';
import TextField from '@material-ui/core/TextField';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
  }

  render() {
    return (
      <div className="body-inner">

        <div className="card card-white">
          <div className="card-content">
            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    label="Username"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Email"
                    type="email"
                    className="mt-3"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label="Password"
                    type="password"
                    className="mt-3"
                    fullWidth
                  />
                </div>
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clicking on sign up, you agree to <a href={DEMO.link}><i>terms</i></a> and <a href={DEMO.link}><i>privacy policy</i></a></p>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action border-0 text-right">
            <a href={DEMO.login} className="color-gray-light">Login</a>
            <a href='#/' className="color-primary">Sign Up</a>
          </div>
        </div>

      </div>
    );
  }
}

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <SignUp />
        </div>
      </QueueAnim>
    </div>
  </div>
);

export default Page;
