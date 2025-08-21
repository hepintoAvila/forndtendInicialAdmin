import { Card, Col, Modal, Row } from "react-bootstrap";
import Spinner from "./Spinner";
import { useCallback, useEffect, useState } from "react";

/**
 * Renders the preloader
 */
export function useToggleLoader(
	initialState: boolean = false
): [boolean, () => void, () => void, () => void] {
	const [isLoader, setIsOpen] = useState(initialState);

	const showLoader = useCallback(() => setIsOpen(true), []);
	const hideLoader = useCallback(() => setIsOpen(false), []);
	const toggleLoader = useCallback(() => setIsOpen(!isLoader), [isLoader]);
	return [isLoader, toggleLoader, showLoader, hideLoader];
}

interface LoaderProps {
	isLoader: boolean;
	toggleLoader: () => void;

}
const Loader = ({isLoader,toggleLoader}: LoaderProps) => {
	const cerrarModalEmpleados = () => {
        toggleLoader();
      };
	useEffect(() => {
        if(isLoader){
            const temporizador = setTimeout(() => {
                cerrarModalEmpleados();
            }, 1000);
            return () => clearTimeout(temporizador);
        }

      }, [isLoader]); 

	return (
			<Row>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Modal show={isLoader} onHide={toggleLoader} centered={true} contentClassName="modal-spiner" >
                                <Spinner className="text-primary m-0" color="primary" size={'lg'} />
                            </Modal>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
	);
};

export default Loader;
