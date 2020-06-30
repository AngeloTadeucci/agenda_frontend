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
import { DefaultTheme } from "styled-components";
interface Props {
  theme: DefaultTheme;
  toggleTheme(): void;
}

const Routes: React.FC<Props> = ({theme, toggleTheme}) => {
  return (
    <BrowserRouter>
      <Route path="/" exact >
        <Home theme={theme} toggleTheme={toggleTheme}/>
      </Route>

      <Route path="/contatos/list" >
        <ListContatos/>
      </Route>
      <Route path="/contatos/edit/" >
        <EditContato/>
      </Route>

      <Route path="/eventos/list">
        <ListEventos/>
      </Route>
      <Route path="/eventos/edit/">
        <EditEvento/>
      </Route>

      <Route path="/locais/list">
        <ListLocais/>
      </Route>
      <Route path="/locais/edit/">
        <EditLocal/>
      </Route>


      <Route path="/tiposContato/list">
        <ListTiposContato/>
      </Route>
      <Route path="/tiposContato/edit/">
        <EditTipoContato/>
      </Route>


      <Route path="/participantes/list">
        <ListParticipantes/>
      </Route>
      <Route path="/participantes/edit/">
        <EditParticipante/>
      </Route>


    </BrowserRouter>
  );
};

export default Routes;
