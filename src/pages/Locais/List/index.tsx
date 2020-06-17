import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";

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

const ListLocais: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [locais, setLocais] = useState([] as Local[]);

  async function getLocal() {
    const response = await api.get("/local");
    setLocais(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de locais</h1> 
        <br/>
        <Link to="/"><h3><AiFillCaretLeft /> Voltar</h3></Link>
        {!loading ? (
          <fieldset>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Endereço</th>
                  <th>Número</th>
                  <th>Bairro</th>
                  <th>Complemento</th>
                  <th>Cep</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                </tr>
                {locais.map((local) => (
                  <tr key={local.id}>
                    <th>{local.id}</th>
                    <th>{local.endereco}</th>
                    <th>{local.numero}</th>
                    <th>{local.bairro}</th>
                    <th>{local.complemento == null ? "Nenhum" : local.complemento}</th>
                    <th>{local.cep}</th>
                    <th>{local.cidade}</th>
                    <th>{local.estado}</th>
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

export default ListLocais;
