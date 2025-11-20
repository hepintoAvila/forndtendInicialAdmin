import { Table } from '@/components';
import { Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { config } from '@/common';
 
import { Link } from 'react-router-dom';
import EditarRol from './EditarRol';
import CardTitle from '@/pages/components/CardTitle/CardTitle';
import useRoles from '../hooks/useRoles';

const Roles = () => {

  const {itemsRoles,
    setDatos,
      handleEdit,
      handleDelete,
      datos,
      rolSeleccionado,
      setShowEditarRol,
      showEditarRol,
      handleSave } = useRoles(config.API_URL_ROLES);
 
        useEffect(() => {
            setDatos((itemsRoles as Record<string, any>)['Roles']);
        }, [itemsRoles]);
  

  const columns = [
    {
      Header: 'Roles',
      accessor: 'rol',
      defaultCanSort: true,
    },
    {
      Header: 'Action',
      accessor: 'idRol',
      defaultCanSort: false,
      Cell: ({ row }: { row: any }) => (
        <>
          <Link to="" className="action-icon" onClick={() => handleEdit(row.original)}>
            <i className="mdi mdi-square-edit-outline"></i>
          </Link>
          <Link to="" className="action-icon" onClick={() => handleDelete(row.original)}>
            <i className="mdi mdi-delete"></i>
          </Link>
        </>
      ),
    },
  ];
//console.log('datos', datos);
  return (
    <>
            <Row>
                <Col sm={4}>
                </Col>
                <Col sm={8}>
                  <Card className="card-h-100">
                    <Card.Body>
                      {<CardTitle
                        containerClass="d-flex align-items-center justify-content-between mb-2"
                        title={''}
                        menuItems={[
                          {
                            label: 'Adjuntar Rol',
                            icon: 'mdi mdi-bookmark-box-multiple',
                            variant: 'text-primary',
                            onClick: () => handleEdit({
                              rol: 'Nombre del Rol',
                              idRol: 0
                            }),
                          },
                        ]}
                      />}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>  
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {Array.isArray(datos) && datos.length > 0 ? (
                <Table
                  columns={columns}
                  data={datos}
                  pageSize={10}
                  sizePerPageList={[
                    { text: '10', value: 10 },
                    { text: '20', value: 20 },
                    { text: '50', value: 50 },
                  ]}
                  isSortable={true}
                  pagination={true}
                  isSelectable={true}
                  isSearchable={true}
                  theadClass="table-light"
                  searchBoxClass="mb-2"
                />
              ) : (
                <p>No hay Roles </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    <EditarRol
        rolSeleccionado={rolSeleccionado!}
        show={showEditarRol}
        onHide={() => setShowEditarRol(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Roles;