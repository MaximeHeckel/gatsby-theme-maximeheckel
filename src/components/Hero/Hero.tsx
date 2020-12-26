import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import styled from '@emotion/styled';

const HeroImgWrapper = styled.div`
  @media (max-width: 700px) {
    position: relative;
    left: calc(-50vw + 50%);
    position: a;
    width: 100vw;
  }
  max-width: 880px;
  margin-bottom: 30px;
`;

interface HeroImgProps {
  className?: string;
  fluid: FluidObject;
  imgStyle: Record<string, string>;
}

const HeroImg: React.FC<HeroImgProps> = (props) => (
  <HeroImgWrapper>
    <Img
      className={props.className}
      imgStyle={props.imgStyle}
      fluid={props.fluid}
    />
  </HeroImgWrapper>
);

const HeroInfo = styled.div`
  margin-bottom: 30px;
  p {
    color: var(--maximeheckel-colors-typeface-2);
    font-size: 14px;
    font-weight: 500;
  }
`;

const HeroSubtitle = styled.h3``;

const HeroTitle = styled.h1`
  @media (max-width: 700px) {
    font-size: 36px;
  }
`;

const HeroWrapper = styled.div`
  @media (max-width: 700px) {
    padding: 150px 0px 30px 0px;
  }

  margin: 0 auto;
  max-width: 700px;
  align-items: center;
  color: var(--maximeheckel-colors-typeface-0);
  padding-top: 248px;
`;

class Hero extends React.Component<{ id?: string; style?: object }> {
  public static Img = HeroImg;
  public static Info = HeroInfo;
  public static Subtitle = HeroSubtitle;
  public static Title = HeroTitle;

  render() {
    const { id, children, style } = this.props;
    return (
      <HeroWrapper data-testid="hero" id={id} style={style}>
        {children}
      </HeroWrapper>
    );
  }
}

export { Hero };
