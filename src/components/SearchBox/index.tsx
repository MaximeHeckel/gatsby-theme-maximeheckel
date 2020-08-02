import { withTheme } from 'emotion-theming';
import FocusTrap from 'focus-trap-react';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import Mousetrap from 'mousetrap';
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from '../Logo';
import styled, { Theme } from '../../utils/styled';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { MONTHS } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

declare global {
  interface Window {
    __LUNR__: any;
  }
}

type Result = {
  date: string;
  slug: string;
  title: string;
};

interface Props {
  location: { search?: string };
  onClose: () => void;
  showOverride?: boolean;
  theme: Theme;
}

const SearchBox: React.FC<Props> = (props) => {
  const { location, onClose, showOverride } = props;

  // Local state to track the input value
  const [searchQuery, setSearchQuery] = React.useState(
    // defaults to whatever search query param is present in the URL
    // new URLSearchParams(location.search).get('search') || ''
    ''
  );
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 200);

  const toggleLockScroll = () =>
    document.documentElement.classList.toggle('lock-scroll');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchBoxRef = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(showOverride);
  const [results, setResults] = React.useState<Result[]>([]);

  const close = React.useCallback(() => {
    toggleLockScroll();
    // navigate('');
    onClose();
    return setShow(false);
  }, [onClose]);

  const clickAway = (e: React.BaseSyntheticEvent) => {
    if (
      searchBoxRef &&
      searchBoxRef.current &&
      searchBoxRef.current.contains(e.target)
    ) {
      return null;
    }
    return close();
  };

  React.useEffect(() => {
    Mousetrap.bind(['command+k', 'ctrl+k'], () => setShow(true));
    return () => {
      Mousetrap.unbind(['command+k', 'ctrl+k']);
    };
  }, []);

  React.useEffect(() => {
    setShow(showOverride);
  }, [showOverride]);

  React.useEffect(() => {
    if (show) {
      toggleLockScroll();
      inputRef && inputRef.current && inputRef.current.focus();
    }
  }, [show]);

  React.useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent): void => {
      switch (e.keyCode) {
        case 27:
          return close();
        default:
          return;
      }
    };

    document.addEventListener('keydown', keyPressHandler);

    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, [close]);

  React.useEffect(() => {
    if (
      debouncedSearchQuery &&
      debouncedSearchQuery !== '' &&
      window.__LUNR__
    ) {
      window.__LUNR__.__loaded.then(
        (lunr: {
          en: {
            index: { search: (arg0: string) => { ref: string }[] };
            store: { [x: string]: any };
          };
        }) => {
          const refs: { ref: string }[] = lunr.en.index.search(
            debouncedSearchQuery
          );
          const posts = refs.map(({ ref }) => lunr.en.store[ref]);
          setResults(posts);
        }
      );
    }

    if (debouncedSearchQuery === '') {
      setResults([]);
    }
  }, [location.search, show, debouncedSearchQuery]);

  const { dark } = useTheme();

  if (!show) {
    return null;
  }

  const animationDuration =
    results.length >= 7 ? 1 : results.length > 0 ? results.length * 0.05 : 0.4;
  const animationHeight =
    (results.length >= 7
      ? 600
      : results.length > 0
      ? results.length * 75
      : 75) + 175;

  return ReactDOM.createPortal(
    <FocusTrap>
      <aside>
        <SearchBoxOverlay
          initial={{
            backdropFilter: 'blur(0px)',
            backgroundColor: dark ? 'rgba(0,0,0,0)' : 'rgba(236, 236, 236, 0)',
          }}
          animate={{
            backdropFilter: 'blur(6px)',
            backgroundColor: props.theme.overlayBackground,
          }}
          transition={{ duration: 0.6, when: 'beforeChildren' }}
          onClick={clickAway}
          data-testid="searchbox-overlay"
          aria-label="search"
          // The dialog container element has aria-modal set to true.
          aria-modal="true"
          tabIndex={-1}
          // All elements required to operate the dialog are descendants of the element that has role dialog.
          role="dialog"
        >
          <SearchBoxWrapper data-testid="searchbox" ref={searchBoxRef}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                ref={inputRef}
                autoComplete="off"
                type="search"
                placeholder="Type keywords to search..."
                data-testid="search-input"
                id="search-input"
                name="search"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // navigate(`?search=${encodeURIComponent(e.target.value)}`);
                }}
                value={searchQuery}
              />
            </form>
            <SearchResults
              initial={{ height: 0 }}
              animate={
                debouncedSearchQuery
                  ? {
                      height: animationHeight,
                    }
                  : { height: 175 }
              }
              transition={{
                duration: animationDuration,
              }}
            >
              {debouncedSearchQuery === '' || results.length > 0 ? (
                results.map((result) => {
                  const parsedDate = new Date(Date.parse(result.date));

                  return (
                    <Item data-testid="search-result" key={result.slug}>
                      <Link
                        style={{ textDecoration: `none` }}
                        onClick={() => toggleLockScroll()}
                        to={result.slug}
                      >
                        <h4>{result.title}</h4>
                        <p>{`${
                          MONTHS[parsedDate.getMonth()]
                        } ${parsedDate.getDate()} ${parsedDate.getFullYear()}`}</p>
                      </Link>
                    </Item>
                  );
                })
              ) : (
                <NoResultsWrapper>No results</NoResultsWrapper>
              )}
              <Item data-testid="portfolio-link">
                <a
                  href="https://maximeheckel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: `none` }}
                >
                  <div>
                    <Logo alt="Maxime Heckel's logo" size={30} />
                    <b>Go to portfolio</b>
                  </div>
                </a>
              </Item>
              <Item data-testid="twitter-link">
                <a
                  href="https://twitter.com/maximeheckel"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: `none` }}
                >
                  <div>
                    <TwitterIcon /> <b>Follow me on Twitter</b>
                  </div>
                </a>
              </Item>
            </SearchResults>
          </SearchBoxWrapper>
        </SearchBoxOverlay>
      </aside>
    </FocusTrap>,
    document.body
  );
};

