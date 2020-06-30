import React from "react";
import { IoMdContact, IoMdContacts } from "react-icons/io";
import { MdPlace, MdEvent } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { DefaultTheme } from "styled-components";
interface Props {
  theme: DefaultTheme;
  toggleTheme(): void;
}
const Home: React.FC<Props> = ({theme, toggleTheme}) => {
  return (
    <div id="page-create-point">
      <form>
        <h1>Agenda <ThemeSwitcher toggleTheme={toggleTheme} /></h1> 
        <br />
        <br />
        <br />
        <ul className="items-grid">
          <Link to="/contatos/list">
            <li>
              <IoMdContact size={80} color={theme.title==='light' ? "#6C6C80" : "#F5F5F5"} />
              <span>Contatos</span>
            </li>
          </Link>
          <Link to="/locais/list">
            <li>
              <MdPlace size={80} color={theme.title==='light' ? "#6C6C80" : "#F5F5F5"} />
              <span>Locais</span>
            </li>
          </Link>
          <Link to="/eventos/list">
            <li>
              <MdEvent size={80} color={theme.title==='light' ? "#6C6C80" : "#F5F5F5"} />
              <span>Eventos</span>
            </li>
          </Link>
          <Link to="/tiposContato/list">
            <li>
              <RiContactsLine size={80} color={theme.title==='light' ? "#6C6C80" : "#F5F5F5"}/>
              <span>Tipos de Contato</span>
            </li>
          </Link>
          <Link to="/participantes/list">
            <li>
              <IoMdContacts size={80} color={theme.title==='light' ? "#6C6C80" : "#F5F5F5"} />
              <span>Participantes de evento</span>
            </li>
          </Link>
        </ul>
      </form>
    </div>
  );
};
export default Home;
