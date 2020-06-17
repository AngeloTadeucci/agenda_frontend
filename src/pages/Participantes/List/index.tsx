import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";

interface Participante {
    idevento:number
    idcontato:number
    confirmacao:number
}

const ListParticipantes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [participantes, setParticipantes] = useState([] as Participante[]);

  const [idEvento, setIdEvento] = useState(0)
  const [idContato, setIdContato] = useState(0)
  const [confirmacao, setConfirmacao] = useState(0)

  async function getParticipantes() {
    const response = await api.get("/participantesEvento");
    setParticipantes(response.data);
    setLoading(false);
  }

  async function deleteParticipantes(e: FormEvent, pIdEvento:number, pIdContato:number) {
    e.preventDefault();
    const response = await api.delete(`/participantesEvento/${pIdEvento}/${pIdContato}`);
    console.log(response)
    if (response.data.message !== "Erro") {
      alert(`Contato ${pIdContato} deletado do evento ${pIdEvento}`);
      window.location.reload(true)
    } else {
      alert(`Erro ao exluir participante do evento.`);
    }
  }

  async function insertParticipante(e: FormEvent) {
    e.preventDefault();
    const response = await api.post("/participantesEvento", {
      idEvento,
      idContato,
      confirmacao
    });
    console.log(response)
    if (response.data.message !== "Erro") {
      alert(`Participante ${idContato} adicionado no evento ${idEvento}`);
      window.location.reload(true)
    } else {
      alert(`Erro ao adicionar`);
    }
  }

  useEffect(() => {
    getParticipantes();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista participantes</h1>
        <br/>
        <Link to="/"><h3><AiFillCaretLeft /> Voltar</h3></Link>
        {!loading ? (
          <fieldset>
           { participantes.length > 0 ? ( 
             <table>
              <tbody>
                <tr>
                    <th>ID Contato</th>
                    <th>ID Evento</th>
                    <th>Confirmação</th>
                    <th></th>
                </tr>
                {participantes.map((participante) => (
                  <tr key={participante.idcontato}>
                    <th>{participante.idcontato}</th>
                    <th>{participante.idevento}</th>
                    <th>{participante.confirmacao}</th>
                    <th>
                    <button
                          onClick={(e) => {
                            deleteParticipantes(e, participante.idevento, participante.idcontato);
                          }}
                        >
                          Apagar
                        </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>) : (<p>Nenhum participantes</p>)
           }
          </fieldset>
        ) : (
          <div>
            <br />
            <br />
            <br />
            <p>Loading..</p>
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
            <label htmlFor="idevento">ID Evento</label>
            <input onChange={(text) => setIdEvento(Number(text.currentTarget.value))} type="text" name="idevento" id="idevento" />
          </div>
          <div className="field">
            <label htmlFor="idcontato">ID Contato</label>
            <input onChange={(text) => setIdContato(Number(text.currentTarget.value))} type="text" name="idcontato" id="idcontato" />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="confirmacao">Confirmação</label>
            <input onChange={(text) => setConfirmacao(Number(text.currentTarget.value))} type="text" name="confirmacao" id="confirmacao" />
          </div>
        </div>
        <button onClick={(e) => insertParticipante(e)}>Cadastrar</button>
      </form>
    </div>
  );
};

export default ListParticipantes;