export default withTheme(SearchBox);

const NoResultsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  color: ${(p) => p.theme.fontColor};
  font-weight: 600;
`;

const Item = styled('li')<{}>`
  @media (max-width: 700px) {
    height: 90px;
  }

  height: 75px;
  margin-bottom: 0px;
  padding-left: 24px;
  padding-right: 24px;
  color: ${(p) => p.theme.fontColor};
  transition: ${(props) => props.theme.transitionTime / 1.7}s;
  list-style: none;

  &:hover {
    background-color: ${(p) => p.theme.overlayBackground};

    h4 {
      color: ${(p) => p.theme.colors.blue};
    }
  }

  a {
    color: ${(props) => props.theme.fontColor};
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  h4 {
    margin-bottom: 0px;
    font-weight: 500;
  }

  p {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 0px;
    color: ${(p) => p.theme.bodyColor};
  }

  div {
    display: flex;
    align-items: center;

    b {
      margin-left: 20px;
    }

    svg {
      fill: ${(p) => p.theme.colors.blue};
    }
  }
`;

const SearchResults = styled(motion.ul)<{}>`
  @media (max-width: 700px) {
    max-height: 300px;
  }

  max-height: 500px;
  overflow: scroll;
  margin: 0px;
`;

const SearchBoxWrapper = styled('div')<{}>`
  @media (max-width: 700px) {
    width: 100%;
    top: 0;
  }

  position: fixed;
  overflow: hidden;
  background: ${(p) => p.theme.backgroundColor};
  width: 600px;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0%);
  border-radius: 5px;
  border: 1px solid ${(p) => p.theme.borderColor};
  box-shadow: ${(p) => p.theme.boxShadow};

  form {
    margin-bottom: 30px;
    padding: 24px 24px 0px;
  }

  input {
    outline: none;
    background: transparent;
    border: none;
    font-size: 25px;
    font-weight: 300;
    height: 55px;
    width: 100%;
    color: ${(p) => p.theme.fontColor};
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${(p) => p.theme.bodyColor};
    }
    :-ms-input-placeholder {
      color: ${(p) => p.theme.bodyColor};
    }

    ::-webkit-autofill {
      background: transparent;
      color: ${(p) => p.theme.fontColor};
      font-size: 14px;
    }
  }
`;

const SearchBoxOverlay = styled(motion.div)<{}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
`;
