import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useThemeContext } from '@/common/context';
import { changeHTMLAttribute } from '@/utils';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
//const RightSidebar = React.lazy(() => import('../RightSidebar'));

const loading = () => <div className="text-center"></div>;
// Componente que usa el hook de permisos
const HorizontalLayout = () => {
    const { settings, updateMenu } = useThemeContext();

    /*
     * layout defaults
     */
    useEffect(() => {
        changeHTMLAttribute('data-layout', 'topnav');
        return () => {
            document.getElementsByTagName('html')[0].removeAttribute('data-layout');
        };
    }, []);

    useEffect(() => {
        changeHTMLAttribute('data-bs-theme', settings.theme);
    }, [settings.theme]);

    useEffect(() => {
        changeHTMLAttribute('data-layout-mode', settings.layout.mode);
    }, [settings.layout.mode]);

    useEffect(() => {
        changeHTMLAttribute('data-menu-color', settings.sidebar.theme);
    }, [settings.sidebar.theme]);

    useEffect(() => {
        changeHTMLAttribute('data-topbar-color', settings.topbar.theme);
    }, [settings.topbar.theme]);

    useEffect(() => {
        changeHTMLAttribute('data-layout-position', settings.layout.menuPosition);
    }, [settings.layout.menuPosition]);
    useEffect(() => {
        updateMenu();
    }, [settings.topbar.menu]);
    return (
        <div className={`content`}>
           
            <div className="ml-0" style={{ marginTop: '17rem' }}>
                <div className="cta-box">
                    <div style={{marginTop: "-6rem"}}>
           
                        <Container fluid className={`content`} style={{height: "26rem",display:"flex",flexWrap: "wrap",flexDirection: "row-reverse",alignContent: "center",justifyContent: "space-evenly"}}>
                            <Suspense fallback={loading()}>
                                    <div style={{ marginTop: '11rem' }} className="desktop-only">
                                        <h2>Solo disponible en dispositivos móviles</h2>
                                        <p>Por favor, acceda a esta página desde un dispositivo móvil.</p>
                                    </div>
                                <Outlet />
	                            </Suspense>
                        </Container>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default HorizontalLayout;
