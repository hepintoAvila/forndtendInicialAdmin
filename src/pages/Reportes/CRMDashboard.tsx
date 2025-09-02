import { Row, Col } from 'react-bootstrap';
import Statistics from './Statistics';
import CampaignsChart from './CampaignsChart';
import RevenueChart from './RevenueChart';
import Products from './Products';
import SalesChart from './SalesChart';

const CRMDashboard = () => {
	return (
		<>
			<Statistics />

			<Row>
				<Col lg={5}>
					<CampaignsChart />
				</Col>
				<Col lg={7}>
					<RevenueChart />
				</Col>
			</Row>

			<Row>
				<Col xl={8} lg={12}>
					 <Products />
				</Col>
				<Col xl={4} lg={6}>
					 <SalesChart />
				</Col>
			</Row>
		</>
	);
};

export { CRMDashboard };
