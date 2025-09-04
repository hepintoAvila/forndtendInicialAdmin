import { Row, Col } from 'react-bootstrap';
import Statistics from './Statistics';
import CampaignsChart from './CampaignsChart';
import RevenueChart from './RevenueChart';
import Programas from './Programas';
import SalesChart from './SalesChart';
import useReportes from '@/hooks/useReportes';
import { useEffect } from 'react';
 
import Footer from '@/layouts/Footer';
import NavBar from '../Landing/NavBar';
import Layouts from '../Landing/Layouts';
import { layouts } from '../Landing/data';
import ContactUs from '../Landing/ContactUs';
 
type LandingPageProps = {
	onChangeUrl: (value: string) => void;
}; 

const CRMDashboard =({onChangeUrl}:LandingPageProps) => {
	 const { sendReportsRequest, reportes } = useReportes();

  useEffect(() => {
    sendReportsRequest();
  }, []);
	return (
		<>
			<NavBar/>
			<Layouts layouts={layouts} />
			
			<Statistics data={reportes} />

			<Row>
				<Col lg={5}>
					<CampaignsChart data={reportes} />
				</Col>
				<Col lg={7}>
					<RevenueChart  data={reportes}/>
				</Col>
			</Row>

			<Row>
				<Col xl={8} lg={12}>
					 <Programas data={reportes} />
				</Col>
				<Col xl={4} lg={6}>
					 <SalesChart data={reportes}  />
				</Col>
			</Row>
			<ContactUs />
			<Footer />
		</>
	);
};

export { CRMDashboard };
