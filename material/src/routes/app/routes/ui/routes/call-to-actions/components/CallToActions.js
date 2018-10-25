import React from 'react';
import Button from '@material-ui/core/Button';
import QueueAnim from 'rc-queue-anim';

const Section1 = () => (
  <div className="container-fluid container-mw">
    <article className="article">
      <h2 className="article-title">Basic</h2>

      <div className="box box-default">
        <div className="box-body">
          <div className="call-to-action cta-inline">
            <div className="cta-inner">
              <span className="cta-text">Download it now and get up and running in minutes</span>
              <div className="cta-btn">
                <Button variant="contained" color="secondary" className="btn-w-md"> Free Download </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
);

const Section2 = () => (
  <div>
    <div className="container-fluid container-mw">
      <article className="article m-0-bttom">
        <h2 className="article-title">Full Width (Inline)</h2>
      </article>
    </div>
    <div className="call-to-action cta-inline cta-full-width card-white">
      <div className="cta-inner">
        <span className="cta-text">Download it now and get up and running in minutes</span>
        <div className="cta-btn">
          <Button variant="contained" color="secondary" className="btn-w-md"> Free Download </Button>
        </div>
      </div>
    </div>
    <div className="divider" />
  </div>
);

const Section3 = () => (
  <div>
    <div className="container-fluid container-mw">
      <article className="article m-0-bttom">
        <h2 className="article-title">Full Width</h2>
      </article>
    </div>
    <div className="call-to-action cta-full-width card-white">
      <div className="cta-inner">
        <span className="cta-text">Download it now and get up and running in minutes</span>
        <div className="cta-btn">
          <Button variant="contained" color="secondary" className="btn-w-md"> Free Download </Button>
        </div>
        <div className="cta-muted">No spam! We promise, only the best stuff.</div>
      </div>
    </div>
    <div className="divider" />
  </div>
);

const Section4 = () => (
  <div>
    <div className="container-fluid container-mw">
      <article className="article m-0-bttom">
        <h2 className="article-title">Image Background</h2>
      </article>
    </div>
    <div className="call-to-action cta-bg-img cta-full-width" style={{backgroundImage: 'url(assets/images-demo/covers/photo-1456374407032-6e4baf58fb62.jpg)'}}>
      <div className="cta-inner">
        <span className="cta-text">Download it now and get up and running in minutes</span>
        <div className="cta-btn">
          <Button variant="contained" color="secondary" className="btn-w-md"> Free Download </Button>
        </div>
        <div className="cta-muted">No spam! We promise, only the best stuff.</div>
      </div>
    </div>
  </div>
);


const CallToActions = () => (
  <section className="chapter">

    <QueueAnim type="bottom" className="ui-animate">
      <div key="1"><Section1 /></div>
      <div key="2"><Section2 /></div>
      <div key="3"><Section3 /></div>
      <div key="4"><Section4 /></div>
    </QueueAnim>

  </section>
);

export default CallToActions;
