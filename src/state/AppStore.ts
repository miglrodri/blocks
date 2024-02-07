import { create } from 'zustand'
import { BlockComponent } from '../types'

interface AppState {
    components: BlockComponent[]
    setComponents: (newState: BlockComponent[]) => void
}

export const useAppStore = create<AppState>((set) => ({
    components: [],
    setComponents: (newState) => set(() => ({ components: newState })),
}))


// TODO adicionar funcao para adicionar um root block
// TODO adciionar funcao para adicionar um leaf block

// leaf block tem que ter um parent id que é usado para colocar nos seus children

// TODO adicionar options sidebar que vai ter os styles e que ficam guardados no block
// TODO adicionar funcao para update um block (update dos styles por exemplo)
