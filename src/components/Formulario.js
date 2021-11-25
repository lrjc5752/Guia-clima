import React, {useState}  from 'react';
import Error from './Error';
import PropTypes from 'prop-types';  // para documentar los componentes


const  Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {

// state del formulario

const [error,guardarError] = useState(false);

   // extraer ciudad y pais del state
   const {ciudad,pais} = busqueda;

   // funcion que coloca los elementos en el state
   const handleChange = evento  => {
        // actualizar el state
        guardarBusqueda({
            ...busqueda,[evento.target.name] : evento.target.value
        });

   };
   // cuando el usuario da submit al form 
    const handleSubmit = evento => {
        evento.preventDefault();

        // validar
        if (ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return
        }
        guardarError(false);

        // pasarlo al componente principal
            guardarConsultar(true);

    };

  return (
        <form
            onSubmit = {handleSubmit}
        >
            {error ? <Error mensaje = 'Ambos campos son obligatorios'/> : null}

            <div className = 'input-field col s12'>
                <input
                    type = 'text'
                    name = 'ciudad'
                    id = 'ciudad'
                    value = {ciudad}
                    onChange = {handleChange}
                />
                <label htmlFor = 'ciudad'>Ciudad:</label>
            </div>
            <div className = 'input-field col s12'>
                <select
                    name = 'pais'
                    id ='pais'
                    value = {pais}
                    onChange = {handleChange}
                >
                    <option value = ''>-- Seleccione un pais--</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor = 'pais'>Pais:</label>
            </div >

            <div className = 'input-field col s12'>
                    <input
                        type = 'submit'
                        value = 'Buscar Clima'
                        className = 'waves-effect waves-ligth btn-large btn-block yellow accent-4'
                    />
            </div>
        </form>
  );
}
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired,
}
export default Formulario;