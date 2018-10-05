import React from "react";
import { connect } from "react-redux";
import APPCONFIG from "constants/appConfig";
import TextField from "@material-ui/core/TextField";
import QueueAnim from "rc-queue-anim";
import DEMO from "constants/demoData";
import ComponentWithHandle from "../../../../../components/class/ComponentWithHandle";
import SweetAlertHelper from "../../../../../class/SweetAlert";
import * as UsersActions from "../../../../../actions/Axios/UsersActions";

class Login extends ComponentWithHandle {
  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      username: "",
      password: "",
      blockLoading: false
    };
  }

  componentDidMount() {
    this.checkPermissionUser();
  }

  handleAlertError = () => {
    this.handleCloseBlockLoading();
    SweetAlertHelper.setOnConfirm(() => null);
    const SweetAlertOptions = SweetAlertHelper.getOptions();
    this.props.swal(SweetAlertOptions.handleError);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const data = { username, password };
    this.props.authentication(
      data,
      this.handleRedirectToApp,
      this.handleAlertError,
      this.SweetAlertOptions.setMessageError
    );
  };

  handleEnterSubmit = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { username, password } = this.state;
      const data = { username, password };
      this.props.authentication(
        data,
        this.handleRedirectToApp,
        this.handleAlertError,
        this.SweetAlertOptions.setMessageError
      );
    }
  };

  render() {
    return (
      <div className="body-inner">
        <this.BlockUi tag="div" blocking={this.state.blockLoading}>
          <div className="card card-white">
            <form
              onKeyPress={this.handleEnterSubmit}
              className="form-horizontal"
            >
              <div className="card-content">
                <section className="logo text-center">
                  <h1>
                    <a href="#/">{this.state.brand}</a>
                  </h1>
                </section>

                <fieldset>
                  <div className="form-group">
                    <TextField
                      label="Username"
                      type="username"
                      onChange={this.handleChange("username")}
                      value={this.state.username}
                      fullWidth
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      label="Password"
                      type="password"
                      className="mt-3"
                      onChange={this.handleChange("password")}
                      value={this.state.password}
                      fullWidth
                    />
                  </div>
                </fieldset>
              </div>
              <div className="card-action border-0 text-right">
                <a
                  href="#/"
                  onClick={this.handleSubmit}
                  className="color-primary"
                >
                  Login
                </a>
              </div>
            </form>
          </div>

          <div className="additional-info">
            <a href={DEMO.signUp}>Sign up</a>
            <span className="divider-h" />
            <a href={DEMO.forgotPassword}>Forgot your password?</a>
          </div>
          <this.SweetAlert />
        </this.BlockUi>
      </div>
    );
  }
}

const Page = props => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <Login {...props} />
        </div>
      </QueueAnim>
    </div>
  </div>
);

const SweetAlertActions = SweetAlertHelper.getActions();

const actions = Object.assign(UsersActions, SweetAlertActions);

export default connect(
  null,
  actions
)(Page);
