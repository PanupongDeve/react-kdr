import React, { Component } from "react";
import QueueAnim from 'rc-queue-anim';
import SortingSelecting from './SortingSelecting';
export default class UserTable extends Component {
  render() {
    return (
      <div id="user-table" className="container-fluid no-breadcrumb page-dashboard">
        <div className="box box-default">
          <div className="box-body">
            <div className="row">
              <div className="col-xl-12">
                <div className="box box-transparent">
                  <div className="box-body">
				  <QueueAnim type="bottom" className="ui-animate">
				  <div key="1"><SortingSelecting /></div>
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
