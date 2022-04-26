import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";


const Header = ({ presupuesto,
                  setPresupuesto,
                  isValidPresupuesto,
                  setIsvalidPresupuesto,
                  gastos,
                  setGastos 
}) => {
  return ( 
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          gastos={gastos}
          setGastos={setGastos}
          setIsvalidPresupuesto={setIsvalidPresupuesto}
        />
      ):(
        <NuevoPresupuesto 
        presupuesto={presupuesto} // Enviamos el presupuesto al componente de nuevoPresupuesto por medio de props
        setPresupuesto={setPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}
      />
      )}
    </header>
   );
}
 
export default Header;