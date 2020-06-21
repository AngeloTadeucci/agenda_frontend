import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";
import axios from "axios";

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
interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const ListLocais: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [locais, setLocais] = useState([] as Local[]);

  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");

  async function getLocal() {
    const response = await api.get("/local");
    setLocais(response.data);
    setLoading(false);
  }

  async function insertLocal(e: FormEvent) {
    e.preventDefault();
    if (endereco === "") {
      return alert("Digite um endereço.");
    }
    if (numero === "") {
      return alert("Digite um número.");
    }
    if (bairro === "") {
      return alert("Digite um bairro.");
    }
    if (cep === "") {
      return alert("Digite um CEP.");
    }
    if (estado === null || estado === "") {
      return alert("Escolha um estado.");
    }
    if (cidade === null || cidade === "") {
      return alert("Escolha uma cidade.");
    }
    const response = await api.post("/local", {
      endereco,
      numero,
      bairro,
      cep,
      complemento,
      estado,
      cidade,
    });
    if (response.data.message !== "Erro") {
      alert(`Endereco ${endereco} adicionado com sucesso`);
      window.location.reload(true);
    } else {
      alert(`Erro ao adicionar\n${response.data.error.detail}`);
    }
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((response) => {
      const ufInitials = response.data.map((uf) => uf.sigla);
      ufInitials.sort();
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (estado === "0") {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        cityNames.sort();
        setCities(cityNames);
      });
  }, [estado]);

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <div id="page-create-point">
      <form>
        <h1>Lista de locais</h1>
        <br />
        <Link to="/">
          <h3>
            <AiFillCaretLeft /> Voltar
          </h3>
        </Link>
        {!loading ? (
          <fieldset>
            {locais.length > 0 ? (
              <table>
                <tbody>
                  <tr>
                    <th>Endereço</th>
                    <th>Número</th>
                    <th>Bairro</th>
                    <th>Complemento</th>
                    <th>Cep</th>
                    <th>Estado</th>
                    <th>Cidade</th>
                    <th></th>
                  </tr>
                  {locais.map((local) => (
                    <tr key={local.id}>
                      <th>{local.endereco}</th>
                      <th>{local.numero}</th>
                      <th>{local.bairro}</th>
                      <th>
                        {local.complemento == null || local.complemento.length === 0 ? "Nenhum" : local.complemento}
                      </th>
                      <th>{local.cep}</th>
                      <th>{local.estado}</th>
                      <th>{local.cidade}</th>
                      <th>
                        <Link to={`/locais/edit/?id=${local.id}`}>
                          <Button variant="danger">Editar</Button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>A agenda não possui locais cadastrados.</p>
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
            <label htmlFor="endereco">Endereço</label>
            <input
              onChange={(text) => setEndereco(text.currentTarget.value.trim())}
              type="text"
              name="endereco"
              id="endereco"
            />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="numero">Número</label>
            <input
              onChange={(text) => setNumero(text.currentTarget.value.trim())}
              type="text"
              name="numero"
              id="numero"
            />
          </div>
          <div className="field">
            <label htmlFor="bairro">Bairro</label>
            <input
              onChange={(text) => setBairro(text.currentTarget.value.trim())}
              type="text"
              name="bairro"
              id="bairro"
            />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="cep">CEP</label>
            <input onChange={(text) => setCep(text.currentTarget.value.trim())} type="text" name="cep" id="cep" />
          </div>
          <div className="field">
            <label htmlFor="complemento">Complemento</label>
            <input
              onChange={(text) => setComplemento(text.currentTarget.value.trim())}
              type="text"
              name="complemento"
              id="complemento"
            />
          </div>
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="estado">Estado</label>
            <select
              onChange={(text) => {
                setEstado(text.currentTarget.value.trim());
                setCidade("")
              }}
              defaultValue=""
              name="estados"
              id="estados"
            >
              <option key="DEFAULT" value="">-- Escolha um estado --</option>
              {ufs.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cidade">Cidade</label>
            <select onChange={(text) => setCidade(text.currentTarget.value.trim())} defaultValue="" name="cidades" id="cidades">
              {estado == null || estado === "" ? (
                <option key="DEFAULT" value="">-- Escolha um estado --</option>
              ) : (
                <option key="DEFAULT" value="">
                  -- Escolha uma cidade --
                </option>
              )}
              {estado == null || estado === ""
                ? null
                : cities.map((cidade) => (
                    <option key={cidade} value={cidade}>
                      {cidade}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div>
          <Button variant="success" onClick={(e: React.FormEvent<Element>) => insertLocal(e)}>
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ListLocais;
