import React, { useRef, useEffect, forwardRef, useState, ChangeEvent, useMemo } from 'react';
import {
	useTable,
	useSortBy,
	usePagination,
	useRowSelect,
	useGlobalFilter,
	useAsyncDebounce,
	useExpanded,
	Column,
	Row,
	FilterValue,
} from 'react-table';
import classNames from 'classnames';
import { Pagination, PageSize } from './Pagination';

export type CellFormatter<T extends Object = {}> = {
	row: Row<T>;
};

type GlobalFilterProps = {
	preGlobalFilteredRows: any;
	globalFilter: any;
	setGlobalFilter: (filterValue: FilterValue) => void;
	searchBoxClass?: string;
};

const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
	searchBoxClass,
}: GlobalFilterProps) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState<any>(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<div className={classNames(searchBoxClass)}>
			<span className="d-flex align-items-center">
				Search :
				<input
					value={value || ''}
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder={`${count} records...`}
					className="form-control w-auto ms-1"
				/>
			</span>
		</div>
	);
};

type IndeterminateCheckboxProps = {
    indeterminate?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    title?: string;
    style?: React.CSSProperties;
    className?: string;
    role?: string;
    children?: React.ReactNode;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate, onChange, ...rest }, ref) => {
        const defaultRef = useRef<HTMLInputElement>(null);
        const resolvedRef = ref || defaultRef;

        useEffect(() => {
            if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate || false;
            }
        }, [resolvedRef, indeterminate]);

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			console.log('event',event.target.value);
            onChange(event); // Asegúrate de llamar al onChange proporcionado
        };

        return (
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    ref={resolvedRef}
                    onChange={handleChange}
                    {...rest}
                />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        );
    }
);

type TableProps<TableValues> = {
    isSearchable?: boolean;
    isSortable?: boolean;
    pagination?: boolean;
    isSelectable?: boolean;
    isExpandable?: boolean;
    sizePerPageList?: PageSize[];
    columns: ReadonlyArray<Column>;
    data: TableValues[];
    pageSize?: number;
    searchBoxClass?: string;
    tableClass?: string;
    theadClass?: string;
    onSelectionChange?: (selectedIds: any) => void;
};
 
