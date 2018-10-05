import React, { Component } from "react";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";
import * as groupActions from "../../../../../../actions/Axios/GroupsActions";
import SortingSelecting from "./SortingSelecting";
import ComponentWithHandle from "../../../../../../components/class/ComponentWithHandle";
import model from '../../../../../../class/ServicesAPI';


class GroupTable extends ComponentWithHandle {
  componentDidMount() {
    this.checkPermissionAdmin();
  }

  componentWillUnmount() {
    this.props.clearGroup();
  }

  render() {
    
    return (
      <div
        id="group-table"
        className="container-fluid no-breadcrumb page-dashboard"
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
    colorsStore: state.colorsStore
  };
};

const actions = Object.assign(groupActions);

export default connect(
  mapStateToProps,
  actions
)(GroupTable);
