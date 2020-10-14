import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { Title } from './Title';
import { Wrapper } from './Wrapper';
import Flex from '../Flex';
import styled from '../../utils/styled';
import { useTheme } from '../../context/ThemeContext';
import MHLogo from '../Logo';
import { LinkButton } from '../Button/LinkButton';
import SearchBox from '../SearchBox';
import { CommandCenterButton, LightDarkSwitcher } from '../Button';

const TwitterIcon = () => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.8618 2.9995C22.9042 3.67497 21.8439 4.19161 20.7218 4.5295C20.1196 3.83701 19.3192 3.34619 18.4289 3.12342C17.5386 2.90066 16.6013 2.95669 15.7439 3.28395C14.8865 3.61121 14.1503 4.1939 13.6348 4.95321C13.1193 5.71253 12.8495 6.61183 12.8618 7.5295V8.5295C11.1044 8.57506 9.36309 8.18531 7.79283 7.39494C6.22256 6.60458 4.87213 5.43813 3.86182 3.9995C3.86182 3.9995 -0.138184 12.9995 8.86182 16.9995C6.80234 18.3975 4.34897 19.0984 1.86182 18.9995C10.8618 23.9995 21.7818 18.8949 21.7818 7.39494C21.7809 7.1164 21.8341 6.94309 21.7818 6.6695C22.8024 5.66299 23.5226 4.39221 23.8618 2.9995Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TwitterLinkWrapper = styled('div')`
  svg {
    stroke: ${(p) => p.theme.colors.blue};
    fill: none;
  }
`;

interface HeaderProps {
  sticky?: boolean;
  collapsableOnScroll?: boolean;
}
class Header extends React.Component<HeaderProps> {
  public static Wrapper = Wrapper;
  public static Logo = Logo;
  public static Title = Title;
  public static Navigation = Navigation;

  render() {
    const { children, collapsableOnScroll, sticky } = this.props;

    return (
      <Wrapper collapsableOnScroll={collapsableOnScroll} sticky={sticky}>
        {children}
      </Wrapper>
    );
  }
}

export interface MainHeaderProps {
  sticky?: boolean;
  collapsableOnScroll?: boolean;
  title?: string;
  search?: boolean;
  themeSwitcher?: boolean;
}

const DefaultHeader: React.FC<MainHeaderProps> = (props) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const theme = useTheme();

  return (
    <>
      {props.search ? (
        <SearchBox
          showOverride={showSearch}
          onClose={() => setShowSearch(false)}
        />
      ) : null}
      <Header
        sticky={props.sticky}
        collapsableOnScroll={props.collapsableOnScroll}
      >
        <Flex>
          <Header.Logo
            alt="Maxime Heckel's Blog logo"
            aria-label="Maxime Heckel's Blog"
          >
            <MHLogo />
          </Header.Logo>
          <Header.Title>{props.title}</Header.Title>
        </Flex>
        <Flex>
          <TwitterLinkWrapper>
            <OutboundLink
              className="h-card"
              data-testid="twitter-link"
              aria-label="Follow me on Twitter"
              title="Follow me on Twitter"
              rel="me"
              href="https://twitter.com/MaximeHeckel"
              style={{ textDecoration: 'underline' }}
            >
              <LinkButton
                aria-label="Follow me on Twitter"
                title="Follow me on Twitter"
              >
                <TwitterIcon />
              </LinkButton>
            </OutboundLink>
          </TwitterLinkWrapper>
          {props.search ? (
            <CommandCenterButton
              theme={theme}
              isSearchShown={showSearch}
              onClick={() => setShowSearch(true)}
            />
          ) : null}
          {props.themeSwitcher && Object.keys(theme).length > 0 ? (
            <LightDarkSwitcher theme={theme} />
          ) : null}
        </Flex>
      </Header>
    </>
  );
};
export default Header;
export { DefaultHeader, Logo, Navigation, Title, Wrapper };
