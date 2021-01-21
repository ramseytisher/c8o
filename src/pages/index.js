import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Box = styled.div`
  margin: 2rem auto;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  position: relative;
  margin: 10px;
`

const Image = styled(Img)`
  height: 300px;
  width: 300px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  @media (max-width: 500px) {
    width: 95vw;
  }
`

const Banner = styled.div`
  background: rgba(250, 240, 202, 0.7);
  position: absolute;
  left: 0;
  right: 0;
  top: 70%;
  margin: 0 auto;
  width: 90%;
  height: 25%;
  text-align: center;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const Text = styled.h3`
  opacity: 1;
  color: #293241;
  margin: 0;
`

const Input = styled.input`
  text-align: center;
  margin-right: 10px;
  width: 60%;
  height: 2rem;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  transition: width 0.4s ease-in-out;
  :focus {
    width: 80%;
    height: 2.5rem;
  }
`

const IndexPage = ({ data }) => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState(data.pages.nodes)

  useEffect(() => {
    console.log("Search is: ", search)
    if (search) {
      let found = data.pages.nodes.filter(({ frontmatter }) => {
        const str =
          frontmatter.title.toString().toUpperCase() +
          frontmatter.tags.toString().toUpperCase()
        return str.includes(search.trim().toUpperCase())
      })
      setResults(found)
    } else {
      console.log("No Search")
      setResults(data.pages.nodes)
    }
  }, [data.pages.nodes, search])

  return (
    <Layout>
      <SEO />
      <SearchContainer>
        <Input onChange={e => setSearch(e.target.value)} value={search} />
        <button onClick={() => setSearch("")}>clear</button>
      </SearchContainer>
      <Box>
        {results.map(({ id, frontmatter, fields }) => (
          <Card>
            <Link to={fields.slug}>
              <Image fluid={fields.cover.childImageSharp.fluid} />
              <Banner>
                <Text>{frontmatter.title}</Text>
              </Banner>
            </Link>
          </Card>
        ))}
      </Box>
    </Layout>
  )
}

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
          tags
        }
        fields {
          slug
          cover {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
