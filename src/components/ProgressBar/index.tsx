import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import styled from '../../utils/styled';
import { useReducedMotion, motion, useViewportScroll } from 'framer-motion';

const ProgressBar = styled(motion.div)`
  width: 1px;
  background-color: var(--maximeheckel-colors-typeface-1);
  height: 100%;
`;

const ProgressBarWrapper = styled(motion.div)`
  height: calc(88vh - 40px);
  max-height: 425px;
  width: 1px;
  background-color: rgba(8, 8, 11, 0.3);
`;

type WrapperProps = {
  showTableOfContents: boolean;
  slim?: boolean;
};

const Wrapper = styled('div')<WrapperProps>`
  @media (max-width: 1100px) {
    left: 10px;
  }
  position: fixed;
  top: 266px;
  display: flex;
  left: 30px;

  ${(p) =>
    !p.showTableOfContents
      ? `
   ul {
     display: none;
   }
  `
      : ''}

  ul {
    @media (max-width: 1250px) {
      display: none;
    }

    max-width: ${(p) => (p.slim ? '150px' : '200px')};
    display: flex;
    flex-direction: column;

    li {
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      margin-bottom: 22px;
      a {
        ${(p) =>
          !p.showTableOfContents ? `cursor: none;  pointer-events: none;` : ''}
        color: var(--maximeheckel-colors-typeface-1);
        text-decoration: none;
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
  const shouldReduceMotion = useReducedMotion();
  const [readingProgress, setReadingProgress] = React.useState(0);

  const shouldShowTableOfContent = readingProgress > 7 && readingProgress < 100;
  const shouldHideProgressBar = readingProgress >= 99;

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

  const variants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: { opacity: 0.7 },
    emphasis: { opacity: 1 },
  };

  const { scrollYProgress } = useViewportScroll();

  return (
    <Wrapper slim={slim} showTableOfContents={shouldShowTableOfContent}>
      <ProgressBarWrapper
        initial="show"
        variants={variants}
        animate={shouldHideProgressBar ? 'hide' : 'show'}
        transition={{ type: 'spring' }}
      >
        <ProgressBar
          style={{ transformOrigin: 'top', scaleY: scrollYProgress }}
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
              <motion.li
                initial="hide"
                variants={variants}
                animate={shouldShowTableOfContent ? 'show' : 'hide'}
                transition={{ type: 'spring' }}
                key={item.url}
                whileHover={shouldShowTableOfContent ? 'emphasis' : 'hide'}
              >
                <AnchorLink offset="150" href={item.url}>
                  {item.title}
                </AnchorLink>
              </motion.li>
            );
          })}
        </Scrollspy>
      ) : null}
    </Wrapper>
  );
};

export default ReadingProgress;
