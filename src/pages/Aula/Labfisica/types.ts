export type Event = {
	end: any;
	start: any;
	title: string;
	className: string | string[];
};
export type SendEvent = {
	id?: number;
	title?: string;
	idPrestamos?: number;
	start?: Date;
	end?: Date;
	documento?:  number;
	className?: string | string[];
};
export type sendAulaPrestamos = {
	id?: number;
	idPrestamos?: number;
	title?: string;
	start?: string |Date;
	end?: string |Date;
	documento?:  number;
};
export type Aulas = {
	id?: number;
	idPrestamos?: number;
	title?: string;
	end: Date;
	start: Date;
	className: string | string[];
}[];
export type datosAulas = {
	id: number;
	idPrestamos?: number;
	title?: string;
	end: Date;
	start: Date;
	className: string | string[];
};