import FullCalendar from '@fullcalendar/react';
import { EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
 


type FullCalendarWidgetProps = {
	onDateClick: (value: DateClickArg) => void;
	onEventClick: (value: EventClickArg) => void;
	onEventDrop: (value: EventDropArg) => void;
	onDrop: (value: DropArg) => void;
	aulasPrestamos: EventInput[] ;
};
const FullCalendarWidget = ({
	onDateClick,
	onEventClick,
	onDrop,
	onEventDrop,
	aulasPrestamos
}: FullCalendarWidgetProps) => {
 
 console.log('aulasPrestamos',aulasPrestamos);
	return (
		<>
			{/* full calendar control */}
			<div id="calendar">
				<FullCalendar
					locale={esLocale}
					initialView="dayGridMonth"
					plugins={[
						dayGridPlugin,
						interactionPlugin,
						timeGridPlugin,
						listPlugin,
						BootstrapTheme,
					]}
					handleWindowResize={true}
					themeSystem="bootstrap"
					buttonText={{
						today: 'Hoy',
						month: 'Mes',
						week: 'Semanas',
						day: 'Dias',
						list: 'Lista',
						prev: 'Prev',
						next: 'Sig',
					}}
					headerToolbar={{
						left: 'prev,next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
					}}
					editable={true}
					selectable={true}
					droppable={true}
					events={aulasPrestamos}
					dateClick={(arg: DateClickArg) => onDateClick(arg)}
					eventClick={(arg: EventClickArg) => onEventClick(arg)}
					drop={(arg: DropArg) => onDrop(arg)}
					eventDrop={(arg: EventDropArg) => onEventDrop(arg)}
					 eventContent={(arg) => {
						 const start = new Date(arg.event.start as any);
    					 const end = new Date(arg.event.end as any);
						return {
						html: `
							<div class="text-white text-center">
							<strong class="text-center">${arg.event.title}</strong>
							<p class="text-center">${start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
							</div>
						`,
						};
					}}
				/>
			</div>
		</>
	);
};

export default FullCalendarWidget;
