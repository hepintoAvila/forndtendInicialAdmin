import { useEffect, useState } from 'react';
import { DateClickArg, Draggable, DropArg } from '@fullcalendar/interaction';
import { DateInput, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import { useAulas, useToggle } from '@/hooks';
import { SendEvent,Aulas } from '../types';
import Swal from 'sweetalert2';

function formatDateYearMonth(dateInput: Date | string | null) {
  if (!dateInput) return new Date();
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
function formatHoursMinutes(fecha: number) {

  const date = new Date(fecha);
  const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';

  return `${hours}:${minutes} ${ampm}`;
}
 function obtenerAulasPrestamos(): EventInput[] {
  const aulaDataPrestamos = localStorage.getItem('Prestamos');
  return aulaDataPrestamos ? JSON.parse(aulaDataPrestamos) : [];
}
function obtenerAulaPorId(id: number): Aulas | undefined {
  const aulaData = localStorage.getItem('Aulas');
  const appConfig: Aulas[] = aulaData ? JSON.parse(aulaData) : [];
  return appConfig.find((e:any) => e['id'] === id);
} 
export default function useCalendar() {
const {updateAulasRequest,addAulasRequest,deleteAulasRequest} = useAulas();
	
	/*
	 * modal handling
	 */
	const [isOpen, _toggle, show, hide] = useToggle();
	const onCloseModal = () => {
		hide();
		setEventData({});
		setDateInfo({} as DateClickArg);
	};
	const onOpenModal = () => show();
	const [isEditable, setIsEditable] = useState<boolean>(false);

	/*
	 * event data
	 */
	let aulasPrestamos: EventInput[] = obtenerAulasPrestamos();
	const [events, setEvents] = useState<EventInput[]>([...aulasPrestamos]);
	const [eventData, setEventData] = useState<EventInput>({});
	const [dateInfo, setDateInfo] = useState<DateClickArg>({} as DateClickArg);

	useEffect(() => {
		// create dragable events
		let draggableEl = document.getElementById('external-events');
		new Draggable(draggableEl!, {
			itemSelector: '.external-event',
		});
	}, []);

	/*
		calendar events
		*/

	// on date click
	const onDateClick = (arg: DateClickArg) => {
		//console.log('onDateClick',arg)
		setDateInfo(arg);
		onOpenModal();
		setIsEditable(false);
	};

	// on event click
	const onEventClick = (arg: EventClickArg) => {
		//console.log('onEventClick',arg)
		const event = {
			id: String(arg.event.id),
			title: arg.event.title,
			className: arg.event.classNames[0],
			start: arg.event.start ?? dateInfo.date,
			end: arg.event.end ?? dateInfo.date,
		};
		setEventData(event);
		onOpenModal();
		setIsEditable(true);
	};

	// on drop
	const onDrop = (arg: DropArg) => {
		const dropEventData = arg;
		const title = dropEventData.draggedEl.title;
		if (title == null) {
		} else {
			let newEvent = {
				id: String(events.length + 1),
				title: title,
				start: dropEventData ? dropEventData.dateStr : new Date(),
				className: dropEventData.draggedEl.attributes.getNamedItem('data-class')?.value,
			};
			const modifiedEvents = [...events];
			modifiedEvents.push(newEvent);
			setEvents(modifiedEvents);
			onOpenModal();
		}
	};

	// on add event
	const onAddEvent = (data: SendEvent) => {
		const datosAulas:any = obtenerAulaPorId(data.title as any);	
		
		if (!datosAulas || !datosAulas.title) {
			Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'No se encontró información de la aula',
			});
			return;
		}
		let modifiedEvents = [...events];
		const event = {
			id: String(events.length + 1),
			title: datosAulas.title,
			start: data.start,
			end: data.end,
			className: datosAulas.className,
			documento: datosAulas.documento,
		};
		addAulasRequest(event as any)	
		modifiedEvents = [...modifiedEvents, event];
		setEvents(modifiedEvents);
		onCloseModal();
	};

	//  on update event
	const onUpdateEvent = (data: SendEvent) => {
		let aulasPrestamos: EventInput[] = obtenerAulasPrestamos();
		const idx = Number(data.id) - 1;
		const datosAulas: any = obtenerAulaPorId(data?.title as any);

		if (!datosAulas || !datosAulas.title) {
			Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'No se encontró información de la aula',
			});
			return;
		}

		const datosactual = aulasPrestamos[idx];
		const eventSend = {
			id: data.id,
			title: datosAulas.title,
			start: data.start,
			end: data.end,
			documento: data.documento,
			idPrestamo: datosactual?.idPrestamo,
		};

		updateAulasRequest(eventSend as any, true);
		onCloseModal();
		};

	// on remove event
	const onRemoveEvent = (id:any) => {
		let aulasPrestamos: EventInput[] = obtenerAulasPrestamos();
		const datosactual =aulasPrestamos[id-1];
		deleteAulasRequest(datosactual.idPrestamo)
		onCloseModal();
	};

	// on event drop
	const onEventDrop = (arg: EventDropArg) => {
	const modifiedEvents = [...events];	
	const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);	
	const dropEventData = arg;
	const fecha:any = formatDateYearMonth(dropEventData.event.endStr);
	const id = idx === -1 ? Number(arg.event.id)-1 : idx-1;
	const start =formatHoursMinutes(arg.event.startStr as any);
	const end =formatHoursMinutes(arg.event.endStr as any);
	let aulasPrestamos: EventInput[] = obtenerAulasPrestamos();
	const datosactual =aulasPrestamos[id as number];
	const eventSend = {
			id:datosactual.id,
			title: modifiedEvents[idx]?.title?? arg.event.title,
			start:`${fecha} ${start}`,
			end: `${fecha} ${end}`,
			documento: datosactual.documento,
			idPrestamo: datosactual.idPrestamo,
		};	

		updateAulasRequest(eventSend as any,true)	
			  if (idx === -1) {
					return; // Si no se encuentra el evento, no hacer nada
				}

		const datosAulas:any = obtenerAulaPorId(eventData.title as any);

			 if (!datosAulas) {
					return; // Si no se encuentra el objeto en appConfig, no hacer nada
			}

		modifiedEvents[idx]['title'] = datosAulas.title;
		modifiedEvents[idx]['className'] = arg.event.classNames;
		modifiedEvents[idx]['start'] = arg.event.start as DateInput;
		modifiedEvents[idx]['end'] = arg.event.end as DateInput;
		setEvents(modifiedEvents);
		setIsEditable(false);
		
	};

	return {
		isOpen,
		dateInfo,
		onOpenModal,
		onCloseModal,
		isEditable,
		eventData,
		events,
		onDateClick,
		onEventClick,
		onDrop,
		onEventDrop,
		onUpdateEvent,
		onRemoveEvent,
		onAddEvent,
	};
}
