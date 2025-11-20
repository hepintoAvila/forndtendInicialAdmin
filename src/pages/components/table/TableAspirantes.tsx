import React, { useRef, useEffect, forwardRef, useState } from 'react';
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
import * as XLSX from 'xlsx';

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
  indeterminate?: any;
  children?: React.ReactNode;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div className="form-check">
        <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
        <label htmlFor="form-check-input" className="form-check-label"></label>
      </div>
    );
  }
);

// Definición de tipos para los datos
type Evaluacion = {
  id_aspirante: number;
  id_pregunta: number;
  area: number;
  nivel: string;
  cuestionario: string;
  titulo: string;
  respuesta: string;
  solucion: string;
};

export type Aspirante = {
  id_aspirante: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  documento: string;
  tipo_documento: string;
  celular: string;
  pais: string;
  colegio: string;
  grado: string;
  statut: string;
  Evaluaciones: Evaluacion[];
};

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
  exportButton?: boolean;
};

const TableAspirantes = <TableValues extends object = {}>(props: TableProps<TableValues>) => {
  const isSearchable = props['isSearchable'] || false;
  const isSortable = props['isSortable'] || false;
  const pagination = props['pagination'] || false;
  const isSelectable = props['isSelectable'] || false;
  const isExpandable = props['isExpandable'] || false;
  const sizePerPageList = props['sizePerPageList'] || [];
  const exportToExcel = () => {
    // Preparar datos planos (filas + subfilas)
    const flatData = props.data.flatMap((aspirante: any) => [
      // Fila principal (aspirante)
      {
        ...aspirante,
        Tipo: 'Aspirante',
        Evaluaciones: '', // Limpiamos este campo para evitar datos anidados
      },
      // Subfilas (evaluaciones)
      ...(aspirante.Evaluaciones?.map((evaluacion:any) => ({
        ...aspirante,
        ...evaluacion,
        Tipo: 'Evaluación',
        Evaluaciones: '', // Limpiamos este campo
      })) || [])
    ]);
  
    // Crear hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(flatData, {
      // Opciones para la hoja de cálculo
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Aspirantes');
  
    // Configurar la codificación de caracteres
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    function s2ab(s: string) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  
    // Exportar archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'aspirantes_evaluaciones.xlsx';
    link.click();
  };
// Función para exportar a CSV
const exportToCSV = () => {
  const flatData = props.data.flatMap((aspirante: any) => [
    // Fila principal (aspirante)
    {
      ...aspirante,
      Tipo: 'Aspirante',
      Evaluaciones: '', // Limpiamos este campo para evitar datos anidados
    },
    // Subfilas (evaluaciones)
    ...(aspirante.Evaluaciones?.map((evaluacion: any) => ({
      ...aspirante,
      ...evaluacion,
      Tipo: 'Evaluación',
      Evaluaciones: '', // Limpiamos este campo
    })) || [])
  ]);

  const csv = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(flatData));
  const BOM = '\ufeff'; // Agregar BOM (Byte Order Mark) para indicar UTF-8
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'aspirantes_evaluaciones.csv';
  link.click();
};
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

  const dataTable = useTable(
    {
      columns: props.columns as any,
      data: props['data'],
      initialState: { pageSize: props['pageSize'] || 10 },
      getSubRows: (row: any) => row.Evaluaciones, // Esto permite las subfilas
    },

    otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
    otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
    otherProps.hasOwnProperty('useExpanded') && otherProps['useExpanded'],
    otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
    otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],

    (hooks) => {
      isSelectable &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);

      isExpandable &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'expander',
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? '▼' : '►'}
              </span>
            ),
            Cell: ({ row }) =>
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? '▼' : '►'}
                </span>
              ) : null,
          },
          ...columns,
        ]);
    }
  );

  const rows = pagination ? dataTable.page : dataTable.rows;

  // Función para renderizar celdas con HTML seguro
  const renderCellWithHTML = (value: string) => {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
  };

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
  {props.exportButton && (
          <div className="btn-group">
            <button 
              onClick={exportToExcel}
              className="btn btn-success me-2"
            >
              Exportar a Excel
            </button>
            <button 
              onClick={exportToCSV}
              className="btn btn-primary"
            >
              Exportar a CSV
            </button>
          </div>
        )}
      <div className="table-responsive">
        <table
          {...dataTable.getTableProps()}
          className={classNames('table table-centered react-table', props['tableClass'])}
        >
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
                <React.Fragment key={index}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.column.id === 'titulo' && cell.value 
                            ? renderCellWithHTML(cell.value)
                            : cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && row.subRows && row.subRows.length > 0 && (
                    <tr>
                      <td colSpan={row.cells.length}>
                        <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                          <h5>Evaluaciones</h5>
                          <table style={{ width: '100%' }}>
                            <thead>
                              <tr>
                                <th>Área</th>
                                <th>COD</th>
                                <th>CODPREG</th>
                                <th>Pregunta</th>
                                <th>Respuesta</th>
                                <th style={{ width: '10%' }}>Solucion</th>
                                <th>Cuestionario</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.subRows.map((subRow, subIndex) => {
                                return (
                                  <tr key={subIndex}>
                                    <td>{renderCellWithHTML(subRow.original.area)}</td>
                                    <td>{renderCellWithHTML(subRow.original.codarea)}</td>
                                    <td>{subRow.original.codigopregunta}</td>
                                    <td>{renderCellWithHTML(subRow.original.titulo)}</td>

                                    <td>{subRow.original.respuesta}</td>
                                    <td>{subRow.original.solucion}</td>
                                    
                                    <td>{subRow.original.cuestionario}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
    </>
  );
};

export default TableAspirantes;