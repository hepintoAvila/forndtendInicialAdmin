import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
	return (
		<Card>
			<Card.Header className="d-flex justify-content-between align-items-center">
				<h4 className="header-title">LISTA DE CONSULTAS POR PROGRAMAS</h4>
				<Link to="" className="btn btn-sm btn-light">
					Export <i className="mdi mdi-download ms-1"></i>
				</Link>
			</Card.Header>
			<Card.Body className="pt-0">
				<Table hover responsive className="mb-0">
					<tbody>
						<tr>
							<td>
								<h5 className="font-14 my-1 fw-normal">DERECHO</h5>
								<span className="text-muted font-13">April 2018</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">79.49</h5>
								<span className="text-muted font-13">Mañana</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">82</h5>
								<span className="text-muted font-13">Tarde</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">6,518.18</h5>
								<span className="text-muted font-13">Noche</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1 fw-normal">INGENERIA DE SISTEMAS</h5>
								<span className="text-muted font-13">March 2018</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">128.50</h5>
								<span className="text-muted font-13">Mañana</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">37</h5>
								<span className="text-muted font-13">Tarde</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">754.50</h5>
								<span className="text-muted font-13">Noche</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1 fw-normal">ENFERMERIA</h5>
								<span className="text-muted font-13">March 2018</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">39.99</h5>
								<span className="text-muted font-13">Mañana</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">64</h5>
								<span className="text-muted font-13">Tarde</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">2,559.36</h5>
								<span className="text-muted font-13">Noche</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1 fw-normal">AMBIENTAL</h5>
								<span className="text-muted font-13">March 2018</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">20.00</h5>
								<span className="text-muted font-13">Mañana</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">184</h5>
								<span className="text-muted font-13">Tarde</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">680.00</h5>
								<span className="text-muted font-13">Noche</span>
							</td>
						</tr>
						<tr>
							<td>
								<h5 className="font-14 my-1 fw-normal">Marco Shoes</h5>
								<span className="text-muted font-13">March 2018</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">28</h5>
								<span className="text-muted font-13">Mañana</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">69</h5>
								<span className="text-muted font-13">Tarde</span>
							</td>
							<td>
								<h5 className="font-14 my-1 fw-normal">965</h5>
								<span className="text-muted font-13">Noche</span>
							</td>
						</tr>
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
};

export default Products;
