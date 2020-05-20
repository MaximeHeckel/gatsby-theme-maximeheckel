const path = require('path');

module.exports = () => {
  return {
    plugins: [
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          defaultLayouts: {
            default: require.resolve('./src/templates/BlogPost.tsx'),
            posts: require.resolve('./src/templates/BlogPost.tsx'),
            projects: require.resolve('./src/templates/PortfolioProject.tsx'),
            snippets: require.resolve('./src/templates/Snippet.tsx'),
          },
          remarkPlugins: [require('remark-toc')],
          gatsbyRemarkPlugins: [
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 900,
                backgroundColor: 'transparent',
                showCaptions: true,
              },
            },
            'gatsby-remark-copy-linked-files',
            'gatsby-remark-sectionize',
            {
              resolve: 'gatsby-remark-autolink-headers',
              options: {
                icon: `<svg style="width: 0px; height: 0px;"></svg>`,
              },
            },
          ],
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
      {
        resolve: 'gatsby-plugin-typography',
        options: {
          pathToConfigModule: './src/utils/typography',
        },
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: path.resolve(__dirname, `src/pages`),
        },
      },
      'gatsby-plugin-emotion',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-twitter',
    ],
  };
};
