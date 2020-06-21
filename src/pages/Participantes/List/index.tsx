import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";

interface Participante {
  idevento: number;
  idcontato: number;
  confirmacao: number;
}

interface Evento {
  idevento: number;
  nome: string;
  datahora: string;
  idlocal: number;
  qtdparticipantes: number;
}

interface Contato {
  idcontato: number;
  nome: string;
  email: string;
  telefone: string;
  idlocal: number;
  idtipocontato: number;
}

const ListParticipantes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [participantes, setParticipantes] = useState([] as Participante[]);

  const [idEvento, setIdEvento] = useState(0);
  const [idContato, setIdContato] = useState(0);
  const [confirmacao, setConfirmacao] = useState(0);

  const [eventos, setEventos] = useState([] as Evento[]);
  const [contatos, setContatos] = useState([] as Contato[]);

  async function getParticipantes() {
    const response = await api.get("/participantesEvento");
    setParticipantes(response.data);
    setLoading(false);
  }
  async function getContato() {
    const response = await api.get("/contato");
    setContatos(response.data);
  }
  async function getEvento() {
    const response = await api.get("/evento");
    setEventos(response.data);
  }

  async function insertParticipante(e: FormEvent) {
    e.preventDefault();
    const response = await api.post("/participantesEvento", {
      idEvento,
      idContato,
      confirmacao,
    });
    if (response.data.message !== "Erro") {
      alert(`Participante ${idContato} adicionado no evento ${idEvento}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao adicionar\n${response.data.error.detail}`);
    }
  }

  useEffect(() => {
    getParticipantes();
    getContato();
    getEvento();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista participantes</h1>
        <br />
        <Link to="/">
          <h3>
            <AiFillCaretLeft /> Voltar
          </h3>
        </Link>
        {!loading ? (
          <fieldset>
            {participantes.length > 0 ? (
              <table>
                <tbody>
                  <tr>
                    <th>Contato</th>
                    <th>Evento</th>
                    <th>Confirmação</th>
                    <th></th>
                  </tr>
                  {participantes.map((participante) => (
                    <tr key={participante.idcontato}>
                      <th>
                        {contatos.map((contato) =>
                          contato.idcontato === participante.idcontato ? `${contato.nome}` : null
                        )}
                      </th>
                      <th>
                        {eventos.map((evento) => (evento.idevento === participante.idevento ? `${evento.nome}` : null))}
                      </th>
                      <th>{participante.confirmacao === 1 ? "Sim" : "Não"}</th>
                      <th>
                        <Link
                          to={`/participantes/edit/?evento=${participante.idevento}&contato=${participante.idcontato}`}
                        >
                          <Button
                            variant="danger"
                            // onClick={(e: React.FormEvent<Element>) => {
                            //   deleteParticipantes(e, participante.idevento, participante.idcontato);
                            // }}
                          >
                            Editar
                          </Button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum participantes</p>
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
        <br />
        <div className="field-group">
          <div className="field">
            <label htmlFor="idevento">Eventos</label>
            <select
              onChange={(text) => setIdEvento(Number(text.currentTarget.value.trim()))}
              defaultValue=""
              name="idevento"
              id="idevento"
            >
              <option value="">-- Escolha o evento --</option>
              {eventos.map((evento) => (
                <option key={evento.idevento} value={evento.idevento}>
                  {evento.nome} - {formatDate(evento.datahora)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="idcontato">Contatos</label>
            <select
              onChange={(text) => setIdContato(Number(text.currentTarget.value.trim()))}
              defaultValue=""
              name="idcontato"
              id="idcontato"
            >
              <option value="">-- Escolha o contato --</option>
              {contatos.map((contato) => (
                <option key={contato.idcontato} value={contato.idcontato}>
                  {contato.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="confirmacao">Confirmação</label>
            <select
              onChange={(text) => setConfirmacao(Number(text.currentTarget.value.trim()))}
              defaultValue=""
              name="confirmacao"
              id="confirmacao"
            >
              <option value="">-- Confirmação --</option>
              <option key="1" value="1">
                Sim
              </option>
              <option key="0" value="0">
                Não
              </option>
            </select>
          </div>
        </div>
        <div>
          <Button variant="success" onClick={(e: React.FormEvent<Element>) => insertParticipante(e)}>
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ListParticipantes;

function formatDate(value: string) {
  var options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }; //hour: "numeric", minute: "numeric"
  return new Date(value).toLocaleDateString([], options);
}
