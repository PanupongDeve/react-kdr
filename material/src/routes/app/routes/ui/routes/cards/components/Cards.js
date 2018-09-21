import React from 'react';
import QueueAnim from 'rc-queue-anim';
import Simple from './Simple';
import Media from './Media';
import UIControls from './UIControls';
import ComplexInteraction from './ComplexInteraction';


const Section1 = () => (
  <div className="row">
    <div className="col-lg-6 mb-5"> <Simple /> </div>
    <div className="col-lg-6 mb-5"> <Media /> </div>
  </div>
);

const Section2 = () => (
  <div className="row">
    <div className="col-lg-6 mb-5"> <UIControls /> </div>
    <div className="col-lg-6 mb-5"> <ComplexInteraction /> </div>
  </div>
);

const Page = () => (
  <section className="container-fluid container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title page-title">Cards</h2>
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><Section1 /></div>
        <div key="2"><Section2 /></div>
      </QueueAnim>
    </article>
  </section>
);

export default Page;

