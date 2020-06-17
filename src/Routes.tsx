import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContatos from "./pages/Contatos/List";
import ListEventos from "./pages/Eventos/List";
import ListLocais from "./pages/Locais/List";
import ListTiposContato from "./pages/tipoContato/List";
import ListParticipantes from "./pages/Participantes/List";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={ListContatos} path="/contatos/list" />
      <Route component={ListEventos} path="/eventos/list"/>
      <Route component={ListLocais} path="/locais/list"/>
      <Route component={ListTiposContato} path="/tiposContato/list"/>
      <Route component={ListParticipantes} path="/participantes/list"/>
    </BrowserRouter>
  );
};

export default Routes;
