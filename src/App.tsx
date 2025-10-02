 
import { NotificationProvider, ThemeProvider } from '@/common/context';
//import { useLocation, useNavigate } from 'react-router-dom';
import { Suspense} from 'react';
//import LandingPage from './pages/Landing';
import { PageLoader } from './components';
import { AuthProvider  } from './common/context/AuthContext';
import AppRoutes from './routes';
//import { useAuth0 } from '@auth0/auth0-react';

 

const App = () => {
  


  /*
if (!isAuthenticated) {
  return (
    <div className="auth-container">
      <h2>No estás autenticado</h2>
      <p>Por favor, inicia sesión para acceder a la aplicación.</p>
      <button className="btn-login" onClick={() => loginWithRedirect()}>
        Iniciar sesión
      </button>
    </div>
  );
}
  if (isLoading) {
    return <PageLoader />;
  }
  const ALLOWED_ROUTES = [
  'Account',
  'dashboard/tarjetas',
  'account/logout',
  'Agenda/calendario',
  'egresos/egresos',
  'VentasFacturadas',
  'ventasfacturadas',
  'Profesionales',
  'Servicios',
  'servicios',
  'Usuarios',
  'BaseClientes',
  'VentaProductos',
  'Abonos',
];
 // const [isSelected, setIsSelected] = useState(false);
  //const navigate = useNavigate();
  const appLocation = useLocation();

  useEffect(() => {
    const path = appLocation.pathname;
    setIsSelected(ALLOWED_ROUTES.some((route) => path.includes(route)));
  }, [appLocation]);

  const onChangeUrl = () => {
    navigate('Account/login/');
  };
*/

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        
        <ThemeProvider>
          <AuthProvider >
          <NotificationProvider>
                <AppRoutes />
          </NotificationProvider>
          </AuthProvider >
        </ThemeProvider>
         
        
        </Suspense>
    </>
  );
};

export default App;