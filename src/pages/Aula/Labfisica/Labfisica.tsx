import { Row, Col, Card, Button } from 'react-bootstrap';
import '@fullcalendar/react';
import FullCalendarWidget from './FullCalendarWidget';
import AddEditEvent from './AddEditEvent';
import { useCalendar } from './hooks';
import SidePanel from './SidePanel';
import { useAulas, useEstudiantes } from '@/hooks';
import { useEffect, useState } from 'react';
import { SendEvent } from './types';
import { config, encodeBasicUrl } from '@/common/helpers';


const Labfisica = () => {
		const { getDatosEstudiantesVisitas,documentoAnterior,estudiantes}  = useEstudiantes();
		const {aulas,aulasPrestamos,sendAulasRequest,addAulasRequest} = useAulas();
	const [datosform, setDatosForm] = useState<SendEvent>({} as unknown as SendEvent);
	const {
		isOpen,
		dateInfo,
		onOpenModal,
		onCloseModal,
		isEditable,
		eventData,
		onDateClick,
		onEventClick,
		onDrop,
		onEventDrop,
		onUpdateEvent,
		onRemoveEvent,
		onAddEvent,
	} = useCalendar();

 	useEffect(() => {
		const aulasDatos ={
                id: 1,
                title: "title",
                className: "className",
                textClass: "textClass"
            }
		const opcionesAulas = {
			accion: encodeBasicUrl(config.API_ADMIN_AULAS),
			opcion: encodeBasicUrl(config.API_OPCION_AULAS_CONSULTA),
			};
		 sendAulasRequest({ ObjetBodys: aulasDatos, opcionesAulas });
	  }, []);
    
	  const onChangeDocumento = (e: any) => {
 	    getDatosEstudiantesVisitas(e.target.value as any);
  	};

	useEffect(() => {
		
		if (isEditable) {
			setDatosForm({
				...eventData,
				id: eventData.id !== undefined ? Number(eventData.id) : undefined,
			} as SendEvent)
		} else {
			setDatosForm({
				...eventData,
				start: dateInfo.date,
				end: dateInfo.date,
				title: eventData.title ?? '',
				documento: 1
			} as unknown as SendEvent);
		}

	  }, [eventData,isEditable,dateInfo]);
	
	
	return (
		<>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Row>
								<Col xl={3}>
									<div className="d-grid">
										{/* add events */}
										<Button
											className="btn btn-lg font-16 btn-danger"
											id="btn-new-event"
											onClick={onOpenModal}
										>
											<i className="mdi mdi-plus-circle-outline me-5"></i> Registrar un nuevo Préstamo
										</Button>
									</div>

									<SidePanel aulas={aulas as any}/>
								</Col>
								<Col xl={9}>
									{/* fullcalendar control */}
									<FullCalendarWidget
										onDateClick={onDateClick}
										onEventClick={onEventClick}
										onDrop={onDrop}
										onEventDrop={onEventDrop}
										aulasPrestamos={aulasPrestamos}
									/>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* add new event modal */}
			{isOpen ? (
			<>
				<AddEditEvent
				isOpen={isOpen}
				onClose={onCloseModal}
				isEditable={isEditable}
				eventData={datosform as any}
				onUpdateEvent={onUpdateEvent as any}
				onRemoveEvent={onRemoveEvent as any}
				onAddEvent={onAddEvent as any}
				aulas={aulas as any}
				onChangeDocumento={onChangeDocumento}
				addAulasRequest={addAulasRequest as any}
				documentoAnterior={documentoAnterior as any}
				estudiantes={estudiantes as any}
				aulasPrestamos={aulasPrestamos as any}
				/>
			</>
			) : null}
		</>
	);
};

export { Labfisica };
