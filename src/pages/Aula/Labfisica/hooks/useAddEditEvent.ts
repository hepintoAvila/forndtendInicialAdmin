import { useState } from 'react';
//import * as yup from 'yup';
import { EventInput } from '@fullcalendar/core';
import { SendEvent } from '../types';
//import { config, encodeBasicUrl } from '@/common/helpers';
type AulaDatos = {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  documento: string;
};
 
export default function useAddEditEvent(
	eventData: EventInput | undefined,
	isEditable: boolean,
	onUpdateEvent: (value: SendEvent) => void,
	onAddEvent: (value: SendEvent) => void,
	addAulasRequest: (arg:AulaDatos,arg2:boolean) => void
) {
	// event state
	const [event] = useState<any>({
		title: eventData?.title,
		start: eventData?.start,
		end: eventData?.end,
		identificacion: eventData?.identificacion,
	});
const onSubmitEvent = (SendEvent: SendEvent) => {
		
	addAulasRequest(SendEvent as any,isEditable as boolean);
    isEditable ? onUpdateEvent(SendEvent) : onAddEvent(SendEvent);
}
	return {
		event,
		onSubmitEvent,
	};
}
 
