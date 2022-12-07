import axios from "axios";
import React, { useState, useEffect} from "react";
import logo from "../img/logo.png";
import Pagination from "./Pagination";

function MyApi() {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultado, setResultado] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const itemsPerPage = 15;

  useEffect(() => {
    consultarApi();
    console.log(resultado);
  }, [currentPage]);

  const consultarApi = () => {
    axios("https://bobsburgers-api.herokuapp.com/characters/", {
      params: {
        sortBy: "name",
        OrderBy: "asc",
        limit: itemsPerPage,
        skip: itemsPerPage * currentPage
      }
    })
      .then((response) => {
        setResultado(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
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
            placeholder="Buscar personaje" />
        </div>
      </nav>
      <main>
        <div className="main-content">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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
              <li className="character" key={item.id.toString()}>
                <img src={item.image} alt="" />
                <ul className="data-item">
                  <li>Nombre: {item.name}</li>
                  <li>Edad: {item.age}</li>
                  <li>Género: {item.gender}</li>
                  <li>Ocupación: {item.occupation}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </main>
    </div>
  );
}

export default MyApi;