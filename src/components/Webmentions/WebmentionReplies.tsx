import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from '../../utils/styled';

type Reply = {
  source: URL;
  target: URL;
  verified: boolean;
  verified_date: string;
  id: number;
  private: boolean;
  activity: {
    type: string;
    sentence: string;
    sentence_html: string;
  };
  data: {
    author: {
      name: string;
      url: URL;
      photo: string;
    };
    url: URL;
  };
};
interface RepliesProps {
  replies: Reply[];
}

const Replies = ({ replies }: RepliesProps) => {
  return (
    <>
      {replies && replies.length ? (
        <RepliesList>
          {replies.map((link) => (
            <Head
              key={link.id}
              data-testid={link.id}
              data-tip={link.activity.sentence}
            >
              <OutboundLink
                href={link.data.author.url}
                style={{ flexShrink: 0, cursor: 'pointer' }}
              >
                <img
                  width={40}
                  src={link.data.author.photo}
                  alt={`avatar of ${link.data.author.name}`}
                />
              </OutboundLink>
            </Head>
          ))}
          <ReactTooltip place="top" effect="solid" />
        </RepliesList>
      ) : null}
    </>
  );
};

const RepliesList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0px;
  margin-bottom: 8px;
  margin-top: 15px;
  transition: ${(p) => p.theme.transitionTime}s;
  li {
    transition: ${(p) => p.theme.transitionTime}s;
    margin-right: -10px;
  }

  &:hover {
    li {
      margin-right: 2px;
    }
  }
`;

const Head = styled('li')`
  list-style: none;

  img {
    border-radius: 50%;
    border: 2px solid ${(p) => p.theme.colors.blue};
  }
`;

interface Props {
  title: string;
  url: string;
}

const WebmentionReplies = ({ title, url }: Props) => {
  const [page, setPage] = React.useState(0);
  const [fetchState, setFetchState] = React.useState('fetching');

  const mergeReplies = (oldReplies: Reply[], newReplies: Reply[]) => [
    ...oldReplies,
    ...newReplies,
  ];
  const [replies, setReplies] = React.useReducer(mergeReplies, []);
  const perPage = 100;
  const text = `${title} by @MaximeHeckel ${url}`;

  const getMentions = React.useCallback(
    () =>
      fetch(
        `https://webmention.io/api/mentions?page=${page}&per-page=${perPage}&target=${url}`
      ).then((response) => (response.json ? response.json() : response)),
    [page, url]
  );
  const incrementPage = () => setPage((previousPage) => previousPage + 1);
  //   const fetchMore = () =>
  //     getMentions()
  //       .then((newReplies) => {
  //         if (newReplies.length) {
  //           setReplies(newReplies);
  //         } else {
  //           setFetchState('nomore');
  //         }
  //       })
  //       .then(incrementPage);

  React.useEffect(() => {
    getMentions()
      .then((newReplies) => {
        setReplies(newReplies.links);
        setFetchState('done');
      })
      .then(incrementPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === 'fetching') {
    return <p data-testid="fetching">Fetching Replies...</p>;
  }

  const distinctFans = [
    // @ts-ignore
    ...new Set(replies.map((reply) => reply.data.author.name)),
  ];

  return (
    <div>
      <strong>
        <p data-testid="main-text">
          {replies.length > 0
            ? `Already ${
                distinctFans.length > 1
                  ? `${distinctFans.length} awesome people`
                  : 'one awesome person'
              } liked, shared or talked about this article:`
            : 'Be the first one to share this article!'}
          <br />
        </p>
      </strong>
      <Replies replies={replies} />
      <p data-testid="share-text">
        <OutboundLink
          href={`https://twitter.com/intent/tweet?text=${encodeURI(text)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet about this post
        </OutboundLink>{' '}
        and it will show up here! Or,{' '}
        <OutboundLink
          href={`https://mobile.twitter.com/search?q=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </OutboundLink>{' '}
        to leave a comment and discuss about it on Twitter.
      </p>
    </div>
  );
};

export { WebmentionReplies };
