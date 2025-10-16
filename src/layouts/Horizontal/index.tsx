import { Suspense} from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
 
//import { useThemeContext } from '@/common/context';
//import { changeHTMLAttribute } from '@/utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
//const RightSidebar = React.lazy(() => import('../RightSidebar'));

const loading = () => <div className="text-center"></div>;
// Componente que usa el hook de permisos
const HorizontalLayout = () => {
//const { settings, updateMenu } = useThemeContext();
    return (
        <div className={`content `}>
           
            <div className="ml-0" style={{ marginTop: '5rem' }}>
                <div className="">
                    <div style={{marginTop: "0rem"}}>
                        <Container fluid className={`content`} style={{height: "26rem",display:"flex",flexWrap: "wrap",flexDirection: "row-reverse",alignContent: "center",justifyContent: "space-evenly"}}>
                           
                            <Suspense fallback={loading()}>
                                    <div style={{ marginTop: '11rem' }} className="desktop-only">
                                        <h2>Solo disponible en dispositivos móviles</h2>
                                        <p>Por favor, acceda a esta página desde un dispositivo móvil.</p>
                                    </div>
                                    <div style={{ marginTop: '11rem' }} className="mobile-only">
                                    <Outlet />
                                    </div>
                               
	                            </Suspense>
                        </Container>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default HorizontalLayout;
