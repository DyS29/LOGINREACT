import { useEffect, useState } from 'react';
import './App.css';

function Usuarios({ recargar }) {
  const [usuarios, setUsuarios] = useState([]); // Cambiar `usuario` a `usuarios`

  async function obtenerUsuarios() {
    const peticion = await fetch(import.meta.env.VITE_HOSTBACKEND + 'usuarios', { credentials: 'include' });
    if (peticion.ok) {
      const respuesta = await peticion.json();
      setUsuarios(respuesta);
    }
  }

  async function eliminarUsuario(id) { // Cambiar `eliminarusuario` a `eliminarUsuario`
    const peticion = await fetch(import.meta.env.VITE_HOSTBACKEND + '/usuarios?id=' + id, {
      credentials: 'include', method: 'DELETE'
    });
    if (peticion.ok) {
      alert('Usuario eliminado');
      obtenerUsuarios();
    }
  }

  useEffect(() => {
    obtenerUsuarios();
  }, [recargar]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>usuario</th>
            <th>clave</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map(usuario => ( // Asegurarse de usar `usuarios` aquí
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.clave}</td>
                <td>
                  <button onClick={() => eliminarUsuario(usuario.id)}>x</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Usuarios;
