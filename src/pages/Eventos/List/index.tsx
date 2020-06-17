import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner } from "react-bootstrap";

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
  const [qtdParticipantes, setQtdParticipantes] = useState("");
  const [locais, setLocal] = useState([] as Local[]);

  async function getEvento() {
    const response = await api.get("/evento");
    setEventos(response.data);
    setLoading(false);
  }

  async function getLocal() {
    const response = await api.get("/local");
    const locais = response.data;
    setLocal(locais);
  }

  async function deleteEvento(e: FormEvent, idEvento: number, nome: string) {
    e.preventDefault();
    const response = await api.delete(`/evento/${idEvento}`);
    if (response.data.message !== "Erro") {
      alert(`Evento ${nome} deletado com sucesso.`);
      window.location.reload(true);
    } else {
      alert(`Erro ao exluir evento.\n${response.data.error.detail}`);
    }
  }

  async function insertEvento(e: FormEvent) {
    e.preventDefault();
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
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Data / Hora</th>
                    <th>ID Local</th>
                    <th>Qtd Participantes</th>
                    <th></th>
                  </tr>
                  {eventos.map((evento) => (
                    <tr key={evento.idevento}>
                      <th>{evento.idevento}</th>
                      <th>{evento.nome}</th>
                      <th>{formatDate(evento.datahora)}</th>
                      <th>{evento.idlocal}</th>
                      <th>{evento.qtdparticipantes}</th>
                      <th>
                        <button
                          onClick={(e) => {
                            deleteEvento(e, evento.idevento, evento.nome);
                          }}
                        >
                          Apagar
                        </button>
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
        <h2>Cadastrar:</h2>
        <br />
        <br />
        <div className="field-group">
          <div className="field">
            <label htmlFor="Nome">Nome do evento</label>
            <input onChange={(text) => setNome(text.currentTarget.value)} type="text" name="nome" id="nome" />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="data">Data / Hora</label>
            <input onChange={(text) => setDataHora(text.currentTarget.value)} type="text" name="hora" id="hora" />
          </div>
          <div className="field">
            <label htmlFor="Local">Local</label>
            <select onChange={(text) => setIdLocal(text.currentTarget.value)} name="cidades" id="cidades">
              {locais.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.endereco}, {local.numero} - {local.cidade}/{local.estado}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="participantes">Participantes</label>
            <input
              onChange={(text) => setQtdParticipantes(text.currentTarget.value)}
              type="text"
              name="participantes"
              id="participantes"
            />
          </div>
        </div>
        <button onClick={(e) => insertEvento(e)}>Cadastrar</button>
      </form>
    </div>
  );
};

function formatDate(value: string) {
  var options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }; //hour: "numeric", minute: "numeric"
  return new Date(value).toLocaleDateString([], options);
}

export default ListEventos;
