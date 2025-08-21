/* action column render */
import { CellFormatter, PageSize } from '@/components';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import { Column } from 'react-table';
 
 
import { useToggle, useToggleItems } from '@/hooks';
import { config } from '@/common';
import { useState } from 'react';
import { Usuario,respUsuario} from './type';
import useUsuario from '../../hooks/useRoles';
import RegisterUsuarios from './RegisterUsuarios';
 

/* order column render */
const ActionColumnUsuario= ({ row }: CellFormatter<respUsuario>) => {
  const { loading, sendDatos, redirectUrl } = useUsuario(config.API_URL_USUARIOS);
    const [isOpen, toggleDropdown] = useToggle();
    const [handleChange,items] = useToggleItems();
    const [options, setOptions] = useState<string>('');

    const SignUp = async (arg1: string, data: any,id:number) => {
       
        //console.log('row.original',row.original?.id);
        if(arg1==='delete') {
         sendDatos(data,config.API_OPCION_DELETE,config.API_ACCION_USUARIOS);
        }else{
          toggleDropdown();
          handleChange(data);
          setOptions(arg1);
        }

  
    };
    
       const initialFormValues: Usuario = {
        id_auteur: 1,
        nom: 'null',
        email: 'null',
        password: 'null',
       };
      
    return (
        <>
            <Link to="" className="action-icon" onClick={() => SignUp('edit', row.original,row.original?.id_auteur)}>
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="" className="action-icon" onClick={() => SignUp('delete', row.original,row.original?.id_auteur)}>
                <i className="mdi mdi-delete"></i>
            </Link>
            {isOpen && (
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <Modal show={isOpen} onHide={toggleDropdown}>
                                    <Modal.Body>
                                        <Modal.Header className="pb-2 px-4 border-bottom-0" closeButton></Modal.Header>
                                        <RegisterUsuarios
                                            option={options==='edit'? config.API_OPCION_UPDATE:config.API_OPCION_DELETE} 
                                            loading={loading}
                                            redirectUrl={redirectUrl}
                                            initialValues={items? items:initialFormValues}
                                            sendDatos={sendDatos as any}
                                        />
                                    </Modal.Body>
                                </Modal>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};
const sizePerPageList: PageSize[] = [
    {
        text: '10',
        value: 10,
    },
    {
        text: '20',
        value: 20,
    },
    {
        text: '50',
        value: 50,
    },
];
const columnsUsuario: ReadonlyArray<Column<any>> = [
    {
        Header: 'Nombres',
        accessor: 'nom',
        defaultCanSort: true,
    },
    {
        Header: 'email',
        accessor: 'email',
        defaultCanSort: false,
    },
    {
        Header: 'login',
        accessor: 'login',
        defaultCanSort: false,
    }, 
    {
        Header: 'Action',
        accessor: 'id_auteur',
        defaultCanSort: false,
        Cell: ActionColumnUsuario,
    },
];
 
export { columnsUsuario, sizePerPageList };
