import { create } from 'zustand'

export type LibraryComponent = {
    name: string;
    type: ComponentType;
    category: ComponentCategory;
}

export type BlockComponent = {
    id: string;
    type: ComponentType;
    children: BlockComponent[];
}

type ComponentCategory =
    'layout' |
    'ui';

type ComponentType =
    'block' |
    'flex' |
    'grid' |
    'button';

interface AppState {
    components: BlockComponent[]
    setComponents: (newState: BlockComponent[]) => void
}

export const useAppStore = create<AppState>((set) => ({
    components: [],
    setComponents: (newState) => set(() => ({ components: newState })),
}))
