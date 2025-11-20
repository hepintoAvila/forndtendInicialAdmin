
import { Link } from 'react-router-dom';
import MaximizeScreen from './MaximizeScreen';
import ProfileDropdown from './ProfileDropdown';
import { useEffect, useState } from 'react';
import { config, encodeBasicUrl } from '@/common';
import useTurnos from '@/hooks/useTurnos';
import { Pc } from '@/pages/Aula/Aulavirtual/type';
import EstadoComponent from '@/pages/Aula/components/getEstadoClase';
 
interface DesktopNavbarProps {
  width: number;
  topbarDark: boolean;
  logo: string;
  logoDark: string;
  logoSm: string;
  logoDarkSm: string;
  handleLeftMenuCallBack: () => void;
  toggleMenu: () => void;
  navOpen: boolean;
  toggleDarkMode: () => void;
  avata1: string;
  profileMenus: any[];
  username: string;
  rolUser: string;
  handleRightCarrito: () => void;
  sendComputadores: (arg:any,arg2:any) => void;
    computadores: Pc[];
}

const DesktopNavbar=({
  width,
  topbarDark,
  logo,
  logoDark,
  logoSm,
  logoDarkSm,
  handleLeftMenuCallBack,
  toggleMenu,
  navOpen,
  toggleDarkMode,
  avata1,
  profileMenus,
  username,
  rolUser,
  computadores,
  handleRightCarrito,
  sendComputadores,
}:DesktopNavbarProps) => {
 
   const [pendientes, setPendientes] = useState(0);
   const {generateBodyData} = useTurnos();

useEffect(() => {
  const intervalId = setInterval(() => {
    const credentialsUrl = {
      accion: encodeBasicUrl(config.API_ACCION_PCS),
      opcion: encodeBasicUrl(config.API_OPCION_PCS),
    };

    const ObjetBodys = {
      id_pc: 0,
      pcselect: 0,
      estado: 'Active',
    }
    const BodyData = generateBodyData(ObjetBodys);
    sendComputadores(credentialsUrl, BodyData);

    const pcLibres = computadores?.filter(pc => pc.estado === 'Pendiente');
    const pendientesCount = pcLibres?.length || 0;
    setPendientes(pendientesCount);
    localStorage.setItem('pendientes', pendientesCount.toString());
  }, 5000);

  return () => {
    clearInterval(intervalId); 
  };
}, [computadores]);

  const claseParpadeo = pendientes > 0 ? 'parpadeo' : '';
  return (
    <div className={`navbar-custom ${width > 1140 ? '' : 'd-none'}`}>
      <div className="topbar container-fluid">
        <div className="d-flex align-items-center gap-lg-2 gap-1">
          <div className="logo-topbar">
            <Link to="/" className={topbarDark ? 'logo-light' : 'logo-dark'}>
              <span className="logo-lg">
                <img src={topbarDark ? logo : logoDark} alt="logo" />
              </span>
              <span className="logo-sm">
                <img src={topbarDark ? logoSm : logoDarkSm} alt="small logo" />
              </span>
            </Link>
          </div>

          <button className="button-toggle-menu" onClick={handleLeftMenuCallBack}>
            <i className="mdi mdi-menu" />
          </button>

          <button
            className={`navbar-toggle ${navOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            <div className="lines">
              <span />
              <span />
              <span />
            </div>
          </button>
          
        </div>

        <ul className="topbar-menu d-flex align-items-center gap-3">
          <EstadoComponent pendientes={pendientes} claseParpadeo={claseParpadeo}/>



          
           <li className="d-none d-md-inline-block">
            <MaximizeScreen />
          </li>
   
          <li className="dropdown">
            <ProfileDropdown
              picture={avata1}
              menuItems={profileMenus}
              username={username}
              userTitle={rolUser}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNavbar;