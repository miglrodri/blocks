import { CSSProperties } from 'react';
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

import { BlockComponent } from '../types'

export type BlockComponentsMap = Record<string, BlockComponent>;

interface AppState {
    components: BlockComponentsMap | null;
    addBlockComponent: (block: BlockComponent) => void;
    updateBlockComponent: (block: BlockComponent) => void;
    updateBlockComponentStyles: (id: string, style: CSSProperties) => void;
}

export const useAppStore = create<AppState>((set) => ({
    components: null,
    addBlockComponent: (block) => set((prevState) => {
        console.log('add', block);
        const newComponents = {
            ...prevState.components,
            [uuidv4()]: block,
        } as BlockComponentsMap;
        console.log('new components', newComponents);
        return { components: newComponents };        
    }),
    updateBlockComponent: (_) => set((prevState) => ({ components: prevState.components })),
    updateBlockComponentStyles: (id, style) => set((prevState) => {
        const oldComponent = prevState.components?.[id];
        const newComponents = {
            ...prevState.components,
            [id]: {
                ...oldComponent,
                style,
            },
        } as BlockComponentsMap;
        console.log('new components after styles', newComponents);
        return { components: newComponents };
    }),
}))


// TODO adicionar funcao para adicionar um root block
// TODO adciionar funcao para adicionar um leaf block

// leaf block tem que ter um parent id que é usado para colocar nos seus children

// TODO adicionar options sidebar que vai ter os styles e que ficam guardados no block
// TODO adicionar funcao para update um block (update dos styles por exemplo)

export const DUMMY = {
    '111': {
        parentId: null,
        type: 'flex',
        category: 'layout',
    },
    '222': {
        parentId: null,
        type: 'grid',
        category: 'layout',
    },
    '111-1': {
        parentId: '111',
        type: 'button',
        category: 'ui',
        content: 'Submit',
    },
    '111-2': {
        parentId: '111',
        type: 'flex',
        category: 'layout',
    }
} as BlockComponentsMap;
