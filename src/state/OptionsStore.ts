import { create } from 'zustand'

interface OptionsState {
    selectedBlock: string | null;
    setSelectedBlock: (selectedBlock: string | null) => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
    selectedBlock: null,
    setSelectedBlock: (selectedBlock) => set(() => ({ selectedBlock })),
}))
