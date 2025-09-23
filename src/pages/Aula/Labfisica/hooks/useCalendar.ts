import { useEffect, useState } from 'react';
import { DateClickArg, Draggable, DropArg } from '@fullcalendar/interaction';
import { DateInput, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import { useToggle } from '@/hooks';
import { Event, SendEvent,Aulas } from '../types';
import formatoFecha from '@/common/helpers/formatoFecha';
//import { defaultEvents } from '../data';

export default function useCalendar() {
 
	
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
		const aulaDataPrestamos = localStorage.getItem('Prestamos');
	    let aulasPrestamos: EventInput[] = aulaDataPrestamos ? JSON.parse(aulaDataPrestamos) : [];
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
		setDateInfo(arg);
		onOpenModal();
		setIsEditable(false);
	};

	// on event click
	const onEventClick = (arg: EventClickArg) => {
		
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
	const onAddEvent = (data: Event) => {
		let modifiedEvents = [...events];
		const event = {
			id: String(aulasPrestamos.length + 1),
			title: data.title,
			start: Object.keys(dateInfo).length !== 0 ? dateInfo.date : new Date(),
			end: Object.keys(dateInfo).length !== 0 ? dateInfo.date : new Date(),
			className: data.className,
		};
		modifiedEvents = [...modifiedEvents, event];
		setEvents(modifiedEvents);
		onCloseModal();
	};

	//  on update event
			const onUpdateEvent = (data: SendEvent) => {
			//console.log('onUpdateEvent', data);

			const modifiedEvents = [...events];
			const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
			  if (idx === -1) {
					onCloseModal();
					return; // Si no se encuentra el evento, no hacer nada
				}

			const aulaData = localStorage.getItem('Aulas');
			let appConfig: Aulas = aulaData ? JSON.parse(aulaData) : [];
			const datosAulas = appConfig.find((e) => e['id'] === eventData.id);

			 if (!datosAulas) {
					onCloseModal();
					return; // Si no se encuentra el objeto en appConfig, no hacer nada
				}

			modifiedEvents[idx]['title'] = datosAulas.title;
			modifiedEvents[idx]['className'] = data?.className;
			modifiedEvents[idx]['start'] = formatoFecha(data?.start as any);
			modifiedEvents[idx]['end'] = formatoFecha(data?.end as any);
			setEvents(modifiedEvents);
			onCloseModal();
			};

	// on remove event
	const onRemoveEvent = () => {
		var modifiedEvents = [...events];
		const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
		modifiedEvents.splice(idx, 1);
		setEvents(modifiedEvents);
		onCloseModal();
	};

	// on event drop
	const onEventDrop = (arg: EventDropArg) => {
		const modifiedEvents = [...events];
		const idx = modifiedEvents.findIndex((e) => e['id'] === String(arg.event.id!));
		modifiedEvents[idx]['title'] = arg.event.title;
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
