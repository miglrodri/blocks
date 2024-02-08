export interface DraggableItem {
    // id: string;
    type: BlockType;
    category: DraggableItemCategory;
}

type DraggableItemCategory =
    'layout' |
    'ui';

export type LibraryComponent = DraggableItem & {
    name: string;
}

export type BlockComponentsMap = Record<string, BlockComponent>;

export type BlockComponent = DraggableItem & {
    parentId: string | null;
    content?: string; // to store button text for example?
    style?: React.CSSProperties;
    children?: BlockComponentsMap;
}

export type BlockType =
    'block' |
    'flex' |
    'grid' |
    'button';
