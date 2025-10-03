import LoginEstudiante from '@/pages/account/LoginEstudiante';
import { useEffect, useState } from 'react';

const Login = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileDevices = ['android', 'iphone', 'ipad', 'ipod'];
        const isMobileDevice = mobileDevices.some(device => userAgent.includes(device));
        setIsMobile(isMobileDevice);
    }, []);

    const InicioLogin = () => {
        if (isMobile) {
            return (
                <section className="py-0 px-0 border-top border-bottom border-light" id="contact-us-landing">
                    <div style={{ marginTop: '11rem' }} className="desktop-only">
                        <h2>Solo disponible en dispositivos móviles</h2>
                        <p>Por favor, acceda a esta página desde un dispositivo móvil.</p>
                    </div>
                    <div className="mobile-only">
                        <LoginEstudiante />
                    </div>
                </section>
            );
        }
    };

    return <><InicioLogin /></>;
};

export default Login;