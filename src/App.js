import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from "./components/GistList";

const App = () => {
  return (
    <Wrapper className="App" data-testid="app">
      <Header data-testid="header" />
      <GistList data-testid="gist-list" />
      <GlobalStyles data-testid="global-styles" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
