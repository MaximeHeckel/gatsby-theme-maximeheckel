import React from 'react';
import Button from '../Button';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const Replies = ({ replies }) => {
  const replyElements = replies.map((link) => (
    <li key={link.id} style={{ margin: '1.6rem 0' }}>
      <div style={{ flexDirection: 'row' }}>
        <OutboundLink
          href={link.data.author.url}
          style={{ flexShrink: 0, cursor: 'pointer' }}
        >
          <img
            style={{ borderRadius: '50%' }}
            width={40}
            src={link.data.author.photo}
            alt={`avatar of ${link.data.author.name}`}
          />
        </OutboundLink>
        <p style={{ padding: '0 1rem 0' }} as="article">
          {link.activity.sentence}
        </p>
      </div>
    </li>
  ));

  return (
    <>
      {replies && replies.length ? (
        <ul style={{ listStyle: 'none' }}>{replyElements}</ul>
      ) : (
        <p>There is no reply...</p>
      )}
    </>
  );
};

const WebmentionReplies = ({ target }) => {
  const [page, setPage] = React.useState(0);
  const [fetchState, setFetchState] = React.useState('fetching');

  const mergeReplies = (oldReplies, newReplies) => [
    ...oldReplies,
    ...newReplies,
  ];
  const [replies, setReplies] = React.useReducer(mergeReplies, []);
  const perPage = 50;

  const getMentions = () =>
    fetch(
      `https://webmention.io/api/mentions?page=${page}&per-page=${perPage}&target=${target}`
    )
      .then((response) => response.json())
      .then((json) => [...json.links]);
  const incrementPage = () => setPage((previousPage) => previousPage + 1);
  const fetchMore = () =>
    getMentions()
      .then((newReplies) => {
        if (newReplies.length) {
          setReplies(newReplies);
        } else {
          setFetchState('nomore');
        }
      })
      .then(incrementPage);

  // Load initial comments once
  React.useEffect(() => {
    getMentions()
      .then((newReplies) => {
        setReplies(newReplies);
        setFetchState('done');
      })
      .then(incrementPage);
  }, []);

  return (
    <>
      {fetchState === 'fetching' && <p>Fetching Replies...</p>}
      <Replies replies={replies} />
      {fetchState !== 'nomore' ? (
        <Button onClick={fetchMore}>Fetch More...</Button>
      ) : (
        <p>
          No further replies found.{' '}
          <OutboundLink
            href={`https://twitter.com/intent/tweet/?text=My%20thoughts%20on%20${target}`}
          >
            Tweet about this post
          </OutboundLink>{' '}
          and it will show up here!
        </p>
      )}
    </>
  );
};

export { WebmentionReplies };
