import React, { useState, useEffect } from "react";
import logo from "../img/logo.png";

function MyApi() {
  const [resultado, setResultado] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");

  useEffect(() => {
    consultarApi();
    console.log(resultado);
  }, []);

  const consultarApi = async () => {
    const data = await fetch(
      "https://bobsburgers-api.herokuapp.com/characters/"
    );
    const personajes = await data.json();
    setResultado(personajes);
  };

  const onChangeText = (e) => {
    setTextoBuscar(e.target.value);
  };

  return (
    <div className="App">
      <nav>
        <div className="main-nav">
          <img src={logo} alt="" />
          <input
            type="text"
            onChange={onChangeText}
            placeholder="Buscar personaje"
          />
        </div>
      </nav>
      <main>
        <div className="main-content">
          <ul>
            {resultado
              .filter((item) => {
                return item.name
                  .toLowerCase()
                  .includes(textoBuscar.toLowerCase());
              })
              .sort((a, b) => {
                return a.name.length > b.name.length ? 1 : -1;
              })
              .map((item) => (
                <li key={item.id.toString()}>
                  <img src={item.image} alt="" />
                  <ul>
                    <li>Nombre: {item.name}</li>
                    <li>Edad: {item.age}</li>
                    <li>Género: {item.gender}</li>
                    <li>Ocupación: {item.occupation}</li>
                    <li>Actor de Voz: {item.voicedBy}</li>
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default MyApi;
