import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface Evento {
  idevento: number;
  nome: string;
  datahora: string;
  idlocal: number;
  qtdparticipantes: number;
}

interface Local {
  id: number;
  cep: string;
  endereco: string;
  numero: number;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
}

const ListEventos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([] as Evento[]);

  const [nome, setNome] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [idLocal, setIdLocal] = useState("");
  const [locais, setLocal] = useState([] as Local[]);
  const date = new Date();

  async function getEvento() {
    const response = await api.get("/evento");
    setEventos(response.data);
  }

  async function getLocal() {
    const response = await api.get("/local");
    const locais = response.data;
    setLocal(locais);
    setLoading(false);
  }

  async function insertEvento(e: FormEvent) {
    e.preventDefault();
    if (nome === "") {
      return alert(`Dê um nome ao evento.`);
    }
    if (dataHora === "") {
      return alert(`Escolha uma hora e data para o evento.`);
    }
    if (idLocal === "" || idLocal === "nulo") {
      return alert(`Escolha um local!`);
    }
    const qtdParticipantes = 0;
    const response = await api.post("/evento", {
      nome,
      dataHora,
      idLocal,
      qtdParticipantes,
    });
    if (response.data.message !== "Erro") {
      alert(`Evento adicionado: ${nome}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao adicionar evento.\n${response.data.error.detail}`);
    }
  }

  useEffect(() => {
    getEvento();
    getLocal();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de evento</h1> <br />
        <Link to="/">
          <h4>
            <AiFillCaretLeft /> Voltar
          </h4>
        </Link>
        {!loading ? (
          <fieldset>
            {eventos.length > 0 ? (
              <table>
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <th>Data / Hora</th>
                    <th>ID Local</th>
                    <th>Qtd Participantes</th>
                    <th></th>
                  </tr>
                  {eventos.map((evento) => (
                    <tr key={evento.idevento}>
                      <th>{evento.nome}</th>
                      <th>{formatDate(evento.datahora)}</th>
                      <th>
                        {locais.map((local) =>
                          local.id === evento.idlocal ? `${local.endereco} - ${local.numero}` : null
                        )}
                      </th>
                      <th>{evento.qtdparticipantes}</th>
                      <th>
                        <Link to={`/eventos/edit/?id=${evento.idevento}`}>
                          <Button variant="danger">Editar</Button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>A agenda não possui contatos cadastrados.</p>
            )}
          </fieldset>
        ) : (
          <div>
            <br />
            <br />
            <Spinner animation="border" variant="dark" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        <br />
        <br />
        <br />
        <div>
          <h2>Cadastrar:</h2>
          <br />
          <br />
          <div className="field-group">
            <div className="field">
              <label htmlFor="Nome">Nome do evento</label>
              <input onChange={(text) => setNome(text.currentTarget.value.trim())} type="text" name="nome" id="nome" />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="data">Data / Hora</label>
              <input
                onChange={(text) => setDataHora(text.currentTarget.value.trim())}
                type="datetime-local"
                min={date.toISOString().substr(0, date.toISOString().length - 8)}
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}"
                name="hora"
                id="hora"
              />
            </div>
            <div className="field">
              <label htmlFor="Local">Local</label>
              <select
                defaultValue="DEFAULT"
                onChange={(text) => setIdLocal(text.currentTarget.value.trim())}
                name="cidades"
                id="cidades"
              >
                <option key="DEFAULT" value="nulo">
                  -- Escolha um local --
                </option>
                {locais.map((local) => (
                  <option key={local.id} value={local.id}>
                    {local.endereco}, {local.numero} - {local.cidade}/{local.estado}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button variant="success" onClick={(e: React.FormEvent<Element>) => insertEvento(e)}>
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

function formatDate(value: string) {
  var options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }; //hour: "numeric", minute: "numeric"
  return new Date(value).toLocaleDateString([], options);
}

export default ListEventos;
