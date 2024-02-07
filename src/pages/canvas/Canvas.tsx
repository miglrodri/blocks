import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CanvasElements from './CanvasElements';
import { useAppStore } from '../../state/AppStore';
import { BlockComponent, LibraryComponent } from '../../types';

import styles from './Canvas.module.css'
import classNames from 'classnames';

const Canvas = () => {
    const { components, setComponents } = useAppStore();

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'BOX',
        canDrop: (item: LibraryComponent) => {
            // console.log('canDrop', item);
            return item.category === 'layout';
            // return (item.task_id === props.task_id ? true : false);
        },
        drop: (item: LibraryComponent, monitor) => {
            // Some code for the ondrop event to be executed...
            console.log('dropped on canvas', item, monitor.didDrop());
            !monitor.didDrop() && handleAddComponent({
                id: uuidv4(),
                type: item.type,
                category: item.category,
                children: [],
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
      
    return (
        <div className={styles.canvas}>
            <div
                ref={drop}
                role={'Dustbin'}
                className={classNames(styles.dropZone, { [styles.canDrop]: isOver && canDrop })}
                // style={{ backgroundColor: isOver && canDrop ? 'red' : 'white' }}
            >
                
                {
                    components.length === 0 &&
                    <div className={styles.empty}>
                        {isOver && canDrop ? 'Release to drop' : 'Drag a layout component here'}
                    </div>
                }
                {
                    components.length > 0 &&
                    <CanvasElements />
                }
            </div>
        </div>
    );
};

export default Canvas;