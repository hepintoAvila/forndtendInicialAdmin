
const getEstadoClase = (estado: string | undefined): string => {
  switch (estado) {
    case 'Libre':
      return 'bg-pcs text-black';
    case 'Ocupado':
      return 'bg-danger text-white';
    case 'Pendiente':
      return 'bg-warning text-black';
    default:
      return '';
  }
};

const EstadoComponent = ({pendientes,claseParpadeo}:any) => {
  const estados = ['Libre', 'Ocupado', 'Pendiente'];

  return (
    <div className="d-flex gap-3">
      {estados.map((estado) => (
        <div
          key={estado}
          className={`faq-question-q-box ${estado==='Pendiente' && pendientes>0?claseParpadeo:''} ${getEstadoClase(estado)}`}
          style={{ width: '50px', height: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',fontSize:'3rem'}}
        >
          
          {estado==='Pendiente' && pendientes>0?
            <small className="mt-0">{pendientes > 0 ? pendientes:0}</small>
          :<small style={{ fontSize:'0.5rem'}} >{estado}</small>}
        </div>
      ))}
    </div>
  )
};

export default EstadoComponent;