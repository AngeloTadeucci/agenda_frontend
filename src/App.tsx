import React from "react";
import "./App.scss";
import Routes from "./Routes";
import { ThemeProvider, DefaultTheme } from "styled-components";
import light from "./Styles/Themes/light";
import dark from "./Styles/Themes/dark";
import GlobalStyle from "./Styles/Global";
import usePersistedState from "./Utils/usePersistedState";

const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      
      <Routes theme={theme} toggleTheme={toggleTheme}/>
    </ThemeProvider>
  );
};

export default App;
