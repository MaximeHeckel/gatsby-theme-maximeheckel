import { motion } from 'framer-motion';
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styled from '../../utils/styled';
import { HeaderContext } from './Context';

export const TitleWrapper = styled.h3`
  @media (max-width: 900px) {
    max-width: 400px;
  }

  @media (max-width: 800px) {
    max-width: 300px;
    margin-left: 20px;
  }

  @media (max-width: 700px) {
    display: none;
  }

  display: block;
  margin: 0;
  margin-left: 33px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.fontColor};

  a {
    color: ${(props) => props.theme.fontColor};
    text-decoration: none;
  }
`;

const variants = {
  hide: {
    y: 150,
  },
  show: {
    y: 0,
  },
};

export interface HeaderTitleProps {}

export const Title: React.FC<HeaderTitleProps> = (props) => {
  const { collapsed, sticky } = React.useContext(HeaderContext);

  return (
    <TitleWrapper>
      {props.children ? (
        <div data-testid="header-title">
          {sticky ? (
            <motion.div
              initial="hide"
              variants={variants}
              animate={collapsed ? 'show' : 'hide'}
              transition={{ type: 'spring', stiffness: 35 }}
            >
              <AnchorLink offset="150" href="#top">
                {props.children}
              </AnchorLink>
            </motion.div>
          ) : null}
        </div>
      ) : null}
    </TitleWrapper>
  );
};
