import React from 'react';
import CircularDeterminate from './CircularDeterminate';
import CircularIndeterminate from './CircularIndeterminate';
import CircularStatic from './CircularStatic';
import InteractiveIntegration from './InteractiveIntegration';
import LinearBuffer from './LinearBuffer';
import LinearDeterminate from './LinearDeterminate';
import LinearIndeterminate from './LinearIndeterminate';
import LinearQuery from './LinearQuery';

const ProgressSection = () => (
  <article className="article">
    <h2 className="article-title">Material Progress</h2>

    <section className="box box-default">
      <div className="box-header">Circular</div>
      <div className="box-body py-5">
        <CircularIndeterminate />
        <InteractiveIntegration />
        <CircularDeterminate />
        <CircularStatic />
      </div>
    </section>
    <section className="box box-default">
      <div className="box-header">Linear</div>
      <div className="box-body py-5">
        <LinearIndeterminate />
        <LinearDeterminate />
        <LinearBuffer />
        <LinearQuery />
      </div>
    </section>
  </article>
);

export default ProgressSection;
