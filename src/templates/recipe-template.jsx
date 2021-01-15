import React from "react"
import { Link, graphql } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Img from "gatsby-image"

import Layout from "../components/layout"

const shortcodes = { Link }


// a good one: https://cucumber.io/blog/bdd/example-mapping-introduction/

export default ({ data }) => {
  return (
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>
      <Img fixed={data.mdx.fields.cover.childImageSharp.fixed} />
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
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
            fixed(width: 600) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
