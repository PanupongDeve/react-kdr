import React from 'react';
import QueueAnim from 'rc-queue-anim';

const Menus = () => (
  <section className="container-fluid container-mw-xl chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"></div>
    </QueueAnim>
  </section>
);

export default Menus;
