import { generalAtoms } from '@/Atoms/general';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

 
export default function useToggleItems(): [
  (prevItems: any[]) => void,
  items: any[]
] {
  const [items, setItems] = useAtom(generalAtoms);

  const handleChange = useCallback((prevItems: any[]) => {
    setItems({...prevItems});
  }, [setItems]);

  return [
    handleChange,
    items,
  ];
}