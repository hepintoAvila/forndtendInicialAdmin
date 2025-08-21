import { atom } from 'jotai'
interface Badge {
    variant: string;
    text: number;
  }
  
  interface MenuItem {
    key: string;
    label: string;
    isTitle: boolean;
    icon: string;
    badge?: Badge;
    url?: string;
    parentKey?: string;
    children?: MenuItem[];
  }
  
 

export const menuAtoms = atom<MenuItem[]>([]);