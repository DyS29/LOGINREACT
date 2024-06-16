
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function Conversor() {
  const [texto, setTexto] = useState('');
  const [vozATexto, setVozATexto] = useState('');

  function cambiarTexto(evento) {
    setTexto(evento.target.value);
  }

  function convertirTexto() {
    const configuracion = new SpeechSynthesisUtterance(texto);
    speechSynthesis.speak(configuracion);
  }

  function resultado(evento) {
    setVozATexto(evento.results[0][0].transcript);
  }

  function grabarVozATexto() {
    const agente = new webkitSpeechRecognition();
    agente.lang = "es-ES";
    agente.start();
    agente.onresult = resultado;
  }

  return (
    <>
      <h1>Conversor TTS Y STT</h1>
      <br />
      <h3>Conversor de Texto a Voz</h3>
      <input type="text" name="texto" id="texto" value={texto} onChange={cambiarTexto} />
      <button onClick={convertirTexto}>Convertir</button>

      <h3>Conversor de Voz a Texto</h3>
      <button onClick={grabarVozATexto}>Grabar</button>
      {vozATexto}
    </>
  );

}
export default Conversor