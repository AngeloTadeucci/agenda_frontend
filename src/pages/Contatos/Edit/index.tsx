import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link, useLocation } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditContato: React.FC = () => {
  let query = useQuery();
  var id = query.get("id");
  const [loading, setLoading] = useState(true);
  const [contato, setContato] = useState([] as Contato[]);

  const [nome, setNome] = useState((null as unknown) as string);
  const [email, setEmail] = useState((null as unknown) as string);
  const [telefone, setTelefone] = useState((null as unknown) as string);
  const [idTipoContato, setIdTipoContato] = useState((null as unknown) as number);
  const [idLocal, setIdLocal] = useState((null as unknown) as number);

  const [tipoContato, setTipoContato] = useState([] as TipoContato[]);
  const [locais, setLocais] = useState([] as Local[]);

  async function getLocais() {
    const response = await api.get("/local");
    setLocais(response.data);
  }

  async function getTipoContato() {
    const response = await api.get("/tipocontato");
    setTipoContato(response.data);
  }

  useEffect(() => {
    async function getContato() {
      const response = await api.get(`/contato/${id}`);
      setContato(response.data);
      setLoading(false);
    }
    getTipoContato();
    getLocais();
    getContato();
  }, [id]);

  async function deleteContato(e: FormEvent) {
    e.preventDefault();
    const response = await api.delete(`/contato/${id}`);
    if (response.data.message !== "Erro") {
      alert(`Contato ${nome} deletado com sucesso.`);
      window.location.href = "/contatos/list";
    } else {
      alert(`Erro ao exluir contato.\n${response.data.error.detail}`);
    }
  }

  async function patchContato(e: FormEvent) {
    e.preventDefault();
    if (nome === "") {
      return alert(`Dê um nome ao evento.`);
    }
    if (email === "") {
      return alert(`Digite um email.`);
    }
    if (telefone === "") {
      return alert(`Digite um telefone!`);
    }
    if (idTipoContato === 0) {
      return alert(`Escolha um tipo de contato!`);
    }
    if (idLocal === 0) {
      return alert(`Escolha um local!`);
    }
    if (
      nome === contato[0].nome &&
      email === contato[0].email &&
      telefone === contato[0].telefone &&
      idTipoContato === contato[0].idtipocontato &&
      idLocal === contato[0].idlocal
    ) {
      return alert("Mude algo ou volte.");
    }
    const response = await api.patch(`/contato/${id}`, {
      nome,
      email,
      telefone,
      idTipoContato,
      idLocal,
    });
    if (response.data.message !== "Erro") {
      alert(`Contato atualizado: ${nome}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao atualizar contato.\n${response.data.error.detail}`);
    }
  }

  useEffect(() => {
    if (contato[0] !== undefined) {
      setNome(contato[0].nome);
      setEmail(contato[0].email);
      setTelefone(contato[0].telefone);
      setIdLocal(contato[0].idlocal);
      setIdTipoContato(contato[0].idtipocontato);
    }
  }, [contato]);

  return (
    <div id="page-create-point">
      <form>
        {!loading ? (
          <div>
            <h1>{nome}</h1>
            <br />
            <Link to="/contatos/list">
              <h4>
                <AiFillCaretLeft /> Voltar
              </h4>
            </Link>
            <div className="field-group">
              <div className="field">
                <label htmlFor="Nome">Nome</label>
                <input
                  onChange={(text) => setNome(text.currentTarget.value.trim())}
                  type="text"
                  defaultValue={contato[0].nome}
                  name="nome"
                  id="nome"
                />
              </div>
              <div className="field">
                <label htmlFor="Email">E-Mail</label>
                <input
                  onChange={(text) => setEmail(text.currentTarget.value.trim())}
                  type="text"
                  defaultValue={contato[0].email}
                  name="email"
                  id="email"
                />
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="idlocal">Local</label>
                <select
                  onChange={(text) => setIdLocal(Number(text.currentTarget.value.trim()))}
                  defaultValue={contato[0].idlocal}
                  name="idlocal"
                  id="idlocal"
                >
                  {locais.map((local) =>
                    contato[0].idlocal !== local.id ? (
                      <option key={local.id} value={local.id}>
                        {local.endereco}, {local.numero} - {local.cidade}/{local.estado}
                      </option>
                    ) : (
                      <option key={local.id} value={local.id} selected>
                        {local.endereco}, {local.numero} - {local.cidade}/{local.estado}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="field">
                <label htmlFor="idtipocontato">Tipo Contato</label>
                <select
                  onChange={(text) => setIdTipoContato(Number(text.currentTarget.value.trim()))}
                  defaultValue={contato[0].idtipocontato}
                  name="idtipocontato"
                  id="idtipocontato"
                >
                  {tipoContato.map((tipo) =>
                    contato[0].idtipocontato !== tipo.id ? (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.descricao}
                      </option>
                    ) : (
                      <option key={tipo.id} value={tipo.id} selected>
                        {tipo.descricao}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="Telefone">Telefone</label>
                <input
                  onChange={(text) => setTelefone(text.currentTarget.value.trim())}
                  defaultValue={contato[0].telefone}
                  type="text"
                  name="telefone"
                  id="telefone"
                />
              </div>
            </div>
            <div>
              <Button variant="success" onClick={(e: React.FormEvent<Element>) => patchContato(e)}>
                Atualizar contato
              </Button>
              <Button className="direita" onClick={(e: React.FormEvent<Element>) => deleteContato(e)} variant="danger">
                Deletar contato
              </Button>
            </div>
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

  //   return (
  //     <div id="page-create-point">
  //       <form>
  //         <h1>Lista de contatos</h1>
  //         <br />
  //         <Link to="/">
  //           <h3>
  //             <AiFillCaretLeft /> Voltar
  //           </h3>
  //         </Link>
  //         {!loading ? (
  //           <fieldset>
  //             {contato.length > 0 ? (
  //               <table>
  //                 <tbody>
  //                   <tr>
  //                     <th>ID</th>
  //                     <th>Nome</th>
  //                     <th>E-Mail</th>
  //                     <th>Telefone</th>
  //                     <th>ID Local</th>
  //                     <th>ID TipoContato</th>
  //                     <th></th>
  //                   </tr>
  //                   {contato.map((contato) => (
  //                     <tr key={contato.idcontato}>
  //                       <th>{contato.idcontato}</th>
  //                       <th>{contato.nome}</th>
  //                       <th>{contato.email}</th>
  //                       <th>{contato.telefone}</th>
  //                       <th>
  //                         {locais.map((local) =>
  //                           contato.idlocal === local.id ? `${local.endereco} - ${local.numero}` : null
  //                         )}
  //                       </th>
  //                       <th>
  //                         {tipoContato.map((tipo) => (contato.idtipocontato === tipo.id ? `${tipo.descricao}` : null))}
  //                       </th>
  //                       <th>
  //                         <Link to={`/eventos/edit/${contato.idcontato}`}>
  //                           <Button variant="danger">Editar</Button>
  //                         </Link>
  //                         {/*onClick={(e: React.FormEvent<Element>) => {
  //                             deleteContato(e, contato.idcontato, contato.nome);
  //                           }} */}
  //                       </th>
  //                     </tr>
  //                   ))}
  //                 </tbody>
  //               </table>
  //             ) : (
  //               <p>A agenda não possui contatos cadastrados.</p>
  //             )}
  //           </fieldset>
  //         ) : (
  //           <div>
  //             <br />
  //             <br />
  //             <Spinner animation="border" variant="dark" role="status">
  //               <span className="sr-only">Loading...</span>
  //             </Spinner>
  //           </div>
  //         )}
  //         <br />
  //         <br />
  //         <br />
  //         <h2>Cadastrar:</h2>
  //         <br />
  //         <br />
  //         <br />
  //         <div className="field-group">
  //           <div className="field">
  //             <label htmlFor="Nome">Nome</label>
  //             <input onChange={(text) => setNome(text.currentTarget.value.trim())} type="text" name="nome" id="nome" />
  //           </div>
  //           <div className="field">
  //             <label htmlFor="Email">E-Mail</label>
  //             <input onChange={(text) => setEmail(text.currentTarget.value.trim())} type="text" name="email" id="email" />
  //           </div>
  //         </div>
  //         <div className="field-group">
  //           <div className="field">
  //             <label htmlFor="idlocal">ID Local</label>
  //             <select
  //               defaultValue="DEFAULT"
  //               onChange={(text) => setIdLocal(Number(text.currentTarget.value.trim()))}
  //               name="idlocal"
  //               id="idlocal"
  //             >
  //               <option key="DEFAULT" value="nulo">
  //                 -- Escolha um local --
  //               </option>
  //               {locais.map((local) => (
  //                 <option key={local.id} value={local.id}>
  //                   {local.endereco}, {local.numero} - {local.cidade}/{local.estado}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
  //           <div className="field">
  //             <label htmlFor="idtipocontato">ID Tipo Contato</label>
  //             <select
  //               defaultValue="DEFAULT"
  //               onChange={(text) => setIdTipoContato(Number(text.currentTarget.value.trim()))}
  //               name="idtipocontato"
  //               id="idtipocontato"
  //             >
  //               <option key="DEFAULT" value="nulo">
  //                 -- Escolha um tipo de contato --
  //               </option>
  //               {tipoContato.map((tipo) => (
  //                 <option key={tipo.id} value={tipo.id}>
  //                   {tipo.descricao}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
  //         </div>
  //         <div className="field-group">
  //           <div className="field">
  //             <label htmlFor="Telefone">Telefone</label>
  //             <input
  //               onChange={(text) => setTelefone(text.currentTarget.value.trim())}
  //               type="text"
  //               name="telefone"
  //               id="telefone"
  //             />
  //           </div>
  //         </div>
  //         <div>
  //           <Button variant="success" onClick={(e: React.FormEvent<Element>) => insertContato(e)}>
  //             Cadastrar
  //           </Button>
  //         </div>
  //       </form>
  //     </div>
  //   );
};

export default EditContato;
