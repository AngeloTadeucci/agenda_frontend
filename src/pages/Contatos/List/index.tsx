import React, { useState, useEffect } from "react";
import api from "../../../services/api";

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

  async function getContato() {
    const response = await api.get("/contato");
    setContatos(response.data.results);
    setLoading(false);
  }

  useEffect(() => {
    getContato();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de contatos</h1>
        {!loading ? (
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-Mail</th>
                  <th>Telefone</th>
                  <th>ID Local</th>
                  <th>ID TipoContato</th>
                </tr>
                {contatos.map((contato) => (
                  <tr key={contato.idcontato}>
                    <th>{contato.idcontato}</th>
                    <th>{contato.nome}</th>
                    <th>{contato.email}</th>
                    <th>{contato.telefone}</th>
                    <th>{contato.idlocal}</th>
                    <th>{contato.idcontato}</th>
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

export default ListContatos;
