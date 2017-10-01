import React from 'react'
import cxs from 'cxs/component'
import ThemeProvider from 'cxs/ThemeProvider'
import theme from './theme'
import Container from './Container'
import Header from './Header'
import About from './About'
import Usage from './Usage'
import CTA from './CTA'
import Footer from './Footer'

const Root = cxs('div')(props => ({
  fontFamily: '"Roboto Mono", Menlo, monospace',
  color: props.theme.colors.blue,
  lineHeight: 1.5,
  "& a, & span": {
      color: "gold",
      animation: "spin 5s infinite",
  },
  "@keyframes spin": {
      from: {
          color: props.theme.colors.blue,
          fontSize: "11px",
      },
      to: {
          color: "red",
          fontSize: "16px",
      },
  }
}))

const App = props => (
  <ThemeProvider theme={theme}>
      <Root>
          <Container>
              <Footer />
              <a href="#">Hello world</a>
              <span>Foo bar</span>
          </Container>
      </Root>
  </ThemeProvider>
)

export default App
