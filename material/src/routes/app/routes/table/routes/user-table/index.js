import React, { Component } from "react";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";
import * as colorsActions from "../../../../../../actions/Axios/ColorsActions";
import SortingSelecting from "./SortingSelecting";

class UserTable extends Component {
  componentDidMount() {
    this.props.getColors();
  }

  onAddClick = () => {
    console.log("Click status ---> Success");
    const data = {
      code: "456",
      title: "blueLemon"
    };

    //this.props.deleteColor("2ADvs2TiaPsKkaXiygLO");
    this.props.updateColors("2ADvs2TiaPsKkaXiygLO", data);
  };

  componentWillUnmount() {
    this.props.clearColor();
  }

  render() {
    return (
      <div
        id="user-table"
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
                        <SortingSelecting onAddClick={this.onAddClick} />
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
