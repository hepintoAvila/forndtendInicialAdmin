

//import { useAuth0 } from '@auth0/auth0-react';
//import { useEffect } from 'react';
//import useAuth from '@/pages/account/Login/useAuth';
 
import { Bienvenido, RecoverPassword } from './storeSotf';
import { Col, Row } from 'react-bootstrap';
 
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuth,usePermissions } from '@/hooks';
 // Componente que usa el hook de permisos
 

const Sidebar = () => {
  const { getFilteredMenu, hasPermission } = usePermissions();
  const filteredMenu = getFilteredMenu();

  return (
    <nav className="d-flex flex-wrap justify-content-around">
      {filteredMenu?.map(menuItem => (
        <div key={menuItem.key} className="card me-3 mb-3" style={{ width: '18rem' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <div className="flex-shrink-0">
                <div className="avatar-sm">
                  <span className="avatar-title bg-primary-lighten text-primary rounded">
                    <i className={`mdi mdi-${menuItem.icon} font-24`}></i>
                  </span>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h3 className="font-16 fw-bold text-secondary">{menuItem.label}</h3>
              </div>
            </div>
            {menuItem.children.map(child => (
              <Link 
                to={`/${menuItem.key}/${child.key}`} 
                key={child.key}
                style={{ 
                  display: hasPermission(menuItem.key, child.key, 'query') 
                    ? 'block' 
                    : 'none' 
                }}
              >
                <span className="font-12 fw-semibold text-muted">
                  <i className="mdi mdi-clock-time-four me-1"></i>
                  {child.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};
const Dashboard = () => {


	return  (
        <>
         <Sidebar />
        </>
      );
};

export default  Dashboard ;
