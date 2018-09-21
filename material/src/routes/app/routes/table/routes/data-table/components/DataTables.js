import React from 'react';
import QueueAnim from 'rc-queue-anim';
import SortingSelecting from './SortingSelecting';
import CustomizedTables from './CustomizedTables';

const Page = () => (
  <div className="container-fluid container-mw-xl chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><SortingSelecting /></div>
      <div key="2"><CustomizedTables /></div>
    </QueueAnim>
  </div>
);

export default Page;
