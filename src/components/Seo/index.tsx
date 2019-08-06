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
        siteLanguage
        siteUrl: url
        pathPrefix
        defaultDescription: description
        twitter
      }
    }
  }
`;

interface ISEOProps {
  title?: string | undefined;
  desc?: string | undefined;
  banner?: string | undefined;
  pathname?: string | undefined;
  article?: boolean;
}

const SEO = ({ title, desc, banner, pathname, article }: ISEOProps) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        buildTime,
        siteMetadata: {
          defaultTitle,
          titleAlt,
          shortName,
          author,
          siteLanguage,
          logo,
          siteUrl,
          keywords,
          pathPrefix,
          defaultDescription,
          defaultBanner,
          twitter,
        },
      },
    }) => {
      const seo = {
        description: defaultDescription || desc,
        image:
          banner || defaultBanner
            ? `${siteUrl}${banner || defaultBanner}`
            : `${siteUrl}`,
        title: title || defaultTitle,
        url: `${siteUrl}${pathname || '/'}`,
      };
      const realPrefix = pathPrefix === '/' ? '' : pathPrefix;
      let schemaOrgJSONLD = [
        {
          '@context': 'http://schema.org',
          '@id': siteUrl,
          '@type': 'WebSite',
          alternateName: titleAlt || '',
          name: defaultTitle,
          url: siteUrl,
        },
      ];
      if (article) {
        schemaOrgJSONLD = [
          {
            '@context': 'http://schema.org',
            '@id': seo.url,
            '@type': 'ProjectCaseStudy',
            alternateName: titleAlt || '',
            // @ts-ignore
            author: {
              '@type': 'Person',
              name: author,
            },
            dateModified: buildTime,
            datePublished: buildTime,
            description: seo.description,
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: seo.image,
            },
            isPartOf: siteUrl,
            mainEntityOfPage: {
              '@id': siteUrl,
              '@type': 'WebSite',
            },
            name: title,
            publisher: {
              '@type': 'Organization',
              logo: {
                '@type': 'ImageObject',
                url: siteUrl + realPrefix + logo,
              },
              name: author,
            },
            url: seo.url,
          },
        ];
      }
      return (
        <Helmet title={seo.title}>
          <html lang={siteLanguage} />
          <meta name="description" content={seo.description} />
          <meta
            name="keywords"
            content={keywords && keywords.length > 0 ? keywords.join(`, `) : ''}
          />
          <meta name="image" content={seo.image} />
          <meta name="apple-mobile-web-app-title" content={shortName} />
          <meta name="application-name" content={shortName} />
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={twitter} />
          <meta name="twitter:title" content={author} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
        </Helmet>
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
