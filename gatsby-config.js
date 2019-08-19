const path = require('path');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/layouts/index.tsx'),
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
          'gatsby-remark-embedder',
          'gatsby-remark-embed-gist',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: `<svg style="width: 0px; height: 0px;"></svg>`,
            },
          },
        ],
        plugins: ['gatsby-remark-images'],
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
