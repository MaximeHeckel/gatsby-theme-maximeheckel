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
  article?: boolean;
  banner?: string | undefined;
  date?: string | undefined;
  desc?: string | undefined;
  pathname?: string | undefined;
  title?: string | undefined;
}

const SEO = ({ title, desc, banner, pathname, article, date }: ISEOProps) => (
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
          twitter,
        },
      },
    }) => {
      const seo = {
        description: desc || defaultDescription,
        image: banner ? `${siteUrl}${banner}` : '',
        title: title || defaultTitle,
        url: `${siteUrl}/${`${pathname}/` || ''}`,
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
            datePublished: date || buildTime,
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
          {/* Open Graph*/}
          <meta property="og:url" content={seo.url} data-react-helmet="true" />
          <meta property="og:title" content={title} data-react-helmet="true" />
          <meta
            property="og:description"
            content={seo.description}
            data-react-helmet="true"
          />
          {/* Twitter Card */}
          <meta
            name="twitter:card"
            content={seo.image === '' ? 'summary' : 'summary_large_image'}
          />
          <meta name="twitter:creator" content={twitter} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
          <meta name="twitter:site" content={twitter} />
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
