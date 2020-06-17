import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";

interface TipoContato {
  id: number;
  descricao: string;
}

const ListTiposContato: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tiposContato, setTiposContatos] = useState([] as TipoContato[]);

  async function getTipoContato() {
    const response = await api.get("/tipocontato");
    setTiposContatos(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getTipoContato();
  }, []);

  return (
    <div id="page-create-point">
      <form>
          <h1>Lista de tipos de contato</h1> <br/>
        <Link to="/"><h3><AiFillCaretLeft /> Voltar</h3></Link>
        {!loading ? (
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                </tr>
                {tiposContato.map((tipoContato) => (
                  <tr key={tipoContato.id}>
                    <th>{tipoContato.id}</th>
                    <th>{tipoContato.descricao}</th>
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

export default ListTiposContato;
