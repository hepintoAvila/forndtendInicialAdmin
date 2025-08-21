 
import { Form } from 'react-bootstrap';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
 
 
type DateInputProps = {
	type: 'time' | 'date' | 'week' | 'month';
	id?: string;
	name: string;
	value?: string;
	className?: string;
	containerClass?: string;
	label?: string;
	placeholder?: string;
	helpText?: string;
	readOnly?: boolean;
	disabled?: boolean;
	errors?: any;
	control?: Control<any>;
	register?: RegisterOptions;
	onChange: (name:string, newValue?: any) => void;
};

export default function DateInput({
	name,
	id,
	control,
	className,
	containerClass,
	label,
	placeholder,
	helpText,
	readOnly,
	errors,
	register,
	type,
	value,
	onChange,
	...props
}: DateInputProps) {
	
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass ?? ''}>
					{label && <Form.Label>{label}</Form.Label>}
					<Form.Control
						type={type}
						id={id}
						{...props}
						{...field}
						value={field.value ?? ''}
						onChange={(e) => {
							field.onChange(name,e.target.value);
							if (onChange) onChange(name,e.target.value); // Llama a onChange si está definido
						  }}
						placeholder={placeholder}
						readOnly={readOnly}
						className={className}
						isInvalid={Boolean(fieldState.error?.message)}
					/>
					{helpText && (
						<Form.Text id={`${name}-help`} muted>
							{helpText}
						</Form.Text>
					)}
					{errors && errors[name] && (
						<Form.Control.Feedback type="invalid">
							{errors[name]['message']}
						</Form.Control.Feedback>
					)}
				</Form.Group>
			)}
		/>
	);
}
