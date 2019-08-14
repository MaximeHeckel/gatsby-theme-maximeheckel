import styled from '@emotion/styled';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Wrapper = styled('div')`
  @media (max-width: 1250px) {
    left: 100px;
  }
  @media (max-width: 1100px) {
    left: 10px;
  }
  transition: ${props => props.theme.transitionTime}s;
  position: fixed;
  top: 200px;
  display: flex;
  left: ${props => (props.showTableOfContents ? '30px' : '100px')};
  ul {
    @media (max-width: 1250px) {
      display: none;
    }
    transition: ${props => props.theme.transitionTime}s;
    opacity: ${props => (props.showTableOfContents ? '0.2' : '0')};
    max-width: 200px;
    display: flex;
    flex-direction: column;

    &:hover {
      opacity: ${props => (props.showTableOfContents ? '0.6' : '0')};
    }
  }

  li {
    list-style: none;
    color: ${props => props.theme.fontColor};
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 22px;
    a {
      text-decoration: none;
    }
  }
`;

const ProgressBarWrapper = styled('div')`
  opacity: 0.6;
  height: calc(88vh - 40px);
  max-height: 425px;
  width: 1px;
  background-color: rgba(8, 8, 11, 0.3);
`;

const ProgressBar = styled('div')`
  width: 1px;
  background-color: ${props => props.theme.fontColor};
`;

const ReadingProgress = ({ tableOfContents, target }) => {
  const [readingProgress, setReadingProgress] = React.useState(0);
  const scrollListener = () => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const totalHeight = element.clientHeight;
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowScrollTop === 0) {
      return setReadingProgress(0);
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100);
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  });

  return (
    <Wrapper showTableOfContents={readingProgress > 7 && readingProgress < 90}>
      <ProgressBarWrapper>
        <ProgressBar style={{ height: `${readingProgress}%` }} />
      </ProgressBarWrapper>
      <ul>
        {tableOfContents.items.map(item => {
          return (
            <li key={item.url}>
              <AnchorLink offset="150" href={item.url}>
                {item.title}
              </AnchorLink>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default ReadingProgress;
