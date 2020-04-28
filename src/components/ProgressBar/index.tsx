import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import styled from '../../utils/styled';

const ProgressBar = styled('div')`
  width: 1px;
  background-color: ${(props) => props.theme.fontColor};
`;

type ProgressBarWrapperProps = {
  readingProgress: number;
};

const ProgressBarWrapper = styled('div')<ProgressBarWrapperProps>`
  opacity: ${(props: ProgressBarWrapperProps) =>
    props.readingProgress === 100 ? '0' : '0.6'};
  transition: ${(props) => props.theme.transitionTime}s;
  height: calc(88vh - 40px);
  max-height: 425px;
  width: 1px;
  background-color: rgba(8, 8, 11, 0.3);

  div:first-of-type {
    height: ${(props) => props.readingProgress}%;
  }
`;

type WrapperProps = {
  showTableOfContents: boolean;
  slim?: boolean;
};

const Wrapper = styled('div')<WrapperProps>`
  @media (max-width: 1100px) {
    left: 10px;
  }
  transition: ${(props) => props.theme.transitionTime}s;
  position: fixed;
  top: 200px;
  display: flex;
  left: 30px;
  ul {
    @media (max-width: 1250px) {
      display: none;
    }

    max-width: ${(p) => (p.slim ? '150px' : '200px')};
    display: flex;
    flex-direction: column;

    &:hover {
      li {
        opacity: ${(props) => (props.showTableOfContents ? '1.0' : '0')};
      }
    }

    li {
      transition: ${(props) => props.theme.transitionTime}s;
      opacity: ${(props) => (props.showTableOfContents ? '0.7' : '0')};
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      margin-bottom: 22px;
      a {
        color: ${(props) => props.theme.fontColor};
        text-decoration: none;
        &:hover {
          color: ${(props) => props.theme.colors.blue};
        }
      }
    }
  }
`;

type TableOfContentItemType = {
  url: string;
  title: string;
};

export type TableOfContentType = {
  items: TableOfContentItemType[];
};

interface ReadingProgressProps {
  tableOfContents?: TableOfContentType;
  target: React.RefObject<HTMLDivElement>;
  slim?: boolean;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  tableOfContents,
  target,
  slim,
}) => {
  const [readingProgress, setReadingProgress] = React.useState(0);
  const scrollListener = () => {
    if (!target || !target.current) {
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
    <Wrapper
      slim={slim}
      showTableOfContents={readingProgress > 7 && readingProgress < 100}
    >
      <ProgressBarWrapper readingProgress={readingProgress}>
        <ProgressBar
          data-testid="progress-bar"
          data-testprogress={readingProgress}
        />
      </ProgressBarWrapper>
      {tableOfContents && tableOfContents.items.length > 0 ? (
        <Scrollspy
          items={tableOfContents.items.map(
            (item) => `${item.url.replace('#', '')}-section`
          )}
          currentClassName="isCurrent"
          offset={-175}
        >
          {tableOfContents.items.map((item) => {
            return (
              <li key={item.url}>
                <AnchorLink offset="150" href={item.url}>
                  {item.title}
                </AnchorLink>
              </li>
            );
          })}
        </Scrollspy>
      ) : null}
    </Wrapper>
  );
};

export default ReadingProgress;
