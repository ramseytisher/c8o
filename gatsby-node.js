const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions, reporter }) => {
    const { createNodeField } = actions

    if (node.internal.type === 'Mdx') {
        const slug = createFilePath({ node, getNode, basePath: `recipe` })
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
        createNodeField({
            node,
            name: `cover`,
            value: `./images/cover.jpg`
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const recipeNodes = await graphql(`
        query {
      allMdx(filter: { fileAbsolutePath: { regex: "/content/recipes/" } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
    `)

    recipeNodes.data.allMdx.nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/recipe-template.jsx`),
            context: {
                id: node.id
            }
        })
    })
}