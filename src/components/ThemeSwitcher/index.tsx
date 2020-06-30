import React, { useContext } from "react";
import { Container } from "./styles";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";

interface Props {
  toggleTheme(): void;
}

const ThemeSwitcher: React.FC<Props> = ({toggleTheme}) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <Container>
      <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offHandleColor="#6e6e6e"
        onHandleColor="#6e6e6e"
        offColor={colors.title}
        onColor={colors.primary}
      />
    </Container>
  );
};

export default ThemeSwitcher;
