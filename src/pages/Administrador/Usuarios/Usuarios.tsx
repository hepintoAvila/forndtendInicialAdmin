/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow

import { Table } from '@/components';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import {useEffect } from 'react';

import { config } from '@/common';
 
 
//import { columnsUsuario } from './formUsuarios/ColumnsSet';
import RegisterUsuarios from './formUsuarios/RegisterUsuarios';

import CardTitle from '@/pages/components/CardTitle/CardTitle';
import useUsuario from '../hooks/useUsuarios';
 
import { Link } from 'react-router-dom';
 
 
const Usuarios = () => {


    const { 
        setDatos,
        datos,
        itemsUsuarios,
        usuarioSeleccionado,
        setShowEditarUsuario,
        showEditarUsuario,
        handleSave,
        handleEdit,
        handleDelete,
        toggleImport,
        isOpenImport, 
        toggleRegister,
        isOpenRegister, 
        triggerFileInput,
        fileInputRef, 
        fileName,
        handleFileImport,
        previewData,
        confirmImport,
        columnsExport    
    } = useUsuario(config.API_ACCION_USUARIOS);
    
        useEffect(() => {
            setDatos((itemsUsuarios as Record<string, any>)['Usuarios']);
        }, [itemsUsuarios]);

    const columns = [
    {
      Header: 'primer_nombre',
      accessor: 'primer_nombre',
      defaultCanSort: true,
    },
       {
      Header: 'segundo_nombre',
      accessor: 'segundo_nombre',
      defaultCanSort: true,
    },
       {
      Header: 'primer_apellido',
      accessor: 'primer_apellido',
      defaultCanSort: true,
    },
       {
      Header: 'segundo_apellido',
      accessor: 'segundo_apellido',
      defaultCanSort: true,
    },{
      Header: 'documento',
      accessor: 'documento',
      defaultCanSort: true,
    },
    {
      Header: 'tipo_documento',
      accessor: 'tipo_documento',
      defaultCanSort: true,
    },
       {
      Header: 'email',
      accessor: 'email',
      defaultCanSort: true,
    },
       {
      Header: 'celular',
      accessor: 'celular',
      defaultCanSort: true,
    },
      
    {
      Header: 'tipo',
      accessor: 'tipo',
      defaultCanSort: true,
    },{
      Header: 'statut',
      accessor: 'statut',
      defaultCanSort: true,
    },
    {
      Header: 'Action',
      accessor: 'id_aspirante',
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
                            label: 'Importar usuarios',
                            icon: 'mdi mdi-bookmark-box-multiple',
                            variant: 'text-primary',
                            onClick: () => toggleImport,
                          },{
                            label: 'Nuevo usuario',
                            icon: 'mdi mdi-bookmark-box-multiple',
                            variant: 'text-primary',
                            onClick: () => toggleRegister,
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
                <p>No hay USUARIOS </p>
              )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal para registro de usuario */}
               <RegisterUsuarios
                usuarioSeleccionado={usuarioSeleccionado!}
                show={showEditarUsuario}
                onHide={() => setShowEditarUsuario(false)}
                onSave={handleSave}
                />
 

            {/* Modal para importación de usuarios */}
            <Modal show={isOpenImport} onHide={toggleImport} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Importar Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <p>Seleccione un archivo Excel o CSV con los datos de los usuarios. El archivo debe contener las columnas: id, identificacion, email,tipoUsuario.</p>
                        
                        <Button variant="primary" onClick={triggerFileInput}>
                            <i className="mdi mdi-file-excel"></i> Seleccionar archivo
                        </Button>
                        
                        {fileName && (
                            <div className="mt-2">
                                <span className="text-muted">Archivo seleccionado: </span>
                                <strong>{fileName}</strong>
                            </div>
                        )}
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileImport}
                            accept=".xlsx, .xls, .csv"
                            style={{ display: 'none' }}
                        />
                    </div>

                    {previewData && (
                        <div className="mt-3">
                            <h5>Vista previa de datos a importar ({previewData.length} registros)</h5>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <Table
                                    columns={columnsExport}
                                    data={previewData}
                                    pageSize={5}
                                    isSortable={true}
                                    pagination={false}
                                    isSearchable={false}
                                    theadClass="table-light"
                                />
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleImport}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={confirmImport}
                        disabled={!previewData || previewData.length === 0}
                    >
                        Confirmar Importación
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default Usuarios;
 