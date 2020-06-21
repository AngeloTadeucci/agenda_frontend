import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link, useLocation } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";
import axios from "axios";

interface Local {
  id: number;
  cep: string;
  endereco: string;
  numero: string;
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditLocal: React.FC = () => {
  let query = useQuery();
  var id = query.get("id");
  const [loading, setLoading] = useState(true);
  const [local, setLocal] = useState([] as Local[]);

  const [endereco, setEndereco] = useState((null as unknown) as string);
  const [numero, setNumero] = useState((null as unknown) as string);
  const [bairro, setBairro] = useState((null as unknown) as string);
  const [cep, setCep] = useState((null as unknown) as string);
  const [complemento, setComplemento] = useState((null as unknown) as string);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [estado, setEstado] = useState((null as unknown) as string);
  const [cidade, setCidade] = useState((null as unknown) as string);

  async function deleteLocal(e: FormEvent) {
    e.preventDefault();
    const response = await api.delete(`/local/${id}`);
    if (response.data.message !== "Erro") {
      alert(`Local ${endereco} deletado com sucesso`);
      window.location.href = "/locais/list";
    } else {
      alert(`Erro ao exluir participante do evento.\n${response.data.error.detail}`);
    }
  }

  async function patchLocal(e: FormEvent) {
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
    if (
      endereco === local[0].endereco &&
      numero === local[0].numero &&
      bairro === local[0].bairro &&
      cep === local[0].cep &&
      estado === local[0].estado &&
      cidade === local[0].cidade
    ) {
      return alert("Mude algo ou volte.");
    }
    const response = await api.patch(`/local/${id}`, {
      endereco,
      numero,
      bairro,
      cep,
      complemento,
      estado,
      cidade,
    });
    if (response.data.message !== "Erro") {
      alert(`Endereco ${endereco}, atualizado com sucesso`);
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
    async function getLocal() {
      const response = await api.get(`/local/${id}`);
      setLocal(response.data);
      setLoading(false);
    }
    getLocal();
  }, [id]);

  useEffect(() => {
    if (local[0] !== undefined) {
      setEndereco(local[0].endereco);
      setNumero(local[0].numero);
      setBairro(local[0].bairro);
      setCep(local[0].cep);
      setComplemento(local[0].complemento);
      setEstado(local[0].estado);
      setCidade(local[0].cidade);
    }
  }, [local]);

  return (
    <div id="page-create-point">
      <form>
        {!loading ? (
          <div>
            <h1>
              {endereco}, {numero} - {cidade}/{estado}
            </h1>
            <br />
            <Link to="/locais/list">
              <h4>
                <AiFillCaretLeft /> Voltar
              </h4>
            </Link>
            <br />
            <br />
            <br />
            <div className="field-group">
              <div className="field">
                <label htmlFor="endereco">Endereço</label>
                <input
                  onChange={(text) => setEndereco(text.currentTarget.value.trim())}
                  defaultValue={local[0].endereco}
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
                  defaultValue={local[0].numero}
                  type="text"
                  name="numero"
                  id="numero"
                />
              </div>
              <div className="field">
                <label htmlFor="bairro">Bairro</label>
                <input
                  onChange={(text) => setBairro(text.currentTarget.value.trim())}
                  defaultValue={local[0].bairro}
                  type="text"
                  name="bairro"
                  id="bairro"
                />
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="cep">CEP</label>
                <input
                  onChange={(text) => setCep(text.currentTarget.value.trim())}
                  defaultValue={local[0].cep}
                  type="text"
                  name="cep"
                  id="cep"
                />
              </div>
              <div className="field">
                <label htmlFor="complemento">Complemento</label>
                <input
                  onChange={(text) => setComplemento(text.currentTarget.value.trim())}
                  defaultValue={local[0].complemento === "" ? "Nenhum" : local[0].complemento}
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
                    setCidade("");
                  }}
                  defaultValue={local[0].estado}
                  name="estados"
                  id="estados"
                >
                  {ufs.map((pEstado) =>
                    local[0].estado !== pEstado ? (
                      <option key={pEstado} value={pEstado}>
                        {pEstado}
                      </option>
                    ) : (
                      <option key={pEstado} value={pEstado} selected>
                        {pEstado}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="field">
                <label htmlFor="cidade">Cidade</label>
                <select
                  onChange={(text) => setCidade(text.currentTarget.value.trim())}
                  defaultValue={local[0].cidade}
                  name="cidades"
                  id="cidades"
                >
                  {estado === null || estado === "" ? (
                    <option value="">-- Escolha um estado --</option>
                  ) : (
                    <option value="">-- Escolha uma cidade --</option>
                  )}
                  {estado === null || estado === ""
                    ? null
                    : cities.map((pCidade) =>
                        pCidade !== local[0].cidade ? (
                          <option key={pCidade} value={pCidade}>
                            {pCidade}
                          </option>
                        ) : (
                          <option key={pCidade} value={pCidade} selected>
                            {pCidade}
                          </option>
                        )
                      )}
                </select>
              </div>
            </div>
            <Button variant="success" onClick={(e: React.FormEvent<Element>) => patchLocal(e)}>
              Atualizar local
            </Button>
            <Button className="direita" onClick={(e: React.FormEvent<Element>) => deleteLocal(e)} variant="danger">
              Deletar local
            </Button>
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

export default EditLocal;
