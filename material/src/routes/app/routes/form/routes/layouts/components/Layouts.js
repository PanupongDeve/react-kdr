import React from 'react';
import QueueAnim from 'rc-queue-anim';
import FormLayout from './FormLayout';

const Page = () => (
  <section className="container-fluid container-mw-lg chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div className="article__section" key="1"> <FormLayout /> </div>
    </QueueAnim>
  </section>
);

export default Page;
