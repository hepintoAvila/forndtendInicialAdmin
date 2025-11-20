import { useCallback, useState } from 'react';



export function useToggleHistorials(
	initialState: boolean = false
): [boolean, () => void, () => void, () => void] {
	const [isOpenHistorials, setIsOpen] = useState(initialState);

	const showHistorials = useCallback(() => setIsOpen(true), []);
	const hideHistorials = useCallback(() => setIsOpen(false), []);
	const toggleHistorials = useCallback(() => setIsOpen(!isOpenHistorials), [isOpenHistorials]);
	return [isOpenHistorials, toggleHistorials, showHistorials, hideHistorials];
}
export default function useToggle(
	initialState: boolean = false
): [boolean, () => void, () => void, () => void] {
	const [isOpen, setIsOpen] = useState(initialState);

	const show = useCallback(() => setIsOpen(true), []);
	const hide = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

	return [isOpen, toggle, show, hide];
}