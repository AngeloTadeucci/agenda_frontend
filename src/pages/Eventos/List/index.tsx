import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";

interface Evento {
  idevento: number;
  nome: string;
  datahora: string;
  idlocal: number;
  qtdparticipantes: number;
}

const ListEventos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([] as Evento[]);

  async function getLocal() {
    const response = await api.get("/evento");
    setEventos(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de evento</h1> <br/>
        <Link to="/"><h3><AiFillCaretLeft /> Voltar</h3></Link>
        {!loading ? (
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Data / Hora</th>
                  <th>ID Local</th>
                  <th>ID TipoContato</th>
                </tr>
                {eventos.map((evento) => (
                  <tr key={evento.idevento}>
                    <th>{evento.idevento}</th>
                    <th>{evento.nome}</th>
                    <th>{formatDate(evento.datahora)}</th>
                    <th>{evento.idlocal}</th>
                    <th>{evento.qtdparticipantes}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        ) : (
          <div>
            <br />
            <br />
            <br />
            <p>Loading..</p>
          </div>
        )}
      </form>
    </div>
  );
};

function formatDate(value: string) {
    var options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }; //hour: "numeric", minute: "numeric"
    return new Date(value).toLocaleDateString([], options);
}

export default ListEventos;
