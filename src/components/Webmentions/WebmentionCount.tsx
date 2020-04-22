import React from 'react';
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

const WebmentionCount = ({ target }) => {
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
        <div>
          {counts.type.like + counts.type.repost || 0}
          {' Likes '}&bull; {counts.type.mention + counts.type.reply || 0}
          {' Replies '}&bull; {counts.type.repost + counts.type.repost || 0}
          {' Repost'}
        </div>
      )}
    </CountWrapper>
  );
};

const CountWrapper = styled('div')`
  font-size: 14px;
  background: #e2086a;
  color: #ffffff;
  border-radius: 10px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px 5px 8px;
`;

export { WebmentionCount };
