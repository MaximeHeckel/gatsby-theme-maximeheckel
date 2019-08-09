import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { Link } from 'gatsby';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Switch from 'react-switch';
import Logo from '../Logo';

// tslint:disable-next-line:interface-over-type-literal
type TableOfContents = {
  items: Array<{ url: string; title: string }>;
};

interface ITableOfContent {
  tableOfContents?: TableOfContents;
}

interface IHeaderProps {
  links?: JSX.Element[] | JSX.Element;
  siteTitle?: string;
  postTitle?: string;
  sticky?: boolean;
  themeSwitcher?: {
    dark: boolean;
    toggleDark: () => void;
  };
  tableOfContents?: TableOfContents;
}

// Icons from: https://feathericons.com/
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      marginLeft: '5px',
      marginTop: '3px',
    }}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      marginLeft: '3px',
      marginTop: '3px',
    }}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const Title = styled.h2`
  display: block;
  margin: 0;
  margin-left: 24px;

  a {
    text-decoration: none;
  }
`;

const HeaderWrapper = styled.div`
  max-width: 880px;
  position: relative;
`;

const HeaderContent = styled.div`
  @media (max-width: 700px) {
    ${props =>
      props.sticky
        ? `
      left: 30px;
      right: 30px;`
        : ''}
  }

  height: ${props => (props.sticky && props.slim ? '85px ' : '120px')};
  transition: ${props => props.theme.transitionTime}s;
  background: ${props => props.theme.backgroundColor};
  position: ${props => (props.sticky ? 'fixed' : 'inherit')};
  margin: 0 auto;
  max-width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;

  ${props =>
    props.sticky
      ? `
    left: 70px;
    right: 70px;`
      : ''}

  ${props =>
    props.sticky && props.slim
      ? `border-bottom: 1px solid ${props.theme.borderColor}`
      : ''}
`;

const PortfolioLink = styled.div`
  @media (max-width: 700px) {
    display: ${(props: { show: boolean }) => (props.show ? 'flex' : 'none')};
  }
  display: flex;
  color: ${props => props.theme.fontColor};
  min-width: 185px;
  justify-content: space-evenly;
  align-items: center;

  a {
    text-decoration: none;
  }

  label {
    margin-top: 7px;
  }
`;

const TableOfContentsWrapper = styled.ul`
  @media (max-width: 1350px) {
    display: none;
  }

  position: fixed;
  top: 100px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  background: ${props => props.theme.colors.blue};
  margin: 0;
  width: 200px;
  height: 200px;
  border-radius: 4px;
  padding-left: 30px;

  li {
    list-style-type: none;
    margin-bottom: 0;
    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const TableOfContents = ({ tableOfContents }: ITableOfContent) =>
  tableOfContents && tableOfContents.items ? (
    <TableOfContentsWrapper data-testid="table-of-contents">
      {tableOfContents.items.map(item => {
        return (
          <li key={item.url}>
            <AnchorLink offset="150" href={item.url}>
              {item.title}
            </AnchorLink>
          </li>
        );
      })}
    </TableOfContentsWrapper>
  ) : null;

const setHeaderStateAfterScroll = (offset: number = 0) => {
  const [headerState, setHeaderState] = React.useState(false);
  React.useEffect(() => {
    const showTitle = () => setHeaderState(window.scrollY > offset);
    window.addEventListener('scroll', showTitle);
    return () => {
      window.removeEventListener('scroll', showTitle);
    };
  });

  return headerState;
};

const Header = (props: IHeaderProps) => {
  const {
    links,
    postTitle = '',
    themeSwitcher,
    siteTitle = '',
    sticky = false,
    tableOfContents,
  } = props;

  const headerState = setHeaderStateAfterScroll(150);

  return (
    <React.Fragment>
      <HeaderWrapper data-testid="header">
        <HeaderContent slim={headerState} sticky={sticky || false}>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            data-testid="header-site-title"
          >
            <Link to="/">
              <Logo
                aria-label={siteTitle}
                alt={`${siteTitle}'s logo`}
                size={headerState && sticky ? 45 : 65}
              />
            </Link>
            {headerState && postTitle !== '' ? (
              <Title data-testid="header-post-title">
                <AnchorLink offset="150" href="#top">
                  {postTitle}
                </AnchorLink>
              </Title>
            ) : null}
          </div>
          <div style={{ display: 'flex' }}>
            <PortfolioLink show={siteTitle === ''}>{links}</PortfolioLink>
            {themeSwitcher && Object.keys(themeSwitcher).length > 0 ? (
              <label data-testid="darkmode-switch" htmlFor="darkmode-switch">
                <Switch
                  aria-label="Switch between dark and light mode"
                  tabIndex={0}
                  onChange={themeSwitcher.toggleDark}
                  checked={themeSwitcher.dark}
                  id="darkmode-switch"
                  onColor="#196FD8"
                  uncheckedIcon={<Sun />}
                  checkedIcon={<Moon />}
                />
              </label>
            ) : null}
          </div>
        </HeaderContent>
      </HeaderWrapper>
      {headerState && postTitle !== '' ? (
        <TableOfContents tableOfContents={tableOfContents} />
      ) : null}
    </React.Fragment>
  );
};

export default withTheme(Header);
