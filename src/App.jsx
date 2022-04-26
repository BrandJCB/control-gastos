import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import { generarId } from './helpers';
/**
 * !Si se usa un state en diferentes componentes es mejor declarar el state en el componente principal, en este caso app.jsx 
 *
 */

function App() {
  
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [ gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [ gastoEditar, setGastoEditar] = useState({});

  const [ filtro, setFiltro ] = useState('')

  const [ gastosFiltrados, setGastosFiltrados ] = useState([])


  //Escuchara por los cambios que sucedan en el gastoEditar
  useEffect(() =>{
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true)
      }, 80);
    }
  }, [ gastoEditar ])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [ presupuesto ])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [ gastos ])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados);
      
    }
  }, [ filtro ])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true)
    }, 80);
  }

  const guardarGasto = (gasto) => {

    if (gasto.id) { //Si el gasto contiene un id este se va a actualizar 
      //? ACTTUALIZAR GASTO
      const gastosActualizados = gastos.map(gastoState => gastoState.id ===  gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    }else{ //Si e gasto no contiene un id significa que es un nuevo gasto
      //? NUEVO GASTO
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 200);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={presupuesto} // Enviamos el presupuesto al componente de header por medio de props
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto ? (
              <>
                <main>
                  <Filtros
                    filtro={filtro}
                    setFiltro={setFiltro}
                  />
                  <ListadoGastos 
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                  />
                </main>
                <div className="nuevo-gasto">
                <img 
                  src={IconoNuevoGasto}
                  alt='Icono Nuevo Gasto'
                  onClick={handleNuevoGasto}
                />
            </div>
              </>
      ) : null}

      {modal &&  <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                  />}

    </div>
  )
}

export default App
