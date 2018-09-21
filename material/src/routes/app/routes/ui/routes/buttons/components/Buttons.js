import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ButtonsWithIconsAndLabel from './ButtonsWithIconsAndLabel';
import ContainedButtons from './ContainedButtons';
import FloatingActionButtons from './FloatingActionButtons';
import IconButtons from './IconButtons';
import Sizes from './Sizes';
import TextButtons from './TextButtons';


const Section1 = () => (
  <div className="row">
    <div className="col-xl-5">
      <FloatingActionButtons />
    </div>
    <div className="col-xl-5">
      <IconButtons />
    </div>
  </div>
);

const Section2 = () => (
  <div className="row">
    <div className="col-xl-5"> <ContainedButtons /> </div>
    <div className="col-xl-5"> <TextButtons /> </div>
  </div>
);

const Section3 = () => (
  <div className="row">
    <div className="col-xl-5"> <Sizes /> </div>
    <div className="col-xl-5"> <ButtonsWithIconsAndLabel /> </div>
  </div>
);


const Page = () => (
  <section className="container-fluid container-mw-xl chapter">
    <article className="article">
      <h2 className="article-title">Material Buttons</h2>

      <QueueAnim type="bottom" className="ui-animate">
        <div key="1"><Section1 /></div>
        <div key="2"><Section2 /></div>
        <div key="3"><Section3 /></div>
      </QueueAnim>

    </article>
  </section>
);

export default Page;
