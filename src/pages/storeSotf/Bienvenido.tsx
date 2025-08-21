
import { Row, Col } from 'react-bootstrap';
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
		</>
	);
};

export default  Bienvenido ;
