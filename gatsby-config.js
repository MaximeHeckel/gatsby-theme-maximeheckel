module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayout: require.resolve("./src/layouts/index.tsx"),
        mdPlugins: [require("remark-toc")],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              sizeByPixelDensity: true
            }
          },
          { resolve: "gatsby-remark-autolink-headers" }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "./src/utils/typography"
      }
    },
    "gatsby-plugin-emotion"
  ]
};
