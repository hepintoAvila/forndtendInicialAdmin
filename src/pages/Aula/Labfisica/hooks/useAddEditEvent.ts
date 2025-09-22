import { useState } from 'react';
//import * as yup from 'yup';
import { EventInput } from '@fullcalendar/core';
import { SendEvent } from '../types';
//import { useForm } from 'react-hook-form';
//import { yupResolver } from '@hookform/resolvers/yup';
export default function useAddEditEvent(
	eventData: EventInput | undefined,
	isEditable: boolean,
	onUpdateEvent: (value: SendEvent) => void,
	onAddEvent: (value: SendEvent) => void
) {
	// event state
	const [event] = useState<any>({
		title: eventData?.title,
		start: eventData?.start,
		end: eventData?.end,
		identificacion: eventData?.identificacion,
	});
/*
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	const schema = yup.object().shape({
		title: yup.string().required('Please select Aula'),
		start: yup.string().required('Please select Fecha y Hora Inicial'),
		end: yup.string().required('Please select Fecha y Hora Final'),
		identificacion: yup.string().required('Please select identificacion'),
	});
const { handleSubmit} = useForm({
  resolver: yupResolver(schema),
});
*/
  const onSubmitEvent = ( data: SendEvent) => {
	console.log(data);
  	isEditable ? onUpdateEvent(data) : onAddEvent(data);
	
};

	return {
		event,
		onSubmitEvent,
	};
}
