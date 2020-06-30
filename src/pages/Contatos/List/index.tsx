import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";
import { DefaultTheme } from "styled-components";
import ThemeSwitcher from "../../../components/ThemeSwitcher";

interface Contato {
  idcontato: number;
  nome: string;
  email: string;
  telefone: string;
  idlocal: number;
  idtipocontato: number;
}

interface TipoContato {
  id: number;
  descricao: string;
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


const ListContatos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contatos, setContatos] = useState([] as Contato[]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idTipoContato, setIdTipoContato] = useState(0);
  const [idLocal, setIdLocal] = useState(0);

  const [tipoContato, setTipoContato] = useState([] as TipoContato[])
  const [locais, setLocais] = useState([] as Local[])

  async function getContato() {
    const response = await api.get("/contato");
    setContatos(response.data);
  }

  async function getLocais() {
    const response = await api.get("/local");
    setLocais(response.data);
  }

  async function getTipoContato() {
    const response = await api.get("/tipocontato");
    setTipoContato(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getContato();
    getTipoContato();
    getLocais();
  }, []);

  async function insertContato(e: FormEvent) {
    e.preventDefault();
    const response = await api.post("/contato", {
      nome,
      email,
      telefone,
      idTipoContato,
      idLocal,
    });
    if (response.data.message !== "Erro") {
      alert(`Contato adicionado: ${nome}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao adicionar contato.\n${response.data.error.detail}`);
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
                    <th>Nome</th>
                    <th>E-Mail</th>
                    <th>Telefone</th>
                    <th>Local</th>
                    <th>TipoContato</th>
                    <th></th>
                  </tr>
                  {contatos.map((contato) => (
                    <tr key={contato.idcontato}>
                      <th>{contato.nome}</th>
                      <th>{contato.email}</th>
                      <th>{contato.telefone}</th>
                      <th>{locais.map((local)=> (
                        contato.idlocal === local.id ? (`${local.endereco}, ${local.numero} - ${local.cidade} / ${local.estado}`) : null
                      ))}</th>
                      <th>{tipoContato.map((tipo)=> (
                        contato.idtipocontato === tipo.id ? (`${tipo.descricao}`) : null
                      ))}</th>
                      <th>
                        <Link to={`/contatos/edit/?id=${contato.idcontato}`}>
                        <Button variant="danger">
                          Editar
                        </Button>
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
        <br />
        <div className="field-group">
          <div className="field">
            <label htmlFor="Nome">Nome</label>
            <input onChange={(text) => setNome(text.currentTarget.value.trim())} type="text" name="nome" id="nome" />
          </div>
          <div className="field">
            <label htmlFor="Email">E-Mail</label>
            <input onChange={(text) => setEmail(text.currentTarget.value.trim())} type="text" name="email" id="email" />
          </div>
        </div>
        <div className="field-group">
        <div className="field">
            <label htmlFor="idlocal">Local</label>
            <select defaultValue="DEFAULT" onChange={(text) => setIdLocal(Number(text.currentTarget.value.trim()))} name="idlocal" id="idlocal">
              <option key="DEFAULT" value="nulo">-- Escolha um local --</option>
              {locais.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.endereco}, {local.numero} - {local.cidade}/{local.estado}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="idtipocontato">Tipo Contato</label>
            <select defaultValue="DEFAULT" onChange={(text)=> setIdTipoContato(Number(text.currentTarget.value.trim()))} name="idtipocontato" id="idtipocontato">
            <option key="DEFAULT" value="nulo">-- Escolha um tipo de contato --</option>
            {tipoContato.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descricao}
              </option>
            ))}
            </select>
          </div>
        </div>
        <div className="field-group">
        <div className="field">
            <label htmlFor="Telefone">Telefone</label>
            <input
              onChange={(text) => setTelefone(text.currentTarget.value.trim())}
              type="text"
              name="telefone"
              id="telefone"
            />
          </div>
        </div>
        <div>
        <Button variant="success"onClick={(e: React.FormEvent<Element>) => insertContato(e)}>Cadastrar</Button>
        </div>
      </form>
    </div>
  );
};

export default ListContatos;
