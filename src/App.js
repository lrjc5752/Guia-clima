
import React, {Fragment,useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {


      // state del formulario
      const [busqueda,guardarBusqueda]= useState({
        ciudad: '',
        pais: ''
      });
      const [consultar,guardarConsultar] = useState(false);
      const [resultado,guardarResultado] = useState({});
      const [error,guardarError] = useState(false);

      const {ciudad,pais} = busqueda;

    useEffect (() => {
      //console.log(ciudad);

        const consultarApi = async () => {
         if (consultar) {
          const appId = `83319068c07ceee97d4a2b6b19b8a78f`
          
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},
          ${pais}&appId=${appId}`;
   
          const respuesta = await fetch(url);
          const resultado = await respuesta.json(); 
          guardarResultado(resultado);
          guardarConsultar(false);

          guardarBusqueda({
            ciudad: '',
            pais: ''
          });
          // detecta si hubo resultados correctos en la consulta
          if (resultado.cod ==='404'){
            guardarError(true);
        } else{
          guardarError(false);
        };
         };
        }; 
  
      consultarApi();
      // eslint-disable-next-line
    },[consultar]); // detecta los cambios que pases como dependencias,'consultar' 
                      //para que no vaya consultando por cada caracter escrito

////// carga condicional de componentes///////////
    let componente;
    if (error){
      componente = <Error mensaje = 'No hay resultados'/>
    } else {
        componente = <Clima 
        resultado = {resultado}
        />
    };
////////////////////////////////////////////////////

      return (
    <Fragment>
      <Header
          titulo = 'Clima React Application'
      />
      <div className = 'contenedor-form'>
          <div className = 'container'>
              <div className = 'row'>
                 <div className = 'col m6 s12'>
                     <Formulario
                     busqueda = {busqueda}
                     guardarBusqueda = {guardarBusqueda}
                     guardarConsultar = {guardarConsultar}
                     />
                  </div>
                  <div className = 'col m6 s12'>
                    {componente}
                  </div>
              </div>
          </div>
      </div>
    </Fragment>
  );
}

export default App;
