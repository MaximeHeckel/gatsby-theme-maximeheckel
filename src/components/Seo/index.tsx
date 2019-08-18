import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        titleAlt
        shortName
        author
        keywords
        siteUrl: url
        defaultDescription: description
        twitter
      }
    }
  }
`;

interface ISEOProps {
  article?: boolean;
  banner?: string | undefined;
  desc?: string | undefined;
  pathname?: string | undefined;
  title?: string | undefined;
}

const SEO = ({ title, desc, banner, pathname, article }: ISEOProps) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          siteUrl,
          keywords,
          defaultDescription,
          twitter,
        },
      },
    }) => {
      const seo = {
        description: desc || defaultDescription,
        image: banner ? `${siteUrl}${banner}` : '',
        title: title || defaultTitle,
        url: `${siteUrl}/${
          pathname ? `${article ? 'posts' : 'projects'}/${pathname}` : ''
        }`,
      };

      const meta = [
        {
          content: keywords && keywords.length > 0 ? keywords.join(`, `) : '',
          name: 'keywords',
        },
        {
          content: 'summary_large_image',
          name: 'twitter:card',
        },
        {
          content: seo.title,
          name: 'twitter:title',
        },
        {
          content: seo.description,
          name: 'twitter:description',
        },
        { name: 'twitter:site', content: twitter },
        {
          content: seo.description,
          name: 'description',
        },
      ];

      if (seo.image) {
        meta.push({
          content: seo.image,
          name: 'twitter:image',
        });
      }

      return (
        <Helmet title={seo.title} meta={meta} />
        // <Helmet title={seo.title}>
        //   <meta name="description" content={seo.description} />
        //   <meta name="image" content={seo.image} />
        //   {seo.url && <meta property="og:url" content={seo.url} />}
        //   {(article ? true : null) && (
        //     <meta property="og:type" content="article" />
        //   )}
        //   <meta
        //     name="keywords"
        //     content={keywords && keywords.length > 0 ? keywords.join(`, `) : ''}
        //   />
        //   {seo.title && <meta property="og:title" content={seo.title} />}
        //   {seo.description && (
        //     <meta property="og:description" content={seo.description} />
        //   )}
        //   {seo.image && <meta property="og:image" content={seo.image} />}
        //   <meta name="twitter:card" content="summary_large_image" />
        //   {twitter && <meta name="twitter:creator" content={twitter} />}
        //   {twitter && <meta name="twitter:site" content={twitter} />}
        //   {seo.title && <meta name="twitter:title" content={seo.title} />}
        //   {seo.description && (
        //     <meta name="twitter:description" content={seo.description} />
        //   )}
        //   {seo.image && <meta name="twitter:image" content={seo.image} />}
        // </Helmet>
      );
    }}
  />
);

SEO.defaultProps = {
  article: false,
  banner: null,
  desc: null,
  pathname: null,
  title: null,
};

export default SEO;
