import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LightDarkSwitcher from '../LightDarkSwitcher';
import Logo from '../Logo';

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
  } = props;

  const headerState = setHeaderStateAfterScroll(150);

  return (
    <HeaderWrapper
      data-testid="header"
      slim={headerState}
      sticky={sticky || false}
    >
      <HeaderContent>
        <div data-testid="header-site-title">
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
        <div>
          {links ? (
            <CustomLinks show={siteTitle === ''}>{links}</CustomLinks>
          ) : null}
          {themeSwitcher && Object.keys(themeSwitcher).length > 0 ? (
            <LightDarkSwitcher
              data-testid="darkmode-switch"
              htmlFor="darkmode-switch"
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

const Title = styled.h2`
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
    text-decoration: none;
  }
`;

const HeaderWrapper = styled.div`
  background: ${props => props.theme.backgroundColor};
  transition: ${props => props.theme.transitionTime}s;
  width: 100%;
  height: ${props => (props.sticky && props.slim ? '85px ' : '120px')};
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

const CustomLinks = styled.div`
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
