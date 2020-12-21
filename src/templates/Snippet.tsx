import React from 'react';
import Layout, { LayoutChildrenProps } from '../layouts';
import MDX from '../components/MDX';
import Seo from '../components/Seo';
import { FluidObject } from 'gatsby-image';
import styled from '../utils/styled';
import { MONTHS } from '../constants';
import Flex from '../components/Flex';
import Pill from '../components/Pill';

interface SnippetProps {
  pageContext: {
    frontmatter: {
      title: string;
      description?: string;
      created: string;
      slug: string;
      language: string;
    };
    snippetImage: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  site: any;
}

const Snippet: React.FC<SnippetProps> = (props) => {
  const { pageContext } = props;
  const { frontmatter, snippetImage } = pageContext;
  const { created, slug, title, description, language } = frontmatter;
  const ref = React.createRef<HTMLDivElement>();

  return (
    <Layout
      footer={false}
      header={true}
      headerProps={{ search: true, rss: true }}
    >
      {(layoutProps: LayoutChildrenProps) => {
        const { site } = layoutProps;
        const parsedDate = new Date(created);

        return (
          <article className="h-entry">
            <Seo
              title={`${title} - ${site.siteMetadata.title}`}
              desc={description}
              banner={snippetImage.childImageSharp.fluid.src}
              article={true}
              pathname={slug + '/'}
              date={created}
            />
            <FixPadding>
              <h2>{title}</h2>
              <Flex>
                <p>
                  Created {MONTHS[parsedDate.getMonth()]} {parsedDate.getDate()}{' '}
                  {parsedDate.getFullYear()}
                </p>
                <Pill color="#5184f9" text={language.toUpperCase()} />
              </Flex>
              <FixMargin>
                <MDX ref={ref} maxWidth={880}>
                  {props.children}
                </MDX>
              </FixMargin>
            </FixPadding>
          </article>
        );
      }}
    </Layout>
  );
};

const FixMargin = styled('div')`
  margin-top: -30px;
`;

const FixPadding = styled('div')`
  padding-top: 35px;

  p {
    color: var(--maximeheckel-colors-typeface-2);
    font-size: 14px;
    font-weight: 500;
  }
`;

export default Snippet;
