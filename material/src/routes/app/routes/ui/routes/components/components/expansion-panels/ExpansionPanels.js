import React from 'react';
import Accordion from './Accordion';
import Simple from './Simple';

const Section = () => (
  <article className="article">
    <h2 className="article-title">Expansion Panels</h2>
    <Simple />
    <Accordion />
  </article>
)

export default Section;
