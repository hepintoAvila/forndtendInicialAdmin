

//import { useAuth0 } from '@auth0/auth0-react';
//import { useEffect } from 'react';
//import useAuth from '@/pages/account/Login/useAuth';
import { usePermissions } from '@/hooks';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

 // Componente que usa el hook de permisos
 

const Sidebar = () => {
  const { getFilteredMenu} = usePermissions();
  const filteredMenu = getFilteredMenu();
  return (
    <nav className="d-flex flex-wrap justify-content-around " >
		<Row>
      {filteredMenu?.map(menuItem => (
		<div className="col-3">
		<Link 
              to={`${menuItem.entidad}`} 
              key={menuItem.key}
            >
        <div key={menuItem.key} className="card me-3 mb-3  h-100 p-4 py-4" style={{ width: '18rem' }}>
          <div className="card-body bg-light shadow-sm rounded-2 h-100 ms-3 border-top border-bottom border-light">
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
          </div>
        </div>
		</Link>
		</div>
      ))}
	  </Row>
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
