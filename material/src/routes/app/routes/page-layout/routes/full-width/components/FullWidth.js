import React from 'react';
import QueueAnim from 'rc-queue-anim';
import DEMO from 'constants/demoData';

const FullWidth = () => (
  <section className="container-fluid">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href={DEMO.link}>Page</a></li>
      <li className="breadcrumb-item active">Blank</li>
    </ol>
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1">
        <h2 className="article-title-style">Blank</h2>
      </div>
    </QueueAnim>
  </section>
);

export default FullWidth;
