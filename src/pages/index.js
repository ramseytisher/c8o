import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    <h1>Enjoy!</h1>
    <div>
      {data.pages.nodes.map(({ id, frontmatter, fields }) => (
        <div>
          <Link to={fields.slug}>{frontmatter.title}</Link>
        </div>
      ))}
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query {
    pages: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/recipes/" } }
    ) {
      nodes {
        id
        fileAbsolutePath
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
  }
`
