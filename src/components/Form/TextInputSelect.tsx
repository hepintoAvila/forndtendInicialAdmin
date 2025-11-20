import { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Control, Controller, RegisterOptions, useFormContext } from 'react-hook-form';

type TextInputProps = {
	type: 'text' | 'email' | 'number';
	id?: string;
	name: string;
	className?: string;
	containerClass?: string;
	label?: string;
	placeholder?: string;
	bsPrefix?: string;
	helpText?: string;
	value?:string |number | undefined;
	readOnly?: boolean;
	disabled?: boolean;
	errors?: any;
	control?: Control<any>;
	register?: RegisterOptions;
	maxLength?: number | undefined;
	onChange: (value: string | number) => void;
};

export default function TextInput({
	name,
	id,
	className,
	containerClass,
	label,
	placeholder,
	helpText,
	errors,
	register,
	type,
	value,
	maxLength,
	onChange,
	...props
}: TextInputProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass ?? ''}>
					{label && <Form.Label className={'form-label'}>{label}</Form.Label>}
					<Form.Control
						id={id}
						type={type}
						 
						{...props}
						{...field} // Spread de las propiedades de field de react-hook-form
						value={value ?? field.value ?? ''} // Asegurarse de que el valor esté controlado
						 
						maxLength={maxLength} 
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							field.onChange(e);
							onChange(e.target.value); // Llama a la función onChange que se pasa como prop
						  }}
						placeholder={placeholder}
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
