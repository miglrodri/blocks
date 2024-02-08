import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

import { BlockComponent } from '../types'

export type BlockComponentsMap = Record<string, BlockComponent>;

interface AppState {
    components: BlockComponentsMap | null;
    addBlockComponent: (block: BlockComponent) => void;
    updateBlockComponent: (block: BlockComponent) => void;
}

export const useAppStore = create<AppState>((set) => ({
    components: null,
    addBlockComponent: (block) => set((prevState) => {
        if (block.parentId === null) {
            // root element
            return {
                components: {
                    ...prevState.components,
                    [uuidv4()]: block,
                }
            };
        }

        // its a leaf element
        const tree = block.parentId.split(':');
        console.log('tree', tree);

        let current = prevState.components;
        for (let index = 0; index < tree.length; index++) {
            const id = tree[index];
            
            current = current?.[id].children as BlockComponentsMap;
        }

        return { components: prevState.components };
    }),
    updateBlockComponent: (block) => set((prevState) => ({ components: prevState.components })),
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
        children: {
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
                children: {
                    '111-2-1': {
                        parentId: '111:111-2',
                        type: 'block',
                        category: 'layout',
                    }
                }
            }
        },
    },
    '222': {
        parentId: null,
        type: 'grid',
        category: 'layout',
    }
} as BlockComponentsMap;
