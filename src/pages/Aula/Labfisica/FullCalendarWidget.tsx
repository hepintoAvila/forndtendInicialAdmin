import FullCalendar from '@fullcalendar/react';
import { EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
function convertirFechaATimestamp(eventos:any) {
  return eventos.map((evento: { start: string | number | Date; end: string | number | Date; }) => ({
    ...evento,
    start: new Date(evento.start).getTime(),
    end: new Date(evento.end).getTime(),
  }));
}
type FullCalendarWidgetProps = {
	onDateClick: (value: DateClickArg) => void;
	onEventClick: (value: EventClickArg) => void;
	onEventDrop: (value: EventDropArg) => void;
	onDrop: (value: DropArg) => void;
	events: Array<EventInput> ;
	aulasPrestamos: any ;
};
const FullCalendarWidget = ({
	onDateClick,
	onEventClick,
	onDrop,
	onEventDrop,
	events,aulasPrestamos
}: FullCalendarWidgetProps) => {
const eventosConTimestamp = convertirFechaATimestamp(aulasPrestamos);
console.log(eventosConTimestamp);
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
					events={eventosConTimestamp}
					dateClick={(arg: DateClickArg) => onDateClick(arg)}
					eventClick={(arg: EventClickArg) => onEventClick(arg)}
					drop={(arg: DropArg) => onDrop(arg)}
					eventDrop={(arg: EventDropArg) => onEventDrop(arg)}
				/>
			</div>
		</>
	);
};

export default FullCalendarWidget;
