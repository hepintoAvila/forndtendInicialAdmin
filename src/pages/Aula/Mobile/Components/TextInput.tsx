import { Form } from 'react-bootstrap';
import { Control, Controller, RegisterOptions, useForm } from 'react-hook-form';

type TextInputProps = {
	type: 'text' | 'email' | 'number';
	id?: string;
	name: string;
	value: string;
	className?: string;
	containerClass?: string;
	label?: string;
	placeholder?: string;
	bsPrefix?: string;
	helpText?: string;
	readOnly?: boolean;
	disabled?: boolean;
	errors?: any;
	control?: Control<any>;
	register?: RegisterOptions;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
	disabled,
	onChange,
	...props
}: TextInputProps) {
	const { control } = useForm();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Form.Group className={containerClass ?? ''}>
					{label && <Form.Label>{label}</Form.Label>}
					<Form.Control
						id={id}
						type={type}
						{...props}
						{...field}
						value={field.value ?? value}
						onChange={(e) => {
							field.onChange(e.target.value);
							if (onChange) {
								onChange(e as React.ChangeEvent<HTMLInputElement>);
							}
						}}
						placeholder={placeholder}
						className={`form-control` + (className ?? '')}
						isInvalid={Boolean(fieldState.error?.message)}
						disabled={Boolean(disabled)}
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
