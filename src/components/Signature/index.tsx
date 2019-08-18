import React from 'react';
import ColoredBlock from '../ColoredBlock';

const Signature = () => (
  <ColoredBlock color="#FEE7DA">
    <h4>
      If you liked this article, don't forget to share it or click{' '}
      <a
        href={`https://mobile.twitter.com/search?q=${window.location.toString()}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        here to leave a comment discuss about it on Twitter.
      </a>{' '}
      Do you have any questions, comments or simply wish to contact me
      privately? I’m always reachable on{' '}
      <a
        href="http://twitter.com/MaximeHeckel"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>{' '}
      or on my{' '}
      <a
        href="https://maximeheckel.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        website
      </a>
      . Do not hesitate to contact me!
    </h4>
    <br />
    Have a wonderful day. <br />
    Maxime
  </ColoredBlock>
);

export default Signature;
