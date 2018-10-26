import React from "react";
import QueueAnim from "rc-queue-anim";
import SortingSelecting from "./SortingSelecting";
import ComponentWithHandle from "../../../../../../components/class/ComponentWithHandle";

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
                        <SortingSelecting />
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
