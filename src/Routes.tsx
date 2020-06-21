import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContatos from "./pages/Contatos/List";
import ListEventos from "./pages/Eventos/List";
import ListLocais from "./pages/Locais/List";
import ListTiposContato from "./pages/tipoContato/List";
import ListParticipantes from "./pages/Participantes/List";
import EditEvento from "./pages/Eventos/Edit";
import EditContato from "./pages/Contatos/Edit";
import EditLocal from "./pages/Locais/Edit";
import EditTipoContato from "./pages/tipoContato/Edit";
import EditParticipante from "./pages/Participantes/Edit";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />

      <Route component={ListContatos} path="/contatos/list" />
      <Route component={EditContato} path="/contatos/edit/" />

      <Route component={ListEventos} path="/eventos/list"/>
      <Route component={EditEvento} path="/eventos/edit/"/>

      <Route component={ListLocais} path="/locais/list"/>
      <Route component={EditLocal} path="/locais/edit/"/>


      <Route component={ListTiposContato} path="/tiposContato/list"/>
      <Route component={EditTipoContato} path="/tiposContato/edit/"/>


      <Route component={ListParticipantes} path="/participantes/list"/>
      <Route component={EditParticipante} path="/participantes/edit/"/>


    </BrowserRouter>
  );
};

export default Routes;
