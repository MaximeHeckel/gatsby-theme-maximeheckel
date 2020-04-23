import styled from '../../utils/styled';

const Flex = styled.div<{ justifyContent?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${(p) => p.justifyContent || 'flex-start'};

  * {
    margin-bottom: 0px;
    margin-right: 5px;
  }
`;

export default Flex;
