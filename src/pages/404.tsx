import { Link } from 'gatsby';
import React from 'react';
import Button from '../components/Button';
import Seo from '../components/Seo';
import Layout, { LayoutChildrenProps } from '../layouts';
import styled from '../utils/styled';

const NotFoundPage = () => (
  <Layout>
    {(layoutProps: LayoutChildrenProps) => {
      return (
        <>
          <Seo
            title={`404: Not found - ${layoutProps.site.siteMetadata.title}`}
          />
          <Wrapper>
            <div>
              <h1>Oh no! You just got lost 😱</h1>
              <h2>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't worry I got you!{' '}
                <Link to={`/`}>
                  <Button secondary={true}>Click here </Button>
                </Link>{' '}
                to go back home.
              </h2>
            </div>
          </Wrapper>
        </>
      );
    }}
  </Layout>
);

export default NotFoundPage;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1430px;
  display: flex;
  height: calc(100vh);
  align-items: center;
  color: ${(props) => props.theme.fontColor};
  padding: 0px 70px;

  @media (max-width: 700px) {
    padding: 0px 30px;
  }

  h2 {
    line-height: 34px;
  }

  * > a {
    color: inherit;
    text-decoration: none;
  }
`;
