export interface DraggableItem {
    id: string;
    type: BlockType;
    category: DraggableItemCategory;
}

type DraggableItemCategory =
    'layout' |
    'ui';

export type LibraryComponent = DraggableItem & {
    name: string;
}

export type BlockComponent = DraggableItem & {
    children: BlockComponent[];
}

export type BlockType =
    'block' |
    'flex' |
    'grid' |
    'button';
