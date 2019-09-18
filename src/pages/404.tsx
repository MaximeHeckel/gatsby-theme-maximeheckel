import styled from '@emotion/styled';
import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import Button from '../components/Button';
import Seo from '../components/Seo';
import MainWrapper from '../layouts/MainWrapper';

const Main = styled.div`
  margin: 0 auto;
  max-width: 1430px;
  display: flex;
  height: calc(100vh);
  align-items: center;
  color: ${props => props.theme.fontColor};
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

const NotFoundPage = () => (
  <StaticQuery
    query={graphql`
      query NotFoundSiteTitle {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => {
      return (
        <MainWrapper>
          <Seo title={`404: Not found - ${data.site.siteMetadata.title}`} />
          <Main>
            <div>
              <h1>Oh no! You just got lost 😱</h1>
              <h2>
                Don't worry I got you!{' '}
                <Link to={`/`}>
                  <Button secondary={true}>Click here </Button>
                </Link>{' '}
                to go back home.
              </h2>
            </div>
          </Main>
        </MainWrapper>
      );
    }}
  />
);

export default NotFoundPage;
