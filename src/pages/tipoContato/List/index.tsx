import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";

interface TipoContato {
  id: number;
  descricao: string;
}

const ListTiposContato: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tiposContato, setTiposContatos] = useState([] as TipoContato[]);
  const [descricao, setDescricao] = useState("");

  async function getTipoContato() {
    const response = await api.get("/tipocontato");
    setTiposContatos(response.data);
    setLoading(false);
  }

  async function insertTipoContato(e: FormEvent) {
    e.preventDefault();
    if (descricao === "") {
      return alert("Digite alguma descrição");
    }
    const response = await api.post("/tipocontato", {
      descricao,
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
            {tiposContato.length > 0 ? (
              <table>
                <tbody>
                  <tr>
                    <th>Descrição</th>
                  </tr>
                  {tiposContato.map((tipoContato) => (
                    <tr key={tipoContato.id}>
                      <th>{tipoContato.descricao}</th>
                      <th>
                        <Link to={`/tiposContato/edit/?id=${tipoContato.id}`}>
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
        <h2>Cadastrar:</h2>
        <br />
        <br />
        <div className="field-group">
          <div className="field">
            <label htmlFor="descricao">Descrição</label>
            <input
              onChange={(text) => setDescricao(text.currentTarget.value.trim())}
              type="text"
              name="descricao"
              id="descricao"
            />
          </div>
        </div>
        <div>
          <Button variant="success" onClick={(e: React.FormEvent<Element>) => insertTipoContato(e)}>
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ListTiposContato;
