import { useEffect, useState } from 'react';
import './App.css';
import Usuarios from './Usuarios'
import Conversor from './Conversor'
import Registro from './Registro'


function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [logueado, setLogueado] = useState(false)
  const [recargar, setRecargar] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }
  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  function recargarAhora(evento) {
    setRecargar(!recargar)
  }
  async function ingresar() {
    const peticion = await fetch(import.meta.env.VITE_HOSTBACKEND + '/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
    } else {
      alert('Usuario o Clave incorrectos')
    }
  }

  async function validar() {
    const peticion = await fetch(import.meta.env.VITE_HOSTBACKEND + '/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
    }
  }

  useEffect(() => {
    validar()
  }, [])

  if (logueado) {
    return (
      <>
        <Registro recargarAhora={recargarAhora} />
        <Conversor />
        <Usuarios recargar={recargar} />
      </>)

  }
  return (
    <>
      <h1>Inicio de Sesión</h1>
      <input placeholder="Usuario" type="text" name="usuario" id="usuario" value=
        {usuario} onChange={cambiarUsuario} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value=
        {clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>


    </>
  );
}
export default App
