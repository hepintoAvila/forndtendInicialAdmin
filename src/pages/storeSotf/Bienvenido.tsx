
import { Row, Col, Container } from 'react-bootstrap';
import iconsaludo from '@/assets/images/icon-saludo.png';
import PageBreadcrumbBienvenido from '@/components/PageBreadcrumbBienvenido';
type BienvenidoProps = {
	datosUser?: any;
};

const Bienvenido = ({ datosUser }: BienvenidoProps) => {
 
	return (
		<>

			<Row>
				<Col xxl={12}>
					<PageBreadcrumbBienvenido title={`Bienvenido, ${datosUser?.Nom}`} subName="Dashboard" icon={iconsaludo} />
				</Col>
			</Row>
			<div className="account-pages pt-8 pt-sm-8 pb-8 pb-sm-8">
				<Container>
					<Row className="justify-content-center">
						<Col lg={12}>
						 {'Te damos la bienvenida a la plataforma..'}	
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

export default  Bienvenido ;
