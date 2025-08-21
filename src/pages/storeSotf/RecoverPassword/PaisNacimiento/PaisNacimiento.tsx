import Select from 'react-select';
import municipios from './municipios';
import departamentos from './departamentos';
import { Dispatch, SetStateAction } from 'react';

interface Option {
  value: string;
  label: string;
  departamento?: string;
}

interface PaisNacimientoProps {
  departamentoSeleccionado: Option | null;
  setDepartamentoSeleccionado: Dispatch<SetStateAction<Option | null>>;
  municipioSeleccionado: Option | null;
  setMunicipioSeleccionado: Dispatch<SetStateAction<Option | null>>;
  setValidedpto: Dispatch<SetStateAction<boolean>>;
  validDpto: boolean;
}
const PaisNacimiento = ({
  departamentoSeleccionado,
  setDepartamentoSeleccionado,
  municipioSeleccionado,
  setMunicipioSeleccionado,
  validDpto,
  setValidedpto,

}: PaisNacimientoProps) => {

  const handleDepartamentoChange = (selectedOption: Option | null) => {
    setDepartamentoSeleccionado(selectedOption);
    setMunicipioSeleccionado(null);
    setValidedpto(false);
  };

  const municipiosFiltrados = departamentoSeleccionado
    ? municipios.filter((municipio) => municipio.departamento === departamentoSeleccionado.value)
    : [];

  return (
    <div>
       <div>
        <label>Departamento:</label>
        <Select
          name="departamentos"
          className={`border ${validDpto ? 'border-danger' : ''}`}
          classNamePrefix="react-select"
          options={departamentos}
          value={departamentoSeleccionado}
          onChange={handleDepartamentoChange}
          placeholder="Seleccione un departamento"
        />
         {validDpto && <div className="text-danger">Por favor, seleccione un departamento</div>}
      </div>
      <div>
        <label>Municipio:</label>
        <Select
          name="municipios"
          className={`react-select ${validDpto ? 'border border-danger' : ''}`}
          classNamePrefix="react-select"
          options={municipiosFiltrados}
          value={municipioSeleccionado}
          onChange={(selectedOption) => setMunicipioSeleccionado(selectedOption)}
          placeholder="Seleccione un municipio"
          isDisabled={!departamentoSeleccionado}
        />
         {validDpto && <div className="text-danger">Por favor, seleccione un municipio</div>}
         
      </div>
    </div>
  );
};

export default PaisNacimiento;