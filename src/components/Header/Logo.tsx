import { Link } from 'gatsby';
import React from 'react';

export interface HeaderLogoProps {
  ['aria-label']: string;
  alt: string;
  style?: Record<string, string>;
}

export const Logo: React.FC<HeaderLogoProps> = (props) => {
  const child = props.children
    ? React.cloneElement(props.children as React.ReactElement<any>, {
        ...props,
        ['data-testid']: 'header-logo',
        ['aria-label']: props['aria-label'],
        alt: props.alt,
        // size: sticky && collapsed ? 50 : 60,
        size: 50,
      })
    : null;

  return (
    <Link
      to="/"
      aria-label="Go back to article list"
      title="Go back to article list"
    >
      {child}
    </Link>
  );
};
