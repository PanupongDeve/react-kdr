import React, { Component } from "react";
import { connect } from "react-redux";
import QueueAnim from "rc-queue-anim";
import * as groupActions from "../../../../../../actions/Axios/ProductsActions";
import SortingSelecting from "./SortingSelecting";
import ComponentWithHandle from "../../../../../../components/class/ComponentWithHandle";
import model from '../../../../../../class/ServicesAPI';


export default class ProductTable extends ComponentWithHandle {
  componentDidMount() {
    this.checkPermissionAdmin();
  }



  render() {


    return (
      <div
        id="product"
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


