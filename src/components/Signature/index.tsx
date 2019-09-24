import React from 'react';
import ColoredBlock from '../ColoredBlock';

const Signature = ({ title, url }: { title: string; url: string }) => {
  const text = `${title} by @MaximeHeckel ${url}`;
  return (
    <ColoredBlock color="#FEE7DA">
      <h4>
        If you liked this article, don't forget to{' '}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURI(text)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          share it
        </a>{' '}
        or{' '}
        <a
          href={`https://mobile.twitter.com/search?q=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          click here to leave a comment discuss about it on Twitter
        </a>
        {'. '}
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
          website!
        </a>
      </h4>
      <br />
      Have a wonderful day. <br />
      Maxime
    </ColoredBlock>
  );
};

export default Signature;

// https://twitter.com/intent/tweet?text=Automated%20UI%20accessibility%20testing%20with%20Cypress%20by%20%40MaximeHeckel%20https%3A%2F%2Flink.medium.com%2FhfXhgdqoe0
