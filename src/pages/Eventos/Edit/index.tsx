import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link, useLocation } from "react-router-dom";
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
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditEvento: React.FC = () => {
  let query = useQuery();
  var id = query.get("id");
  const [loading, setLoading] = useState(true);
  const [evento, setEvento] = useState([] as Evento[]);
  const [locais, setLocais] = useState([] as Local[]);

  const [nome, setNome] = useState(null as unknown as string);
  const [dataHora, setDataHora] = useState(null as unknown as string);
  const [idLocal, setIdLocal] = useState(null as unknown as number);
  const [qtdParticipantes, setQtdParticipantes] = useState(null as unknown as number);


  

  async function getLocais() {
    const response = await api.get("/local");
    setLocais(response.data);    
  }

  useEffect(() => {
    async function getEvento() {
      const response = await api.get(`/evento/${id}`);
      setEvento(response.data);
      setLoading(false);
    }
    getEvento();
    getLocais();
  }, [id]);

  
  async function deleteEvento(e: FormEvent) {
    e.preventDefault();
    const response = await api.delete(`/evento/${id}`);
    if (response.data.message !== "Erro") {
      alert(`Evento ${nome} deletado com sucesso.`);
      window.location.href = "/eventos/list";
    } else {
      alert(`Erro ao exluir evento.\n${response.data.error.detail}`);
    }
  }

  async function patchEvento(e: FormEvent) {
    e.preventDefault();
    if (nome === "") {
      return alert(`Dê um nome ao evento.`);
    }
    if (dataHora === "") {
      return alert(`Escolha uma hora e data para o evento.`);
    }
    if (idLocal === null || idLocal === 0) {
      return alert(`Escolha um local!`);
    }
    if (qtdParticipantes === 0) {
      return alert(`Defina uma quantidade de participantes!`);
    }
    if (
      nome === evento[0].nome &&
      dataHora === evento[0].datahora &&
      idLocal === evento[0].idlocal &&
      qtdParticipantes === evento[0].qtdparticipantes
    ) {
      return alert("Mude algo ou volte.");
    }
    const response = await api.patch(`/evento/${id}`, {
      nome,
      dataHora,
      idLocal,
      qtdParticipantes,
    });
    if (response.data.message !== "Erro") {
      alert(`Evento atualizado: ${nome}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao atualizar evento.\n${response.data.error.detail}`);
    }
  }

  useEffect(()=> {
    if (evento[0] !== undefined) {
      setNome(evento[0].nome);
      setDataHora(evento[0].datahora);
      setIdLocal(evento[0].idlocal);
      setQtdParticipantes(evento[0].qtdparticipantes);
    }
  }, [evento])

  return (
    <div id="page-create-point">
      <form>
        {!loading ? (
          <div>
            <h1>{nome}</h1> <br />
            <Link to="/eventos/list">
              <h4>
                <AiFillCaretLeft /> Voltar
              </h4>
            </Link>
            <br />
            <br />
            <br />
            <br />
            <div className="field-group">
              <div className="field">
                <label htmlFor="Nome">Nome do evento</label>
                <input
                  onChange={(text) => setNome(text.currentTarget.value.trim())}
                  defaultValue={evento[0].nome}
                  type="text"
                  name="nome"
                  id="nome"
                />
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="data">Data / Hora</label>
                <input
                  onChange={(text) => setDataHora(text.currentTarget.value.trim())}
                  defaultValue={evento[0].datahora.substring(0, evento[0].datahora.length - 8)}
                  type="datetime-local"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                  name="hora"
                  id="hora"
                />
              </div>
              <div className="field">
                <label htmlFor="Local">Local</label>
                <select
                  defaultValue={evento[0].idlocal}
                  onChange={(text) => setIdLocal(Number(text.currentTarget.value.trim()))}
                  name="cidades"
                  id="cidades"
                >
                  {locais.map((pLocal) =>
                    pLocal.id !== evento[0].idlocal ? (
                      <option key={pLocal.id} value={pLocal.id}>
                        {pLocal.endereco}, {pLocal.numero} - {pLocal.cidade}/{pLocal.estado}
                      </option>
                    ) : (
                      <option key={pLocal.id} value={pLocal.id} selected>
                        {pLocal.endereco}, {pLocal.numero} - {pLocal.cidade}/{pLocal.estado}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="participantes">Participantes</label>
                <input
                  onChange={(text) => setQtdParticipantes(Number(text.currentTarget.value.trim()))}
                  defaultValue={evento[0].qtdparticipantes}
                  type="text"
                  name="participantes"
                  id="participantes"
                />
              </div>
            </div>
            <div>
              <Button onClick={(e: React.FormEvent<Element>) => patchEvento(e)} variant="success">
                Atualizar evento
              </Button>
              <Button className="direita" onClick={(e: React.FormEvent<Element>) => deleteEvento(e)} variant="danger">
                Deletar evento
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

export default EditEvento;
