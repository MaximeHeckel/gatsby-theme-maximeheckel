import { motion } from 'framer-motion';
import styled from '../../utils/styled';

const LinkButton = styled(motion.button)`
  border-radius: var(--border-radius-1);
  width: 44px;
  height: 40px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;

  > * {
    margin-left: auto;
    margin-right: auto;
  }

  &:hover {
    background-color: var(--maximeheckel-colors-foreground);
  }
`;

export { LinkButton };
