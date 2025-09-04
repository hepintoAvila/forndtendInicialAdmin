import { Container, Row, Col } from 'react-bootstrap';
import { LayoutDemo } from './types';
 
type LayoutsProps = {
	layouts: LayoutDemo[];
};

const Layouts = ({ layouts }: LayoutsProps) => {
	return (
		<section className="py-5 bg-light-lighten border-top border-bottom border-light">
			<Container>
				<Row>
					 <Col lg={12}>
					
						<div className="text-center">
							<h3> 
								Estadísticas de Visitas <span className="text-primary">en la Biblioteca</span>
							</h3>
							<p className="text-muted mt-2">
								Accede a los resultados de las visitas y obtén información valiosa en esta sección.
							</p>
						</div>
					</Col>
				</Row>


			</Container>
		</section>
	);
};

export default Layouts;
