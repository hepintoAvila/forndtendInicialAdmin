import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3000); // tiempo de carga del preloader (3 segundos)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPreloader && (
        <div id="preloader" className="preloader">
          <div className="preloader-image" />
        </div>
      )}
    </>
  );
};

export default Preloader;