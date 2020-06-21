import React, { useState, useEffect, FormEvent } from "react";
import api from "../../../services/api";
import { Link, useLocation } from "react-router-dom";
import { AiFillCaretLeft } from "react-icons/ai";
import { Spinner, Button } from "react-bootstrap";

interface TipoContato {
  id: number;
  descricao: string;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditTipoContato: React.FC = () => {
  let query = useQuery();
  var id = query.get("id");
  const [loading, setLoading] = useState(true);
  const [tipoContato, setTipoContato] = useState([] as TipoContato[]);
  const [descricao, setDescricao] = useState("");

  async function deleteTipoContato(e: FormEvent) {
    e.preventDefault();
    const response = await api.delete(`/tipoContato/${id}`);
    if (response.data.message !== "Erro") {
      alert(`Tipo Contato ${descricao} excluído com sucesso.`);
      window.location.href = "/tiposContato/list";
    } else {
      alert(`Erro ao exluir tipo contato.\n${response.data.error.detail}`);
    }
  }

  async function patchTipoContato(e: FormEvent) {
    e.preventDefault();
    if (descricao === "") {
      return alert("Digite alguma descrição.");
    }
    if (descricao === tipoContato[0].descricao) {
      return alert("Mude algo ou volte.");
    }
    const response = await api.patch(`/tipocontato/${id}`, {
      descricao,
    });
    if (response.data.message !== "Erro") {
      alert(`Tipo contato atualizado: ${descricao}`);
      window.location.reload(true);
    } else {
      alert(`Erro ao atualizar tipo contato.\n${response.data.error.detail}`);
    }
  }

  useEffect(() => {
    async function getTipoContato() {
      const response = await api.get(`/tipocontato/${id}`);
      setTipoContato(response.data);
      setLoading(false);
    }
    getTipoContato();
  }, [id]);

  useEffect(() => {
    if (tipoContato[0] !== undefined) {
      setDescricao(tipoContato[0].descricao);
    }
  }, [tipoContato]);

  return (
    <div id="page-create-point">
      <form>
        {!loading ? (
          <div>
            <h1>{descricao}</h1>
            <br />
            <Link to="/tiposContato/list">
              <h4>
                <AiFillCaretLeft /> Voltar
              </h4>
            </Link>
            <br />
            <br />
            <br />
            <div className="field-group">
              <div className="field">
                <label htmlFor="descricao">Descrição</label>
                <input
                  onChange={(text) => setDescricao(text.currentTarget.value.trim())}
                  defaultValue={tipoContato[0].descricao}
                  type="text"
                  name="descricao"
                  id="descricao"
                />
              </div>
            </div>
            <div>
              <Button variant="success" onClick={(e: React.FormEvent<Element>) => patchTipoContato(e)}>
                Atualizar tipo contato
              </Button>
              <Button
                className="direita"
                onClick={(e: React.FormEvent<Element>) => deleteTipoContato(e)}
                variant="danger"
              >
                Deletar tipo contato
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
};

export default EditTipoContato;
