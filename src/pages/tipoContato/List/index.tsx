import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner } from "react-bootstrap";

interface TipoContato {
  id: number;
  descricao: string;
}

const ListTiposContato: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tiposContato, setTiposContatos] = useState([] as TipoContato[]);
  const [descricao, setDescricao] = useState('')

  async function getTipoContato() {
    const response = await api.get("/tipocontato");
    setTiposContatos(response.data);
    setLoading(false);
  }

  async function deleteTipoContato(e: FormEvent, idTipoContato: number, nome: string) {
    e.preventDefault();
    const response = await api.delete(`/tipocontato/${idTipoContato}`);
    if (response.data.message !== "Erro") {
      alert(`Tipo Contato ${nome} deletado com sucesso.`);
      window.location.reload(true);
    } else {
      alert(`Erro ao exluir tipo contato.\n${response.data.error.detail}`);
    }
  }

  async function insertTipoContato(e: FormEvent) {
    e.preventDefault();
    const response = await api.post("/tipocontato", {
     descricao
    });
    if (response.data.message !== "Erro") {
      alert(`Tipo contato adicionado: ${descricao}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao adicionar tipo contato.\n${response.data.error.detail}`);
    }
  }
  useEffect(() => {
    getTipoContato();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de tipos de contato</h1> <br />
        <Link to="/">
          <h3>
            <AiFillCaretLeft /> Voltar
          </h3>
        </Link>
        {!loading ? (
          <fieldset>
            {
              tiposContato.length > 0 ? (<table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                  </tr>
                  {tiposContato.map((tipoContato) => (
                    <tr key={tipoContato.id}>
                      <th>{tipoContato.id}</th>
                      <th>{tipoContato.descricao}</th>
                      <th>
                      <button
                            onClick={(e) => {
                              deleteTipoContato(e, tipoContato.id, tipoContato.descricao);
                            }}
                          >
                            Apagar
                          </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>) :(
              <p>A agenda não possui contatos cadastrados.</p>
              )
            }
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
            <label htmlFor="descricao">Descrição</label>
            <input onChange={(text) => setDescricao(text.currentTarget.value)} type="text" name="descricao" id="descricao" />
          </div>
        </div>
        <button onClick={(e) => insertTipoContato(e)}>Cadastrar</button>

      </form>
    </div>
  );
};

export default ListTiposContato;
