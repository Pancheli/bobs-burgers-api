import React, { useState, useEffect } from "react";

function MyApi() {
  const [resultado, setResultado] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");

  useEffect(() => {
    consultarApi();
    console.log(resultado);
  }, []);

  const consultarApi = async () => {
    const data = await fetch(
      "https://bobsburgers-api.herokuapp.com/characters"
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
            <input type="text"
             onChange={onChangeText}
             placeholder="Buscar personaje" />

        </nav>
      <ul>
        {resultado
          .filter((item) => {
            return item.name.toLowerCase().includes(textoBuscar.toLowerCase());
          })
          .map((item) => (
            <li key={item.id}>
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
  );
}

export default MyApi;
