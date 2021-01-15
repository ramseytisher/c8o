import React from "react"
import { Link, graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo.js"

const shortcodes = { Link }

const Container = styled.div`
  margin: 1rem 0rem;
`

const Title = styled.h2`
  text-align: center;
`

const Picture = styled(Img)`
  background: pink;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 20px;
  filter: drop-shadow(0 0 0.55rem #2E282A)
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding: 0rem 1rem;
`

// a good one: https://cucumber.io/blog/bdd/example-mapping-introduction/

export default ({ data }) => {
  const { title } = data.mdx.frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <Container>
        <Title>{title}</Title>
        <Picture fluid={data.mdx.fields.cover.childImageSharp.fluid} />
      </Container>
      <Content>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
      fields {
        cover {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
