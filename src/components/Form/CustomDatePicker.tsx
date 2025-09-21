import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.min.css';

type DatepickerInputProps = {
	onClick?: () => void;
	value?: string;
	name?: string;
	inputClass: string;
	label: string;
	children?: React.ReactNode;
};

/* Datepicker with Input */
const DatepickerInput = forwardRef<HTMLInputElement, DatepickerInputProps>((props, ref) => {
	const onDateValueChange = () => {
		console.log('date value changed');
	};
	return (
		<input
			type="text"
			className="form-control date"
			onClick={props.onClick}
			value={props.value}
			name={props.name}
			onChange={onDateValueChange}
			ref={ref}
		/>
	);
});

/* Datepicker with Addon Input */
const DatepickerInputWithAddon = forwardRef<HTMLInputElement, DatepickerInputProps>(
	(props, ref) => (
    <div className="input-group" ref={ref}  style={{gridColumnGap: "0.5rem",height:"3rem"}}>
      <span className="input-group-text bg-light border-primary text-black ms-9" style={{height: "fit-content", width:"10rem",marginTop: "1rem",padding:"0.4rem", marginLeft: "0rem"}}>
          {props.label} 
        </span>
      <input
       style={{height: "fit-content",marginTop: "1rem",borderWidth:"0.1rem"}}
        type="text"
        className="form-control form-control-light border-primary"
        onClick={props.onClick}
        value={props.value}
        readOnly
      />
       <span className="bg-light border-primary" style={{height: "2.3rem", width:"3rem",marginTop: "1rem", padding: "0.1rem 0.2rem 0.4rem 0.8rem"}}>
      <i className="mdi mdi-calendar-range font-13 mt-9 me-5" style={{marginTop: "1rem"}}></i>
      </span>
    </div>
	)
);

type HyperDatepickerProps = {
	name: any;
	title: string;
	value: string | Date;
	onChange: (date: Date) => void;
	hideAddon?: boolean;
	inputClass?: string;
	dateFormat?: string;
	minDate?: Date;
	maxDate?: Date;
	className?: string;
	showTimeSelect?: boolean;
	tI?: number;
	timeFormat?: string;
	timeCaption?: string;
	showTimeSelectOnly?: boolean;
	monthsShown?: number;
	inline?: boolean;
};

const CustomDatePicker = (props: HyperDatepickerProps) => {
  
 const [selectedDate, setSelectedDate] = useState(props.value instanceof Date ? props.value : new Date(props.value || Date.now()));



  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    props.onChange(date);
  };

  // handle custom input
  const input =
    (props.hideAddon || false) === true ? (
      <DatepickerInput
        inputClass={props.inputClass ?? ''}
        value={selectedDate.toDateString()}
        name={props.name}
		    label={props.title}
      />
    ) : (
      <DatepickerInputWithAddon
        inputClass={props.inputClass ?? ''}
        value={selectedDate.toDateString()}
        name={props.name}
        label={props.title}
      />
    );
useEffect(() => {
  if (props.value) {
    setSelectedDate(props.value instanceof Date ? props.value : new Date(props.value));
  }
}, [props.value]);
 
  return (
    <>
      {/* date picker control */}
      <DatePicker
        customInput={input}
        required={true}
        timeIntervals={props.tI}
        className={classNames('form-control', props.inputClass)}
        selected={selectedDate}
        onChange={(date: Date) => handleDateChange(date)}
        showTimeSelect={props.showTimeSelect}
        timeFormat={props.timeFormat || 'hh:mm a'}
        timeCaption={props.timeCaption}
        dateFormat={props.dateFormat || 'MM/dd/yyyy'}
        minDate={props.minDate}
        maxDate={props.maxDate}
        monthsShown={props.monthsShown}
        showTimeSelectOnly={props.showTimeSelectOnly}
        inline={props.inline}
        autoComplete="off"
      />
      <input type="hidden" name={props.name} value={selectedDate.toISOString()} />
    </>
  );
};

export default CustomDatePicker;
