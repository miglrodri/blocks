import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import styles from './Canvas.module.css'
import { BlockComponent, LibraryComponent, useAppStore } from '../../state/AppStore';
import CanvasElements from './CanvasElements';
import { useCallback } from 'react';

const Canvas = () => {
    const { components, setComponents } = useAppStore();

    const [{ canDrop, isOver, item }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'BOX',
        canDrop: (item: LibraryComponent, monitor) => {
            console.log('canDrop', item);
            return item.category === 'layout';
            // return (item.task_id === props.task_id ? true : false);
        },
        drop: (item: LibraryComponent, monitor) => {
            // Some code for the ondrop event to be executed...
            console.log('dropped', item);
            handleAddComponent({
                type: item.type,
                children: [],
                id: uuidv4()
            });
        },
        // Props to collect
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          item: monitor.getItem(),
        })
    }), [components])

    const handleAddComponent = useCallback((item: BlockComponent) => {
        console.log('components', { components, item });
        setComponents([
            ...components,
            item,
        ]);
    }, [components, setComponents]);

    console.log('canvas item dropped?', item);
      
    return (
        <div className={styles.canvas}>
            <div
                ref={drop}
                role={'Dustbin'}
                className={styles.dropZone}
                style={{ backgroundColor: isOver ? 'red' : 'white' }}
                >
                {canDrop ? 'Release to drop' : 'Drag a box here'}
                
                <CanvasElements />
            </div>
        </div>
    );
};

export default Canvas;