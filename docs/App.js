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
  "!body": {
    fontSize: "22px",
  },
  "& a, & span": {
      color: "gold",
      animation: "spin 50s infinite",
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
  },
  "& #helloworld:before": {
    content: " ",
    display: "inline-block",
    height: "15px",
    width: "15px",
    background: "red",
  },
  "& .hello:after": {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    content: " ",
    width: "100%",
    height: "100%",
    opacity: .5,
    background: "red",
    animation: "sliding 0.5s linear infinite",
    transform: "translateZ(0)",
    willChange: "background-position",
    backgroundSize: "25px 100%",
    zIndex: 1000000,
    outline: "3px solid #dbcba3",
  },
}))

const App = props => (
  <ThemeProvider theme={theme}>
      <Root>
          <Container>
              <Footer />
              <a title={"Title"} className={"hello"} id={"helloworld"} href="#">Hello world</a>
              <span>Foo bar</span>
          </Container>
      </Root>
  </ThemeProvider>
)

export default App
