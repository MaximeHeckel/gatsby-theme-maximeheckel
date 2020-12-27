import { FluidObject } from 'gatsby-image';
import React from 'react';
import Layout, { LayoutChildrenProps } from '../layouts';
import Hero from '../components/Hero';
import MDX from '../components/MDX';
import ProgressBar, { TableOfContentType } from '../components/ProgressBar';
import Seo from '../components/Seo';
import sectionize from '../utils/sectionize';

interface ProjectPortfolioProps {
  pageContext: {
    frontmatter: {
      title: string;
      subtitle?: string;
      slug: string;
    };
    tableOfContents?: TableOfContentType;
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };

  site: any;
}

const PortfolioProject: React.FC<ProjectPortfolioProps> = (props) => {
  const { pageContext } = props;
  const { frontmatter, cover, tableOfContents } = pageContext;
  const { slug, subtitle, title } = frontmatter;

  const childrenWithProps = sectionize(
    props.children as React.ReactElement<any>[]
  );

  const headerProps = {
    title,
    sticky: true,
    collapsableOnScroll: true,
  };

  return (
    <Layout footer={true} header={true} headerProps={headerProps}>
      {(layoutProps: LayoutChildrenProps) => {
        const { site } = layoutProps;
        const progressBarTarget = React.createRef<HTMLDivElement>();
        const SeoBanner = cover.childImageSharp.fluid.src;

        return (
          <article>
            <Seo
              title={`${title} - ${site.siteMetadata.title}`}
              desc={subtitle}
              article={false}
              banner={SeoBanner}
              pathname={slug + '/'}
            />
            <Hero id="top" style={{ maxWidth: '1020px' }}>
              <Hero.Title data-testid={`project-title-${title}`}>
                {title}
              </Hero.Title>
              {subtitle ? <Hero.Subtitle>{subtitle}</Hero.Subtitle> : null}
            </Hero>
            {cover ? (
              <Hero.Img
                imgStyle={{
                  borderRadius: 'var(--border-radius-2)',
                  margin: '0 auto',
                  maxHeight: '600px',
                  minHeight: '100px',
                }}
                fluid={cover.childImageSharp.fluid}
              />
            ) : null}
            <ProgressBar
              slim
              tableOfContents={tableOfContents}
              target={progressBarTarget}
            />
            <MDX ref={progressBarTarget} maxWidth={1020}>
              {childrenWithProps}
            </MDX>
          </article>
        );
      }}
    </Layout>
  );
};

export default PortfolioProject;
