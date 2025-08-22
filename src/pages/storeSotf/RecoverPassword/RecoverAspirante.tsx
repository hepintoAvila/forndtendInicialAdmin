import { useTranslation } from 'react-i18next';
import { Link,  } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import AccountWrapper2 from './AccountWrapper';
import { Form, CustomDatePicker, PasswordInput } from '@/components';
//import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


 
 
import { useState } from 'react';
import PaisNacimiento from './PaisNacimiento/PaisNacimiento';

import TextInput from '@/components/TextInput';
import config from '@/common/helpers/config';
const  updateFormSchema = yup.object({
    login: yup.string().required('Por favor, digite su email').email('El email no es válido'),
	newpassword: yup.string().required('Por favor, digite su password').min(8, 'La contraseña debe tener al menos 8 caracteres'),
	primer_nombre: yup.string().required('Por favor, digite su primer nombre'),
	segundo_nombre: yup.string().default(''),
	primer_apellido: yup.string().required('Por favor, digite su primer apellido'),
	segundo_apellido: yup.string().required('Por favor, digite su segundo apellido'),
	direccion: yup.string().required('Por favor, digite su dirección'),
	tipo_documento: yup.string().required('Por favor, digite su tipo documento'),
	celular: yup.string().required('Por favor, digite su número de celular').matches(/^[0-9]+$/, 'El número de celular no es válido'),
});

const BottomLink = () => {
	//const {logout} = useAuth0();


		const logoutWithRedirect = (redirectUrl = window.location.origin) => {
			sessionStorage.removeItem('_AUTH');
			sessionStorage.removeItem('_MENU');
			window.location.href = redirectUrl;
		  };

	const { t } = useTranslation();
	return (
		<footer className="footer footer-alt">
			<p className="text-muted">
				 
				<Link to={'#'} className="text-muted ms-1" onClick={() => logoutWithRedirect()}>
					<b>{t('Regresar')}</b>
				</Link>
			</p>
		</footer>
	);
};
interface Option {
	value: string;
	label: string;
  }
