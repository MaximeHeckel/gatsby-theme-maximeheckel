import React from 'react';
import styled from '../../utils/styled';

const ColoredBlockWrapper = styled('div')`
  background: ${props => props.theme.overlayBackground};
  color: ${props => props.theme.fontColor};
  position: relative;
  width: 100vw;
  padding-bottom: 50px;
  padding-top: 50px;
  left: calc(-50vw + 50%);

  div {
    @media (max-width: 800px) {
      padding-left: 30px;
      padding-right: 30px;
    }
    margin: 0 auto;
    max-width: 700px;
  }
`;

const Signature: React.FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  const text = `${title} by @MaximeHeckel ${url}`;
  return (
    <ColoredBlockWrapper data-testid="signature">
      <div>
        <p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          If you liked this article, don't forget to{' '}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURI(text)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            share it
          </a>
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
        </p>
        <br />
        <p>
          Have a wonderful day. <br />
          Maxime
        </p>
      </div>
    </ColoredBlockWrapper>
  );
};

export default Signature;

// https://twitter.com/intent/tweet?text=Automated%20UI%20accessibility%20testing%20with%20Cypress%20by%20%40MaximeHeckel%20https%3A%2F%2Flink.medium.com%2FhfXhgdqoe0
