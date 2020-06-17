import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";

interface Contato {
  idcontato: number;
  nome: string;
  email: string;
  telefone: number;
  idlocal: number;
  idtipocontato: number;
}

const ListContatos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contatos, setContatos] = useState([] as Contato[]);

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [idTipoContato, setIdTipoContato] = useState(0)
  const [idLocal, setIdLocal] = useState(0)

  async function getContato() {
    const response = await api.get("/contato");
    setContatos(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getContato();
  }, []);

  async function deleteContato(e: FormEvent, idContato: number, nome: string) {
    e.preventDefault();
    const response = await api.delete(`/contato/${idContato}`);
    console.log(response)
    if (response.data.message !== "Erro") {
      alert(`Contato ${nome} deletado com sucesso.`);
      window.location.reload(true)
    } else {
      alert(`Erro ao exluir contato.`);
    }
  }

  async function insertContato(e: FormEvent) {
    e.preventDefault();
    const response = await api.post("/contato", {
      nome,
      email,
      telefone,
      idTipoContato,
      idLocal
    });
    console.log(response)
    if (response.data.message !== "Erro") {
      alert(`Contato adicionado: ${nome}`);
      window.location.reload(true)
    } else {
      alert(`Erro ao adicionar contato`);
    }
  }

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de contatos</h1>
        <br />
        <Link to="/">
          <h3>
            <AiFillCaretLeft /> Voltar
          </h3>
        </Link>
        {!loading ? (
          <fieldset>
            {contatos.length > 0 ? (
              <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-Mail</th>
                    <th>Telefone</th>
                    <th>ID Local</th>
                    <th>ID TipoContato</th>
                    <th></th>
                  </tr>
                  {contatos.map((contato) => (
                    <tr key={contato.idcontato}>
                      <th>{contato.idcontato}</th>
                      <th>{contato.nome}</th>
                      <th>{contato.email}</th>
                      <th>{contato.telefone}</th>
                      <th>{contato.idlocal}</th>
                      <th>{contato.idtipocontato}</th>
                      <th>
                        <button
                          onClick={(e) => {
                            deleteContato(e, contato.idcontato, contato.nome);
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
            <label htmlFor="Nome">Nome</label>
            <input onChange={(text) => setNome(text.currentTarget.value)} type="text" name="nome" id="nome" />
          </div>
          <div className="field">
            <label htmlFor="Email">E-Mail</label>
            <input onChange={(text) => setEmail(text.currentTarget.value)} type="text" name="email" id="email" />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="Telefone">Telefone</label>
            <input onChange={(text) => setTelefone(text.currentTarget.value)} type="text" name="telefone" id="telefone" />
          </div>
          <div className="field">
            <label htmlFor="idtipocontato">ID Tipo Contato</label>
            <input onChange={(text) => setIdTipoContato(Number(text.currentTarget.value))} type="text" name="idtipocontato" id="idtipocontato" />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="idlocal">ID Local</label>
            <input onChange={(text) => setIdLocal(Number(text.currentTarget.value))} type="text" name="idlocal" id="idlocal" />
          </div>
        </div>
        <button onClick={(e) => insertContato(e)}>Cadastrar</button>
      </form>
    </div>
  );
};

export default ListContatos;
