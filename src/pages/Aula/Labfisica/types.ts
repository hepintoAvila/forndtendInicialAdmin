export type Event = {
	end: any;
	start: any;
	title: string;
	className: string | string[];
};
export type SendEvent = {
	id?: number;
	title?: string;
	start?: Date;
	end?: Date;
	documento?:  number;
};
