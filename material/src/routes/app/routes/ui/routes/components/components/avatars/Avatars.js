import React from 'react';
import Icon from './Icon';
import Image from './Image';
import Letter from './Letter';

const AvatarSection = () => (
  <article className="article">
    <h2 className="article-title">Material Avatar</h2>

    <section className="box box-default">
      <div className="box-body py-5">
        <Image />
        <Icon />
        <Letter />
      </div>
    </section>
  </article>
);

export default AvatarSection;
