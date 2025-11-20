import { Container, Row, Col, Card } from 'react-bootstrap';
import { LayoutDemo } from './types';
 
type LayoutsProps = {
	layouts: LayoutDemo[];
};

const Layouts = ({ layouts }: LayoutsProps) => {
	return (
		<section className="mt-4 bg-light border-top border-bottom border-light mb-5 py-3" id="features-landing">
			<Container>
				<Row>
					 <Col lg={12}>
					<Card className="text-black">
						<Card.Body>
						<div className="text-center">
							<h3> 
								<li className="d-none d-sm-inline-block"></li> Estadísticas de Visitas <span className="text-primary">en la Biblioteca</span>
							</h3>
							<p className="text-muted mt-2">
								Accede a los resultados de las visitas y obtén información valiosa en esta sección.
							</p>
						</div>
						</Card.Body>
						</Card>
					</Col>
				</Row>


			</Container>
		</section>
	);
};

export default Layouts;
