import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import Header from '../';

describe('Header', () => {
  beforeEach(cleanup);

  it('renders the header without the site title or the post title or theme switcher', () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId('header-post-title')).toBeNull();
    expect(queryByTestId('darkmode-switch')).toBeNull();
  });

  it('renders the header with the site title', () => {
    const { queryByTestId } = render(<Header siteTitle="Maxime Heckel" />);
    expect(queryByTestId('header-post-title')).toBeNull();
    expect(queryByTestId('darkmode-switch')).toBeNull();
  });

  it('renders the header with links', () => {
    // tslint:disable-next-line:one-variable-per-declaration
    const Links = () => (
      <React.Fragment>
        <a href="/" data-testid="blog-link">
          Blog
        </a>
        <a href="/" data-testid="twitter-link">
          Twitter
        </a>
      </React.Fragment>
    );
    const { getByTestId } = render(<Header links={<Links />} />);
    expect(getByTestId('blog-link')).toBeDefined();
    expect(getByTestId('twitter-link')).toBeDefined();
  });

  it('renders the header with the theme switcher', () => {
    const { queryByTestId, getByTestId } = render(
      <Header themeSwitcher={{ dark: false, toggleDark: () => null }} />
    );
    expect(queryByTestId('header-post-title')).toBeNull();
    expect(getByTestId('darkmode-switch')).toBeDefined();
  });

  it('clicking on the theme switcher calls the toggle dark function', () => {
    const mockToggleDark = jest.fn();
    const { getByTestId } = render(
      <Header themeSwitcher={{ dark: false, toggleDark: mockToggleDark }} />
    );
    fireEvent.click(getByTestId('darkmode-switch'));
    expect(mockToggleDark).toHaveBeenCalled();
  });
});
