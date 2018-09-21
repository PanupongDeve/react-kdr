import React from 'react';
import Basic from './Basic';
import NoLabel from './NoLabel';


const BottomNavigationSection = () => (
  <article className="article">
    <h2 className="article-title">Material Bottom Navigation</h2>

    <section className="box box-transparent">
      <div className="box-body py-4 px-0">
        <Basic />
        <NoLabel />
      </div>
    </section>
  </article>
    );

export default BottomNavigationSection;
