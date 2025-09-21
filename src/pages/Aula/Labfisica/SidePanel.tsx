import classNames from 'classnames';
 

interface AulaEvent {
	title: string;
	className: string;
	textClass?: string;
	// Add other properties if needed
}

interface SidePanelProps {
	aulas: AulaEvent[];
}

const SidePanel = ({ aulas }: SidePanelProps) => {
	return (
		<>
			<div id="external-events" className="m-t-20">
				<br />
				<p className="text-muted ms-5">Arrastre el salon hasta el calendario y asignele los valores que solicita el formulario</p>
				{/* external events */}
				{(aulas || []).map((event, index) => {
					return (
						<div
							key={index.toString()}
							className={classNames(
								'external-event',
								event.className + '-lighten ms-5',
								event.textClass
							)}
							title={event.title}
							data-class={event.className}
						>
							{event.title}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default SidePanel;