const RecoverAspirante = () => {
 
	const { loading, recoverPassword } = useAuth();
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<Option | null>(null);
	const [municipioSeleccionado, setMunicipioSeleccionado] = useState<Option | null>(null);
	const [validDpto, setValidedpto] = useState(false);
  
	const { formState: { errors, touchedFields}} = useForm({
		resolver: yupResolver(updateFormSchema),
		mode: 'onTouched',
	  });
	  
	  const onSubmit = async (formData: {
		login: string;
		newpassword: string;
		primer_nombre: string;
		segundo_nombre?: string;
		primer_apellido: string;
		segundo_apellido: string;
		direccion: string;
		celular: string;
		tipo_documento: string;
	  }) => {

		if (!departamentoSeleccionado?.value || !municipioSeleccionado?.value) {
			setValidedpto(true);
			return;
		  }


		const data = { ...formData, 
			departamento: departamentoSeleccionado?.value,
			municipio: municipioSeleccionado?.value,
			documento:auth.Usuario };
		console.log('data', data);
	  
		try {
		   await recoverPassword(data,config.API_OPCION_ACTUALIZA_PASS);
		} catch (error) {
		  console.error('Login failed:', error);
		}
	  };
	const auth = JSON.parse(sessionStorage.getItem('_AUTH') || '{}');
	return (
		<>
		 
			{/*<PageBreadcrumb title="Registrarse" />*/}
			<AccountWrapper2 bottomLinks={<BottomLink />}>
				<p className="text-muted mb-4">
				<span className="text-muted font-13">Señor usuario, Ingresa los siguientes datos para validar tu identidad e ingresar a tu cuenta</span> 
				</p>
					 <Form
						onSubmit={onSubmit}
						schema={updateFormSchema}
						defaultValues={{
							login: '',
							newpassword: '',
							primer_nombre:'',
							segundo_nombre:'',
							primer_apellido:'',
							segundo_apellido:'',
							direccion: '',
							tipo_documento: '',
							celular: '', }}
					>
		 
 				<Card.Header className="bg-light-lighten border-top border-bottom border-left border-light py-1 text-center pb-2">
					<p className="m-0">
						<b>1.</b> DATOS DE PERSONALES
					</p>
				</Card.Header>
		<Card className="card bg-light">
			<Card.Body>

			<Row>
				<Col lg={6}>
				<div className="mb-3">				
			<TextInput
						name="primer_nombre"
						containerClass="mb-3"
						label="Primer Nombre"
						type="text"
						placeholder="Digite el primer nombre"
						errors={touchedFields.primer_nombre && errors.primer_nombre}
					/>	
						</div>
					</Col>
					<Col lg={6}>
					<div className="mb-3">						
			<TextInput
						name="segundo_nombre"
						containerClass="mb-3"
						label="Segundo Nombre"
						type="text"
						placeholder="Digite el segundo nombre"				
					/>	
				</div>
			</Col>	
			</Row>
			<Row>
				<Col lg={6}>
				<div className="mb-3">				
			<TextInput
						name="primer_apellido"
						containerClass="mb-3"
						label="Primer Apellido"
						type="text"
						placeholder="Digite el primer apellido"
						errors={touchedFields.primer_apellido && errors.primer_apellido}					
					/>	
						</div>
					</Col>
					<Col lg={6}>
					<div className="mb-3">						
			<TextInput
						name="segundo_apellido"
						containerClass="mb-3"
						label="Segundo Apellido"
						type="text"
						placeholder="Digite el segundo apellido"
						errors={touchedFields.segundo_apellido && errors.segundo_apellido}							
					/>	
				</div>
			</Col>	
			</Row>
			<Row>
				<Col lg={6}>
				<div className="mb-3">
				<label>Fecha de Nacimiento</label> <br />				
				<CustomDatePicker
											key="fecha_nacimiento"
											hideAddon={true}
											dateFormat="yyyy-MM-dd"
											value={selectedDate}
											onChange={(date) => {
												setSelectedDate(date);
											} } name={undefined}								/>
					</div>
					</Col>
					<Col lg={6}>
					<div className="mb-3">	
 
					<PaisNacimiento 
					departamentoSeleccionado={departamentoSeleccionado} 
					setDepartamentoSeleccionado={setDepartamentoSeleccionado} 
					setMunicipioSeleccionado={setMunicipioSeleccionado} 
					municipioSeleccionado={municipioSeleccionado} 
					validDpto={validDpto} 
					setValidedpto={setValidedpto} 
					 />	
				</div>
			</Col>	
			</Row>	
			<Row>
				<Col lg={6}>
				<div className="mb-3">				
			<TextInput
						name="direccion"
						containerClass="mb-3"
						label="Dirección"
						type="text"
						placeholder="Digite la direccion"
						errors={touchedFields.direccion && errors.direccion}
					/>	
						</div>
					</Col>
					<Col lg={6}>
					<div className="mb-3">						
			<TextInput
						name="celular"
						containerClass="mb-3"
						label="Celular"
						type="number"
						placeholder="Digite el numero del celular"
						errors={touchedFields.celular && errors.celular}
					
					/>	
				</div>
			</Col>	
			</Row>
			<Row>
				<Col lg={6}>
				<div className="mb-3">
				<TextInput
						name="documento"
						containerClass="mb-3"
						label="Documento de Identidad"
						type="text"
						placeholder={auth.Usuario}
						disabled={true}
					
					/>
					</div>
					</Col>
					<Col lg={6}>
					<div className="mb-3">
					{/*	
					<SelectInput
								name="tipo_documento"
								label="Tipo Documento"
								containerClass="mb-3"
								className="form-select"
								key="tipo_documento"
								errors={touchedFields.tipo_documento && errors.tipo_documento}
							>
								<option value={''}>Selecione el tipo de documento</option>
								<option value={'CC'}>Cédula de ciudadanía</option>
								<option value={'TI'}>Documento Nacional de Identidad</option>
								<option value={'PA'}>Pasaporte</option>
								<option value={'CE'}>Cédula de Extranjería</option>
			 
							</SelectInput>	
							*/}
				</div>
			</Col>	
			</Row>												
			</Card.Body>
		</Card>
		<Card.Header className="bg-light-lighten border-top border-bottom border-light py-1 text-center pb-2">
					<p className="m-0">
						<b>2.</b> DATOS DE SEGURIDAD
					</p>
				</Card.Header>		
		<Card className="card bg-light">
			<Card.Body>
			
					<TextInput
						name="login"
						containerClass="mb-3"
						label="Correo electrónico"
						type="email"
						placeholder="Digite su email"
						errors={touchedFields.login && errors.login}
					/>
				<PasswordInput
						label={'Digite el nuevo pasword'}
						name="newpassword"
						placeholder={''}
						type="password"
						containerClass="mb-3"
						errors={errors.newpassword ? { message: errors.newpassword.message } : undefined}						
					/>
					 
			</Card.Body>
		</Card>
					<div className="mb-0 text-center d-grid" >
						<Button variant="primary" type="submit" disabled={loading}>
							<i className="mdi mdi-lock-reset" />
							<p className="text-muted mb-0 ms-3">Registrarse</p>
						</Button>
					</div>
				</Form>
			</AccountWrapper2>
		</>
	);
};

export default RecoverAspirante;
