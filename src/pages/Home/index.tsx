import React from "react";
import { IoMdContact, IoMdContacts } from "react-icons/io";
import { MdPlace, MdEvent } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div id="page-create-point">
      <form>
        <h1>Agenda</h1>
        <br />
        <br />
        <br />
        <ul className="items-grid">
          <Link to="/contatos/list">
            <li>
              <IoMdContact size={80} color="#6C6C80" />
              <span>Contatos</span>
            </li>
          </Link>
          <Link to="/locais">
            <li>
              <MdPlace size={80} color="#6C6C80" />
              <span>Locais</span>
            </li>
          </Link>
          <Link to="/eventos">
            <li>
              <MdEvent size={80} color="#6C6C80" />
              <span>Eventos</span>
            </li>
          </Link>
          <Link to="/tiposContato">
            <li>
              <RiContactsLine size={80} color="#6C6C80" />
              <span>Tipos de Contato</span>
            </li>
          </Link>
          <Link to="/participantes">
            <li>
              <IoMdContacts size={80} color="#6C6C80" />
              <span>Participantes de evento</span>
            </li>
          </Link>
        </ul>
      </form>
    </div>
  );
};
export default Home;
