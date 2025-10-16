import { Link } from 'react-router-dom';
import Select, { components } from 'react-select';
import classNames from 'classnames';
import { SearchOption } from './types';
import { groupByFields } from '@/utils';

type TopbarSearchProps = {
	options: SearchOption[];
	handleSelectPrograma: (event: any) => void;
};

/*
 * get options
 */
const optionGetter = (option: SearchOption) => {
	switch (option.type) {
		case 'programa':
			return (
				<Link to="" className={classNames('dropdown-item', 'notify-item', 'p-0')}>
					<i className={classNames(option.icon, 'font-16', 'me-1')}></i>
					<span>{option.label}</span>
				</Link>
			);
	
		default:
			return;
	}
};

/*
 * filter options
 */
const formatOptions = (options: SearchOption[]) => {
	const grouppedData = groupByFields(options, (item: SearchOption) => {
		return [item.type];
	});

	const formattedOptions = [];
	let count = 0;

	for (let i = 0; i < grouppedData.length; i++) {
		for (let j = 0; j < grouppedData[i].length; j++) {
			if (grouppedData[i][j].type === 'programa' && count === 0) {
				grouppedData[i].splice(j, 0, {
					label: 'programa',
					value: 'title',
					type: 'title',
				});
				count = 1;
			}
			formattedOptions.push(grouppedData[i][j]);
		}
	}
	return formattedOptions;
};

/* custom control */
const Control = (props: any) => {
	const { handleClick } = props.selectProps;
	return (
		<components.Control {...props} >

			{props.children}
			<span
				onMouseDown={handleClick}
				className="mdi mdi-magnify search-icon-container search-Control-container mdimagnify"

			></span>
		</components.Control>
	);
};
/* custom menu list */
const MenuList = (props: any) => {
	const { options } = props.selectProps;

	return (
		<components.MenuList {...props}>
			{/* menu header */}
			<div className="dropdown-header noti-title">
				<h5 className="text-overflow px-3 mb-2">
					resultados <span className="text-danger">{options.length}</span> encontrados
				</h5>
			</div>
			{props.children}
		</components.MenuList>
	);
};

/* fomates the option label */
const handleFormatOptionLabel = (option: SearchOption) => {
	const formattedOption = optionGetter(option);
	return <div>{formattedOption}</div>;
};

const TopbarSearch = ({ options,handleSelectPrograma }: TopbarSearchProps) => {
 
	return (
		<Select
			components={{ Control, MenuList }}
			placeholder={'Buscar'}
			options={formatOptions(options)}
			formatOptionLabel={handleFormatOptionLabel}
			isOptionDisabled={(option) => option.type === 'title'}
			maxMenuHeight={350}
			isSearchable
			isClearable
			name="programas"
			onChange={handleSelectPrograma}
			classNamePrefix="react-select"
		/>
	);
};

export default TopbarSearch;
