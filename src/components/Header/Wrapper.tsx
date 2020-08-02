import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useScrollCounter from '../../hooks/useScrollCounter';
import styled from '../../utils/styled';
import { HeaderContext } from './Context';

export interface HeaderWrapperProps extends StyledHeaderWrapperProps {
  collapsableOnScroll?: boolean;
  collapseOffset?: number;
}

export const Wrapper: React.FC<HeaderWrapperProps> = (props) => {
  const collapsed = useScrollCounter(props.collapseOffset || 150);
  const shouldReduceMotion = useReducedMotion();
  const shouldCollapse = props.collapsableOnScroll ? collapsed : false;

  const memoizedContextValue = React.useMemo(
    () => ({
      collapsed: shouldCollapse,
      sticky: props.sticky || false,
    }),
    [props.sticky, shouldCollapse]
  );

  const variants = {
    open: {
      height: shouldReduceMotion ? 60 : 120,
    },
    collapsed: { height: 60 },
  };

  return (
    <HeaderContext.Provider value={memoizedContextValue}>
      <HeaderWrapper
        sticky={props.sticky}
        slim={shouldCollapse}
        initial={'open'}
        animate={shouldCollapse ? 'collapsed' : 'open'}
        variants={variants}
        transition={{ type: 'spring', stiffness: 80, damping: 50 }}
      >
        <HeaderContent>{props.children}</HeaderContent>
      </HeaderWrapper>
    </HeaderContext.Provider>
  );
};

interface StyledHeaderWrapperProps {
  slim?: boolean;
  sticky?: boolean;
}

const HeaderWrapper = styled(motion.div)<StyledHeaderWrapperProps>`
  @media (max-width: 700px) {
    height: 80px !important;
    box-shadow: ${(props) => (props.sticky ? props.theme.boxShadow : 'none')};
  }

  transition: background ${(props) => props.theme.transitionTime}s;
  background: ${(props) => props.theme.backgroundColor};
  width: 100%;
  border-top: 6px solid ${(props) => props.theme.colors.blue};
  position: ${(props) => (props.sticky ? 'fixed' : 'inherit')};
  z-index: 999;
  ${(props) =>
    props.slim
      ? `box-shadow: ${props.theme.boxShadow}; backdrop-filter: blur(6px); opacity: 0.88;`
      : ''}
`;

/**
 *  backdrop-filter: blur(6px); opacity: 0.88;
 */

const HeaderContent = styled.div`
  @media (max-width: 700px) {
    padding-left: 20px;
    padding-right: 20px;
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
