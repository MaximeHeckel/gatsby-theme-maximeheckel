import React from 'react';

const sectionize = (children: React.ReactElement<any>[]) =>
  React.Children.map(children, (child: React.ReactElement<any>) => {
    return child && child.props.mdxType === 'section'
      ? React.cloneElement(child, {
          id: `${child.props.children[0].props.id}-section`,
        })
      : child;
  });

export default sectionize;
