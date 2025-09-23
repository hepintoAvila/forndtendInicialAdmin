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
	className?: string | string[];
};
export type sendAulaPrestamos = {
	id?: number;
	title?: string;
	start?: string;
	end?: string;
	documento?:  number;
};
export type Aulas = {
	id?: number;
	title?: string;
	end: Date;
	start: Date;
	className: string | string[];
}[];
export type datosAulas = {
	id: number;
	title?: string;
	end: Date;
	start: Date;
	className: string | string[];
};