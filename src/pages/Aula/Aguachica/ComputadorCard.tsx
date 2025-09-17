// ComputadorCard.tsx

import { Pc } from "./type";
interface ComputadorCardProps {
    computador: Pc;
    handleShowModal: (computador: Pc) => void;
}

const ComputadorCard = ({ computador, handleShowModal }: ComputadorCardProps) => {
    return (
        <div className="mb-3" onClick={() => handleShowModal(computador)}>
            <div className={`card h-100 p-4 py-4 ${computador.estado === 'Libre' ? 'bg-light text-black' : 'bg-danger text-white'}`} >
                <div className={`card-body ${computador.estado === 'Libre' ? 'bg-success' : 'bg-danger'}  shadow-sm rounded-2 h-100 ms-3 border-top border-bottom border-light`}>
                    <div className={`${computador.estado === 'Libre' ? 'bg-success' : 'bg-danger'} d-flex justify-content-between mb-3`}>
                        <div className={`flex-shrink-0`}>
                            <span className={`avatar-title text-primary ${computador.estado === 'Libre' ? 'bg-success' : 'bg-danger'} rounded`}>
                                <i className={`ri-macbook-fill font-24 `}></i>
                            </span>
                        </div>
                        <div className="flex-grow-1 ms-3" >
                            <h3 className="font-17 fw-bold">PC No.{computador.numero}</h3>
                            <p className="font-12 fw-bold">{computador.ip}</p>
                            <p className="font-12 fw-bold">{computador.estado}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComputadorCard;