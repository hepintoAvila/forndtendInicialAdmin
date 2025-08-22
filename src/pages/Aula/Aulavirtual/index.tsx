import { config, encodeBasicUrl } from "@/common";
import { usePcs } from "@/hooks";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Pc } from "./type";
import { Link } from "react-router-dom";
import classNames from 'classnames';
const Aulavirtual = () => {
  const {  getComputadores, computadores } = usePcs();
  const credentialsUrl = {
    accion: encodeBasicUrl(config.API_ACCION_PCS),
    opcion: encodeBasicUrl(config.API_OPCION_PCS),
  };

  useEffect(() => {
    getComputadores(credentialsUrl);
  }, []);

const SidebarPcs = ({ computadores }: { computadores: Pc[] }) => {
  const computadoresOrdenados = computadores.sort((a, b) => parseInt(a.id_pc) - parseInt(b.id_pc));

  const columnas = [];
  for (let i = 0; i < computadoresOrdenados.length; i += 5) {
    columnas.push(computadoresOrdenados.slice(i, i + 5));
  }

  const mitad = Math.ceil(columnas.length / 2);
  const columnasInferiores = columnas.slice(0, mitad);
  const columnasSuperiores = columnas.slice(mitad);

  return (
    <nav className="d-flex flex-wrap justify-content-around ">
      <Row>
        {columnasSuperiores.map((columna, indexColumna) => (
          <div className="col-3" key={indexColumna}>
            {columna.map((computador, indexFila) => (
              <div className="mb-3"
                key={classNames('col-12', 'input-group-password', {
                  'show-password': computador.id_pc,
                })}
              >
                <Link to={`/pc/${computador.id_pc}`}>
                  <div className="card h-100 p-4 py-4">
                    <div className="card-body bg-light shadow-sm rounded-2 h-100 ms-3 border-top border-bottom border-light">
                      <div className="d-flex justify-content-between mb-3">
                        <div className="flex-shrink-0">
                          <span className="avatar-title bg-primary-lighten text-primary rounded">
                            <i className={`mdi mdi-computer font-24`}></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h3 className="font-16 fw-bold text-secondary">{computador.numero}</h3>
                          <p className="font-12 text-muted">{computador.ip}</p>
                          <p className="font-12 text-muted">{computador.estado}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </Row>
      <Row>
        {columnasInferiores.map((columna, indexColumna) => (
          <div className="col-2" key={indexColumna}>
            {columna.map((computador, indexFila) => (
              <div className="mb-3"
                key={classNames('col-12', 'input-group-password', {
                  'show-password': computador.id_pc,
                })}
              >
                <Link to={`/pc/${computador.id_pc}`}>
                  <div className="card h-100 p-4 py-4">
                    <div className="card-body bg-light shadow-sm rounded-2 h-100 ms-3 border-top border-bottom border-light">
                      <div className="d-flex justify-content-between mb-3">
                        <div className="flex-shrink-0">
                          <span className="avatar-title bg-primary-lighten text-primary rounded">
                            <i className={`mdi mdi-computer font-24`}></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h3 className="font-16 fw-bold text-secondary">{computador.numero}</h3>
                          <p className="font-12 text-muted">{computador.ip}</p>
                          <p className="font-12 text-muted">{computador.estado}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </Row>
    </nav>
  );
};
 return (
    <>
      {computadores && <SidebarPcs computadores={computadores} />}
    </>
  );
};

export default Aulavirtual;