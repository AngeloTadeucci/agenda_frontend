import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link, useLocation } from "react-router-dom";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditParticipante: React.FC = () => {
  let query = useQuery();
  var queryEventoID = query.get("evento");
  var queryContatoID = query.get("contato");
  
  const [loading, setLoading] = useState(true);
  const [participante, setParticipante] = useState([] as Participante[]);

  const [idEvento, setIdEvento] = useState((null as unknown) as number);
  const [idContato, setIdContato] = useState((null as unknown) as number);
  const [confirmacao, setConfirmacao] = useState((null as unknown) as number);

  const [eventos, setEventos] = useState([] as Evento[]);
  const [contatos, setContatos] = useState([] as Contato[]);

  async function getContato() {
    const response = await api.get("/contato");
    setContatos(response.data);
  }
  async function getEvento() {
    const response = await api.get("/evento");
    setEventos(response.data);
  }

  async function deleteParticipante(e: FormEvent) {
    e.preventDefault();
    const response = await api.delete(`/participantesEvento/${idEvento}/${idContato}`);
    if (response.data.message !== "Erro") {
      alert(`Contato ${idContato} deletado do evento ${idEvento}`);
      window.location.href = "/participantes/list";
    } else {
      alert(`Erro ao exluir participante do evento.\n${response.data.error.detail}`);
    }
  }

  async function insertParticipante(e: FormEvent) {
    e.preventDefault();

    if (idEvento === 0 || idEvento === null) {
      return alert("Escolha algum evento.");
    }
    if (idContato === 0 || idContato === null) {
      return alert("Escolha algum contato.");
    }
    if (confirmacao === -99 || confirmacao === null) {
      return alert("Escolha alguma opcao.");
    }
    if (
      idEvento === participante[0].idevento &&
      idContato === participante[0].idcontato &&
      confirmacao === participante[0].confirmacao
    ) {
      return alert("Mude algo ou volte.");
    }
    const response = await api.patch(`/participantesEvento/${idEvento}/${idContato}`, {
      idEvento,
      idContato,
      confirmacao,
    });
    if (response.data.message !== "Erro") {
      alert(`Participante ${idContato} e evento ${idEvento} atualizado`);
      window.location.reload(true);
    } else {
      alert(`Erro ao atualizar.\n${response.data.error.detail}`);
    }
  }

  useEffect(() => {
    async function getParticipante() {
      const response = await api.get(`/participantesEvento/${queryEventoID}/${queryContatoID}`);
      setParticipante(response.data);
      setLoading(false);
    }
    getParticipante();
    getContato();
    getEvento();
  }, [queryEventoID, queryContatoID]);

  useEffect(() => {
    if (participante[0] !== undefined) {
      setIdContato(participante[0].idcontato);
      setIdEvento(participante[0].idevento);
      setConfirmacao(participante[0].confirmacao);
    }
  }, [participante]);

  return (
    <div id="page-create-point">
      <form>
        {!loading ? (
          <div>
            <h1>
              Evento ID: {idEvento} / Contato ID: {idContato}
            </h1>
            <br />
            <Link to="/participantes/list">
              <h4>
                <AiFillCaretLeft /> Voltar
              </h4>
            </Link>
            <br />
            <br />
            <br />
            <div className="field-group">
              <div className="field">
                <label htmlFor="idevento">Eventos</label>
                <select
                  onChange={(text) => setIdEvento(Number(text.currentTarget.value.trim()))}
                  value={participante[0].idevento}
                  name="idevento"
                  id="idevento"
                >
                  {/* <option value="0">-- Escolha o evento --</option> */}
                  {eventos.map((evento) =>
                    participante[0].idevento === evento.idevento ? (
                      <option selected key={evento.idevento} value={evento.idevento}>
                        {evento.nome} - {formatDate(evento.datahora)}
                      </option>
                    ) : (
                      null
                    )
                  )}
                </select>
              </div>
              <div className="field">
                <label htmlFor="idcontato">Contatos</label>
                <select
                  onChange={(text) => setIdContato(Number(text.currentTarget.value.trim()))}
                  value={participante[0].idcontato}
                  name="idcontato"
                  id="idcontato"
                >
                  {/* <option value="0">-- Escolha o contato --</option> */}
                  {contatos.map((contato) =>
                    participante[0].idcontato === contato.idcontato ? (
                      <option selected key={contato.idcontato} value={contato.idcontato}>
                        {contato.nome}
                      </option>
                    ) : (
                      null
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="confirmacao">Confirmação</label>
                <select
                  onChange={(text) => setConfirmacao(Number(text.currentTarget.value.trim()))}
                  defaultValue={participante[0].confirmacao}
                  name="confirmacao"
                  id="confirmacao"
                >
                  <option value="-99">-- Confirmação --</option>
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
                Atualizar participante
              </Button>
              <Button
                className="direita"
                onClick={(e: React.FormEvent<Element>) => deleteParticipante(e)}
                variant="danger"
              >
                Deletar participante
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <br />
            <Spinner animation="border" variant="dark" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditParticipante;

function formatDate(value: string) {
  var options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }; //hour: "numeric", minute: "numeric"
  return new Date(value).toLocaleDateString([], options);
}
