
//call.js
setInterval(async () => {
  try {
       const credentialsUrl = {
        accion: encodeBasicUrl(config.API_ACCION_PCS),
        opcion: encodeBasicUrl(config.API_OPCION_PCS),
      };

    const ObjetBodys = {
          id_pc:0,
          estado:'Active',
        }
        const BodyData = generateBodyData(ObjetBodys);
        sendComputadores(credentialsUrl,BodyData);
 
  } catch (error) {
    console.error("Error al consultar notificaciones:", error);
  }

}, 5000); // 5000 milisegundos = 5 segundos