import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LightDarkSwitcher from '../LightDarkSwitcher';
import Logo from '../Logo';
import styled from '../../utils/styled';

interface IHeaderProps {
  links?: JSX.Element[] | JSX.Element;
  siteTitle?: string;
  postTitle?: string;
  sticky?: boolean;
  themeSwitcher?: {
    dark: boolean;
    toggleDark: () => void;
  };
}

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

const useHeaderStateAfterScroll = (offset: number = 0) => {
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

const Header: React.FC<IHeaderProps> = props => {
  const {
    links,
    postTitle = '',
    themeSwitcher,
    siteTitle = '',
    sticky = false,
  } = props;

  const headerState = useHeaderStateAfterScroll(120);

  return (
    <HeaderWrapper
      data-testid="header"
      slim={headerState}
      sticky={sticky || false}
    >
      <HeaderContent>
        <div data-testid="header-site-title">
          <Link
            to="/"
            aria-label="Go back to article list"
            title="Go back to article list"
          >
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
        <div>
          {links ? (
            <CustomLinks show={siteTitle === ''}>{links}</CustomLinks>
          ) : null}
          <TwitterLinkWrapper>
            <OutboundLink
              data-testid="twitter-link"
              aria-label="Follow me on Twitter"
              title="Follow me on Twitter"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/MaximeHeckel"
              style={{ textDecoration: 'underline' }}
            >
              <TwitterIcon />
            </OutboundLink>
          </TwitterLinkWrapper>
          {themeSwitcher && Object.keys(themeSwitcher).length > 0 ? (
            <LightDarkSwitcher
              data-testid="darkmode-switch"
              html-for="darkmode-switch"
              onClick={themeSwitcher.toggleDark}
              isDark={themeSwitcher.dark}
              aria-label={
                themeSwitcher.dark
                  ? 'Activate light mode'
                  : 'Activate dark mode'
              }
              title={
                themeSwitcher.dark
                  ? 'Activate light mode'
                  : 'Activate dark mode'
              }
            />
          ) : null}
        </div>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;

const Title = styled.h3`
  @media (max-width: 900px) {
    max-width: 400px;
  }

  @media (max-width: 800px) {
    max-width: 300px;
    margin-left: 20px;
  }

  @media (max-width: 400px) {
    max-width: 175px;
  }

  display: block;
  margin: 0;
  margin-left: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.fontColor};

  a {
    color: ${props => props.theme.fontColor};
    text-decoration: none;
  }
`;

type HeaderWrapperProps = {
  slim: boolean;
  sticky: boolean;
};

const HeaderWrapper = styled.div<HeaderWrapperProps>`
  background: ${props => props.theme.backgroundColor};
  transition: ${props => props.theme.transitionTime}s;
  width: 100%;
  border-top: 6px solid ${props => props.theme.colors.blue};
  height: ${props => (props.sticky && props.slim ? '75px ' : '120px')};
  position: ${props => (props.sticky ? 'fixed' : 'inherit')};
  z-index: 999;
  ${props => (props.slim ? `box-shadow: ${props.theme.boxShadow};` : '')}
`;

const HeaderContent = styled.div`
  @media (max-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  padding-left: 70px;
  padding-right: 70px;
  margin: 0 auto;
  height: inherit;
  max-width: 1020px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
`;

const TwitterLinkWrapper = styled('div')`
  width: 50px;
  margin-top: 10px;
  svg {
    fill: ${p => p.theme.colors.blue};
  }
`;

type CustomLinksProps = {
  show: boolean;
};

const CustomLinks = styled.div<CustomLinksProps>`
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
