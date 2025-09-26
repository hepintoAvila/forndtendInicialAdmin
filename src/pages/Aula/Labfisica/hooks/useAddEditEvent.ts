import { useState } from 'react';
//import * as yup from 'yup';
import { EventInput } from '@fullcalendar/core';
import { SendEvent } from '../types';
import Swal from 'sweetalert2';
 
export default function useAddEditEvent(
	eventData: EventInput | undefined,
	isEditable: boolean,
	onUpdateEvent: (value: SendEvent) => void,
	onAddEvent: (value: SendEvent) => void,
) {
	// event state
	const [event] = useState<any>({
		title: eventData?.title,
		start: eventData?.start,
		end: eventData?.end,
		identificacion: eventData?.identificacion,
	});
const onSubmitEvent = (SendEvent: SendEvent) => {
console.log('onSubmitEvent',SendEvent);



if (new Date(SendEvent.start as Date).getTime() > new Date(SendEvent.end as Date).getTime()) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La fecha y hora inicial no puede ser mayor que la fecha y hora final',
    });
    return;
  }
if (Number(SendEvent.documento) <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Seleccione el documento',
    });
    return;
  }
  if (!SendEvent.start || !SendEvent.end) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La fecha y hora inicial y final son requeridas',
    });
    return;
  }

  //console.log('SendEvent', isEditable);
  isEditable ? onUpdateEvent(SendEvent) : onAddEvent(SendEvent);
};
	return {
		event,
		onSubmitEvent,
	};
}
 