const Table = <TableValues extends object = {}>(props: TableProps<TableValues>) => {
	const isSearchable = props['isSearchable'] || false;
	const isSortable = props['isSortable'] || false;
	const pagination = props['pagination'] || false;
	const isSelectable = props['isSelectable'] || false;
	const isExpandable = props['isExpandable'] || false;
	const sizePerPageList = props['sizePerPageList'] || [];
	const [checkedItems, setCheckedItems] = useState([{}]);
 
	 
	
	let otherProps: any = {};

	if (isSearchable) {
		otherProps['useGlobalFilter'] = useGlobalFilter;
	}
	if (isSortable) {
		otherProps['useSortBy'] = useSortBy;
	}
	if (isExpandable) {
		otherProps['useExpanded'] = useExpanded;
	}
	if (pagination) {
		otherProps['usePagination'] = usePagination;
	}
	if (isSelectable) {
		otherProps['useRowSelect'] = useRowSelect;
	}
 
const data = useMemo(() => props['data'] || [], [props['data']]);
 const columns = useMemo(() => props.columns || [], [props.columns]);
 
	const dataTable = useTable(
		{
			columns,
			data,
			initialState: { pageSize: props['pageSize'] || 10 },
		},

		otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
		otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
		otherProps.hasOwnProperty('useExpanded') && otherProps['useExpanded'],
		otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
		otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],

		(hooks) => {
			isSelectable &&
				hooks.visibleColumns.push((columns) => [
					// Let's make a column for selection
					{
						id: 'selection',
						Header: ({ getToggleAllPageRowsSelectedProps}:any ) => {
							const toggleProps = getToggleAllPageRowsSelectedProps();
							
							// Asegura que onChange no sea undefined
							const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
								toggleProps.onChange(e);
								const rows = pagination ? dataTable.page : dataTable.rows;
								const idsEstudiantes: number[] = [];
    
								if (props.onSelectionChange) {

									for (let i = 0; i < rows.length; i++) {
										// Verificamos que la fila tenga original y id_estudiante
										if (rows[i].original && 'id_estudiante' in rows[i].original) {
											const estudiante = rows[i]?.original as { id_estudiante: number };
											idsEstudiantes.push(estudiante.id_estudiante);
										}
									}
									//setCheckedItems((prevState) => ({ ...prevState, idSelect: idsEstudiantes }));
									if (e.target.checked) {
										setCheckedItems(prevState => [...new Set([...prevState, ...idsEstudiantes])]);
									} else {
										setCheckedItems(prevState => prevState?.filter((id: any) => !idsEstudiantes.includes(id)));
									}
									props.onSelectionChange(checkedItems);
								}
								
								//console.log('IDs capturados:', idsEstudiantes);
								// Lógica adicional si es necesaria
							};
					
							return (
								<IndeterminateCheckbox
									{...toggleProps}
									onChange={handleChange} // Siempre proporcionamos una función
									indeterminate={toggleProps.indeterminate}
								/>
							);
						},
						Cell: ({ row }: any) => {
							const toggleProps = row.getToggleRowSelectedProps();
							
							const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
								toggleProps.onChange(e);
								if (props.onSelectionChange) {

								if (e.target.checked) {
									// Agregar el valor a checkedItems
									setCheckedItems([...checkedItems, row.original.id_estudiante.toString()]);
									
								} else {
									// Eliminar el valor de checkedItems
									//const nuevoArray = checkedItems.slice(1);
									setCheckedItems([...new Set(checkedItems.filter(item => item !== row.original.id_estudiante.toString()))]);
								}
								 props.onSelectionChange(checkedItems);
								};
							};
							 
							return (
								<IndeterminateCheckbox
									{...toggleProps}
									onChange={handleChange} // Siempre proporcionamos una función
								/>
							);
						},
						width: 48,
					},
					...columns,
				]);

			isExpandable &&
				hooks.visibleColumns.push((columns) => [
					// Let's make a column for selection
					{
						// Build our expander column
						id: 'expander', // Make sure it has an ID
						Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
							<span {...getToggleAllRowsExpandedProps()}>
								{isAllRowsExpanded ? '-' : '+'}
							</span>
						),
						Cell: ({ row }) =>
							// Use the row.canExpand and row.getToggleRowExpandedProps prop getter
							// to build the toggle for expanding a row
							row.canExpand ? (
								<span
									{...row.getToggleRowExpandedProps({
										style: {
											// We can even use the row.depth property
											// and paddingLeft to indicate the depth
											// of the row
											paddingLeft: `${row.depth * 2}rem`,
										},
									})}
								>
									{row.isExpanded ? '-' : '+'}
								</span>
							) : null,
					},
					...columns,
				]);
		}
	);

	const rows = pagination ? dataTable.page : dataTable.rows;

	return (
		<>
			{isSearchable && (
				<GlobalFilter
					preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
					globalFilter={dataTable.state.globalFilter}
					setGlobalFilter={dataTable.setGlobalFilter}
					searchBoxClass={props['searchBoxClass']}
				/>
			)}

			<div className="table-responsive">
				 <table {...dataTable.getTableProps()} className={classNames('table table-centered react-table', props['tableClass'])} >
					<thead className={props['theadClass']}>
						{dataTable.headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column: any, index) => (
									<th
										{...column.getHeaderProps(
											column.defaultCanSort && column.getSortByToggleProps()
										)}
										className={classNames({
											sorting_desc: column.isSortedDesc === true,
											sorting_asc: column.isSortedDesc === false,
											sortable: column.defaultCanSort === true,
										})}
										key={index}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...dataTable.getTableBodyProps()}>
						{(rows || []).map((row, index) => {
							dataTable.prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={index} className="table-bottom-columns">
									{row.cells.map((cell) => {
										return (
											<td  className="text-center" {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
 			
			</div>

			{pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
		</>
	);
};

export { Table };
