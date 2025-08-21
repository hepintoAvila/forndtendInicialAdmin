import { ReactNode } from 'react';
import { Row, Col} from 'react-bootstrap';
import { Helmet } from 'react-helmet';

 
type PageTitleProps = {
	title: string;
	subName?: string;
	children?: ReactNode;
	icon?: string;
};




const PageBreadcrumbBienvenido = ({ subName, title, children, icon }: PageTitleProps) => {
	return (
		<>
			<Helmet>
				<title>{title} | Facturasoft</title>
			</Helmet>
			{subName && (
				<Row>
					<Col>
						<div className="page-title-box">
								<h4 className="page-title title-bienvenido">
								{title}<img src={icon} className="icon-saludo" />
								{children ?? null}
							</h4>
						</div>
					</Col>
				</Row>
			)}
		</>
	);
};

export default PageBreadcrumbBienvenido;
