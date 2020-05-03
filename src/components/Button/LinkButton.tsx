import styled from '../../utils/styled';

const LinkButton = styled('button')`
  border-radius: 4px;
  padding: 4px 10px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
  transition: 0.4s;

  > * {
    margin-left: auto;
    margin-right: auto;
  }

  &:hover {
    background-color: ${(p) => p.theme.foregroundColor};
  }
`;

export { LinkButton };
