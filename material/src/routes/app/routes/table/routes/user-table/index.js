import React, { Component } from "react";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";
import * as usersActions from "../../../../../../actions/Axios/UsersActions";
import SortingSelecting from "./SortingSelecting";
import ComponentWithHandle from "../../../../../../components/class/ComponentWithHandle";
import model from '../../../../../../class/ServicesAPI';

const UserDTO = model.users.getDTO();

class UserTable extends ComponentWithHandle {
  componentDidMount() {
    this.checkPermissionAdmin();
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  render() {
    
    return (
      <div
        id="user"
        className="container-fluid no-breadcrumb page-dashboard kdr-table"
      >
        
          <div className="box box-default">
            <div className="box-body">
              <div className="row">
                <div className="col-xl-12">
                  <div className="box box-transparent">
                    <div className="box-body">
                      <QueueAnim type="bottom" className="ui-animate">
                        <div key="1">
                          <SortingSelecting/>
                        </div>
                      </QueueAnim>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <this.NotifyContainer />
          </div>
    
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersStore: state.usersStore
  };
};

const actions = Object.assign(usersActions);

export default connect(
  mapStateToProps,
  actions
)(UserTable);
