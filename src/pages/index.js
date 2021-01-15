import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Container = styled.div`
  margin: 2rem auto;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const RecipeLink = styled.div`
  padding: 20px;
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    <Container>
      {data.pages.nodes.map(({ id, frontmatter, fields }) => (
          <Link to={fields.slug}>
            <RecipeLink>
              {frontmatter.title}
              <br />
              <Img fixed={fields.cover.childImageSharp.fixed} />
            </RecipeLink>
          </Link>
      ))}
    </Container>
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
          cover {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
