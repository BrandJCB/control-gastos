
import { useState } from 'react';
import Mensaje from './Mensaje';


const NuevoPresupuesto = ({ presupuesto, 
                            setPresupuesto, 
                            setIsvalidPresupuesto  
}) => {

  const [ mensaje, setMensaje] = useState('');

  const handlePresupuesto = (e)=>{
    e.preventDefault();
    if(!presupuesto || presupuesto < 0){ //Si no es un numero
      setMensaje('No es un presupuesto valido ');
      return;
    }

    setMensaje('');
    setIsvalidPresupuesto(true);

  }


  return ( 
    <div className="contenedor-presupuesto contenedor sombra">
      {/* En este caso al hacer submit se envara a una funcion y no a un archivo */}
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto" 
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input 
          type="submit" 
          value="Añadir"
        />

        {mensaje && <Mensaje tipo="error" >{mensaje}</Mensaje>}
      </form>
    </div>
   );
}
 
export default NuevoPresupuesto;