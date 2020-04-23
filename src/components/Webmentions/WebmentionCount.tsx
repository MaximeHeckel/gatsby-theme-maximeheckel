import React from 'react';
import Flex from '../Flex';
import styled from '../../utils/styled';

const initialCounts = {
  count: 0,
  type: {
    like: 0,
    mention: 0,
    reply: 0,
    repost: 0,
  },
};

const WebmentionCount = ({ target }: { target: string }) => {
  const [counts, setCounts] = React.useState(initialCounts);

  // Get counts on `target` change.
  React.useEffect(() => {
    async function getCounts() {
      const url = `https://webmention.io/api/count.json?target=${target}`;
      const responseCounts = await fetch(url).then((response) =>
        response.json()
      );

      setCounts((previousCounts) => {
        return {
          ...previousCounts,
          ...responseCounts,
          type: {
            ...previousCounts.type,
            ...responseCounts.type,
          },
        };
      });
    }

    getCounts();
  }, [target]);

  return (
    <CountWrapper>
      {counts === undefined && <p>Failed to load counts 😞</p>}
      {counts && (
        <>
          <p>
            {counts.type.like || 0}
            {' Likes '}&bull;
          </p>
          <p>
            {' '}
            {counts.type.reply || 0}
            {' Replies '}&bull;
          </p>
          <p>
            {' '}
            {counts.type.repost || 0}
            {' Reposts'}
          </p>
        </>
      )}
    </CountWrapper>
  );
};

const CountWrapper = styled(Flex)`
  p {
    color: ${(p) => p.theme.colors.blue} !important;
    font-size: 16px;
    font-weight: 500;
  }
`;

export { WebmentionCount };
