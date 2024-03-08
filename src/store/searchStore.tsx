import { create } from 'zustand'
import { Character } from '../utils/type';

export interface userSearchState {
    searchText: string,
    setSearchText: (value: string) => void,

    characters: Character[],
    setCharacters: (value: Character[]) => void,
    
    showCharacters: Character[],
    setShowCharacters: (value: Character[]) => void,

    count: number,
    setCount: (value: number) => void,
    
    pageNum: number,
    setPageNum: (value: number) => void,
    
    totalPageCount: number,
    setTotalPageCount: (value: number) => void,
}

const userSearchStore = create<userSearchState>((set) => ({
    searchText: "",
    setSearchText: (value: string) => set((state) => ({ searchText: value })),

    characters: [],
    setCharacters: (value: Character[]) => set((state) => ({ characters: value })),

    showCharacters: [],
    setShowCharacters: (value: Character[]) => set((state) => ({ showCharacters: value })),

    count: 0,
    setCount: (value: number) => set((state) => ({ count: value })),

    pageNum: 1,
    setPageNum: (value: number) => set((state) => ({ pageNum: value })),
    
    totalPageCount: 1,
    setTotalPageCount: (value: number) => set((state) => ({ totalPageCount: value })),
}));

export default userSearchStore;