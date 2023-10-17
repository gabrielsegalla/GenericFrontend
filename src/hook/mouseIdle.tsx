import React, { useEffect, useState } from 'react';

function MouseIdleDetector() {
  const [isMouseIdle, setIsMouseIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    function handleMouseMove() {
      // Quando o mouse se move, redefina o temporizador
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Se o mouse estiver parado por 5 segundos, defina isMouseIdle como true
        setIsMouseIdle(true);
        console.log('O mouse está parado por 5 segundos.');
      }, 5000); // 5000 milissegundos = 5 segundos
    }

    // Adicione um ouvinte de evento de movimento de mouse quando o componente é montado
    window.addEventListener('mousemove', handleMouseMove);

    // Remova o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Certifique-se de limpar o temporizador quando o componente for desmontado
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {isMouseIdle ? (
        <p>O mouse está parado por 5 segundos.</p>
      ) : (
        <p>O mouse está em movimento.</p>
      )}
    </>
  );
}

export default MouseIdleDetector;
