import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: ${(props) => props.theme.colors.background_color};
    -webkit-font-smoothing: antialiased;
    color: ${(props) => props.theme.colors.text_color};
  }
  h1,
h2,
h3,
h4,
h5,
h6 {
  color: ${(props) => props.theme.colors.title};
  font-family: Ubuntu;
}
#page-create-point {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

#page-create-point table {
  width: 100%;
  text-align: center;
}

#page-create-point header {
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#page-create-point header a {
  color: ${(props) => props.theme.colors.title};
  font-weight: bold;
  text-decoration: none;

  display: flex;
  align-items: center;
}

#page-create-point header a svg {
  margin-right: 16px;
  color: ${(props) => props.theme.colors.text_color};
}

#page-create-point form {
  margin: 80px auto;
  padding: 64px;
  max-width: 1200px;
  background: ${(props) => props.theme.colors.form_background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

#page-create-point form h1 {
  font-size: 36px;
}

#page-create-point form fieldset {
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
}

#page-create-point form legend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

#page-create-point form legend h2 {
  font-size: 24px;
}

#page-create-point form legend span {
  font-size: 14px;
  font-weight: normal;
  color: ${(props) => props.theme.colors.text_color};
}

#page-create-point form .field-group {
  flex: 1;
  display: flex;
}

#page-create-point form .field {
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}
#page-create-point form .field input[type="datetime-local"] {
  flex: 1;
  background: ${(props) => props.theme.colors.background_color};
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text_color};
  text-align: center;
}

#page-create-point form .field input[type="text"],
#page-create-point form .field input[type="email"],
#page-create-point form .field input[type="number"] {
  flex: 1;
  background: ${(props) => props.theme.colors.background_color};
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text_color};
}

#page-create-point form .field select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;
  background: ${(props) => props.theme.colors.background_color};
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text_color};
}

#page-create-point form .field input::placeholder {
  color: ${(props) => props.theme.colors.text_color};
}

#page-create-point form .field label {
  font-size: 14px;
  margin-bottom: 8px;
}

#page-create-point form .field :disabled {
  cursor: not-allowed;
}

#page-create-point form .field-group .field + .field {
  margin-left: 24px;
}

#page-create-point form .field-group input + input {
  margin-left: 24px;
}

#page-create-point form .field-check {
  flex-direction: row;
  align-items: center;
}

#page-create-point form .field-check input[type="checkbox"] {
  background: ${(props) => props.theme.colors.background_color};
}

#page-create-point form .field-check label {
  margin: 0 0 0 8px;
}

#page-create-point form .leaflet-container {
  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-bottom: 24px;
}

#page-create-point form button {
  width: 260px;
  height: 56px;
  /* background: var(--primary-color); */
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text_color};
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  /* margin-top: 20px; */
  transition: background-color 0.2s;
  cursor: pointer;
}

#page-create-point form button.direita {
  float: right;
}

#page-create-point form th {
  padding: 5px;
}

/* #page-create-point form button:hover {
  background: #2fb86e;
} */

.items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
}

.items-grid li {
  background: ${(props) => props.theme.colors.background_color};
  border: 2px solid ${(props) => props.theme.colors.background_color};
  height: 180px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;
}

.items-grid li span {
  flex: 1;
  margin-top: 12px;

  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.text_color};
}

.items-grid li.selected {
  background: ${(props) => props.theme.colors.title};
  border: 2px solid #34cb79;
}

th button {
  max-width: 80px;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

button.themeSwitcher {
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 8rem;
  height: 4rem;
  float: right;
}

  
  `;
