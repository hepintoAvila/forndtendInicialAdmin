export type Menu = {
	key: string;
	label: string;
	isTitle?: boolean;
	icon?: string;
	className?: string;
	url?: string;
	badge?: {
		variant: string;
		text: string;
	};
	parentKey?: string;
	target?: string;
	children?: Menu[];

} ;

 