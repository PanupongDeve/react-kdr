import React, { Component } from "react";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";
import * as colorsActions from "../../../../../../actions/Axios/ColorsActions";
import SortingSelecting from "./SortingSelecting";

import model from '../../../../../../class/ServicesAPI';

const ColorDTO = model.colors.getDTO();

class UserTable extends Component {
  componentDidMount() {
    
  }

  componentWillUnmount() {
    this.props.clearColor();
  }

  render() {
    
    return (
      <div
        id="color-table"
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

const actions = Object.assign(colorsActions);

export default connect(
  mapStateToProps,
  actions
)(UserTable);
