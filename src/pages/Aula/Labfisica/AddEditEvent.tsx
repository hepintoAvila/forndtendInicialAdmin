import { Modal, Row, Col, Button,Form } from 'react-bootstrap';
import { EventInput } from '@fullcalendar/core';
import { CustomDatePicker } from '@/components';
import { Aulas, SendEvent } from './types';
import { useAddEditEvent } from './hooks';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EstudianteTable from '../components/EstudianteTable';
import EmptyTable from '../components/EmptyTable';

function formatDate(dateInput: Date | string | null) {
  if (!dateInput) return new Date();
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

type AddEditEventProps = {
	isOpen: boolean;
	onClose: () => void;
	isEditable: boolean;
	eventData: EventInput | SendEvent;
	onRemoveEvent: (value: SendEvent) => void;
	onUpdateEvent: (value: SendEvent) => void;
	updateAulasRequest: (arg:any,arg2:boolean) => void
	onAddEvent: (value: SendEvent) => void;
	aulas: any;
	aulasPrestamos: [];
	onChangeDocumento: (documento: number) => void;
	documentoAnterior: number;
	estudiantes: { documento: string }[] | undefined;
};

const AddEditEvent = ({
	isOpen,
	onClose,
	isEditable,
	eventData,
	onRemoveEvent,
	onUpdateEvent,
	onAddEvent,
	aulas,
	onChangeDocumento,
	documentoAnterior,
	estudiantes,
	aulasPrestamos
}: AddEditEventProps) => {
	const [start, setStar] = useState<Date | null>(null);
	const [end, setEnd] = useState<Date | null>(null);
	const [inicialFecha, setInicial] = useState<string | null>('');
	const [finalFecha, setFinal] = useState<string | null>('');
	const [totalesPrestamos, setTotalPrestamo] = useState<number | null>(0);
	const {onSubmitEvent } = useAddEditEvent(
		eventData as any,
		isEditable,
		onUpdateEvent,
		onAddEvent,
	);
	const [selectedAula, setSelectedAula] = useState('');
 
 
useEffect(() => {
  if (eventData.start !== undefined) {
    const startValue =
      Array.isArray(eventData.start)
        ? new Date(eventData.start.join('-'))
        : eventData.start;
    setStar(new Date(startValue));
  }
  if (eventData.end !== undefined) {
    const endValue =
      Array.isArray(eventData.end)
        ? new Date(eventData.end.join('-'))
        : eventData.end;
    setEnd(new Date(endValue));
  }
}, [eventData]);

useEffect(() => { 
	const dataFinal = end ? formatDate(end as Date) : formatDate(new Date());
	const dataInicial = start ? formatDate(start as Date) : formatDate(new Date());
setFinal(dataFinal as string);
setInicial(dataInicial as string);
}, [start, end]);

useEffect(() => {
  const isPrestamos = isEditable ? eventData.id : aulasPrestamos?.length ?? 0;
  setTotalPrestamo(isPrestamos as number);
}, [isEditable, eventData.id, aulasPrestamos]);


const aulaData = localStorage.getItem('Aulas');
let appConfig: Aulas = aulaData ? JSON.parse(aulaData) : [];
const datosAulas:any = appConfig.find((e) => e['title'] === eventData.title);

const datosDocument: any = aulasPrestamos?.find((e: any) => e['id'] == eventData.id);
//console.log('document',totalesPrestamos);

	return (
		<Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
			<Modal.Header className="pb-2 px-4 border-bottom-0" closeButton>
				<Modal.Title>
					<h5> {isEditable ? 'Editar Préstamo' : 'Adjuntar Nuevo Préstamo'} </h5>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="px-4 pb-4 pt-0">
				 
				<Form validated onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const sendEvent: SendEvent = {
						id: totalesPrestamos ??aulasPrestamos?.length,
						title: selectedAula??formData.get('title'),
						start: start ? start : new Date(
						Array.isArray(eventData.start)
							? eventData.start.join('-')
							: eventData.start ?? Date.now()
						).getTime() > new Date().getTime() ? new Date(
						Array.isArray(eventData.start)
							? eventData.start.join('-')
							: eventData.start ?? Date.now()
						) : new Date(),
						end: end ? end : new Date(),
						documento: Number(formData.get('documento')),
					};
					onSubmitEvent(sendEvent);
				}} className="position-relative bg-light mb-5">
					<Row>
						<Col sm={12}>
								<Form.Label>Aula Asignada al Préstamo:</Form.Label>
							<select
								className="form-select"
								name="title"
								key="title"
								value={selectedAula ? selectedAula : ''}
								required
								 onChange={(e) => setSelectedAula(e.target.value)}
							>
								{isEditable ? (
									<option key={eventData.id} value={datosAulas?.id}>{datosAulas?.title}</option>
									) : null}
								{(aulas || []).map((event: any, index: number) => {
									return (
									<option key={index.toString()} value={event.id} className={event.className}>
										{event.title}
									</option>
									);
								})}
							</select>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
						   <Form.Label>Fechas y Horas del Préstamo:</Form.Label>
							<CustomDatePicker
							inputClass="mt-5"
							name="start"
							key="start"
							title="Fecha y Hora Inicial"
							value={inicialFecha as string}
							 onChange={(date) => {
								setStar(date);
							if (end && date > end) {
								setEnd(null);
								Swal.fire({
									icon: 'error',
									title: 'Error',
									text: 'La fecha y hora inicial no puede ser mayor que la fecha y hora final',
								});
								}
							}}
							hideAddon={false} // mostrar o ocultar el addon
							showTimeSelect={true} // mostrar o ocultar la selección de hora
							timeFormat="HH:mm" // formato de hora
							dateFormat="MM/dd/yyyy hh:mm aa" // formato de fecha
							minDate={new Date()} // fecha mínima permitida
							maxDate={undefined} // fecha máxima permitida
							monthsShown={1} // número de meses a mostrar
							showTimeSelectOnly={false} // mostrar solo la selección de hora
							inline={false} // mostrar el calendario en línea
							/>
							</Col>
						</Row>
						<Row>
							<Col sm={12}>
							<CustomDatePicker
							inputClass="mt-5"
							name="end"
							key="end"
							title="Fecha y Hora Final"
							value={finalFecha as string}
							onChange={(date) => {
							 if (start && date <= start) {
								Swal.fire({
									icon: 'error',
									title: 'Error',
									text: 'La fecha y hora final debe ser mayor que la fecha y hora inicial',
								});
								} else {
								setEnd(date);
								}
							}}
							hideAddon={false} // mostrar o ocultar el addon
							showTimeSelect={true} // mostrar o ocultar la selección de hora
							timeFormat="HH:mm" // formato de hora
							dateFormat="MM/dd/yyyy hh:mm aa" // formato de fecha
							minDate={new Date()} // fecha mínima permitida
							maxDate={undefined} // fecha máxima permitida
							monthsShown={1} // número de meses a mostrar
							showTimeSelectOnly={false} // mostrar solo la selección de hora
							inline={false} // mostrar el calendario en línea
							/>
							</Col>
						</Row>
						<br/>
					<Row>
						<Col sm={12}>
						<Form.Group controlId="validation">
									  <Form.Label>Documento del solicitante:</Form.Label>
									  <Form.Control
										required
										type="number"
										name="documento"
										key="documento"
										placeholder=""
										 defaultValue={documentoAnterior || datosDocument?.documento}
										onChange={onChangeDocumento as any}
									  />
									  <Form.Control.Feedback type="invalid">
										Por favor, digite el documento
									  </Form.Control.Feedback>
									</Form.Group>
						</Col>
					</Row>
					<br/>
					<Row>
						<Col xs={4}>
							{isEditable ? (
								<Button variant="danger" onClick={()=>onRemoveEvent(totalesPrestamos as any)}>
									Delete
								</Button>
							) : null}
						</Col>
						<Col xs={8} className="text-end">
						<Button 
							variant="success" 
							type="submit" 
							className="btn btn-success" 
							disabled={
							(Array.isArray(estudiantes) && 
							estudiantes.length > 0 && 
							estudiantes[0]?.documento === '00000000') ||
							(Array.isArray(estudiantes) && estudiantes.length > 0 && !(estudiantes?.length > 0 && estudiantes[0]?.documento !== '00000000')) 
							}
						>
							Guardar
						</Button>
						</Col>
					</Row>
					<br/>
				</Form>
					{
					Array.isArray(estudiantes) && estudiantes.length > 0 ? (
						(estudiantes.length > 0 && estudiantes[0]?.documento === '00000000') ? (
						<EmptyTable mensaje="El Usuario no esta registrado" />
						) : (
						<EstudianteTable estudiantes={estudiantes} />
						)
					) : (
						<EmptyTable mensaje="No hay estudiantes registrados" />
					)
					}
			</Modal.Body>
		</Modal>
	);
};

export default AddEditEvent;
