import { useState ,useEffect } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ 
                              presupuesto,
                              setPresupuesto, 
                              gastos,
                              setGastos,
                              setIsvalidPresupuesto
 }) => {

  const [porcentaje, setPorcentaje] = useState(0)

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce( (acumulado, gasto) => gasto.cantidad + acumulado, 0)
  
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

    
    setDisponible(totalDisponible)
    setGastado(totalGastado)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);

  }, [gastos])

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-ES',{
      style : 'currency',
      currency : 'MXN'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas Reiniciar el presupuesto y gastos?');
    if (resultado) {
        setGastos([])
        setPresupuesto(0)
        setIsvalidPresupuesto(false)
    }
  }

  return ( 
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div className="">
        <CircularProgressbar
        styles={buildStyles({
          pathColor : porcentaje > 100 ? '#DC2626' : '#3b82f6',
          trailColor : '#f5f5f5',
          textColor : porcentaje > 100 ? '#DC2626' : '#3b82f6'

        })} 
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> { formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}  `}>
          <span>Disponible: </span> { formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> { formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;