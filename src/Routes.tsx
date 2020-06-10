import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContatos from "./pages/Contatos/List";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={ListContatos} path="/contatos/list" />
    </BrowserRouter>
  );
};

export default Routes;
