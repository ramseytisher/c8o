/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import "./layout.css"

const Header = styled.header`
  background: #f4e8c1;
  margin-bottom: 1.45rem;
`

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 760px;
  padding: 1.45rem 1.0875rem;
`

const MainContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.0875rem 1.45rem;
`

const H1 = styled.h1`
  margin: 0;
  text-align: center;
`

const Title = styled(Link)`
  color: #331e38;
  text-decoration: none;
`

const Footer = styled.footer`
  margin: 2rem;
  text-align: center;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header>
        <HeaderContainer>
          <H1>
            <Title to="/" style={{ textDecoration: `none` }}>
              {data.site.siteMetadata.title}
            </Title>
          </H1>
        </HeaderContainer>
      </Header>
      <MainContainer>
        <main>{children}</main>
      </MainContainer>
      <Footer>
        {new Date().getFullYear()}, Built for 🍲 🍽️ 😋
      </Footer>
    </>
  )
}

export default Layout
