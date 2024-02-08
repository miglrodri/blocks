import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import { BlockComponent, LibraryComponent } from '../../types';
import { useAppStore } from '../../state/AppStore';

import styles from './CanvasBlock.module.css'

type PropTypes = {
    id: string;
    component: BlockComponent;
}

const CanvasBlock = ({ id, component }: PropTypes) => {
    const { components, addBlockComponent } = useAppStore();
    
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'BOX',
        // canDrop: (item: LibraryComponent) => {
        //     // console.log('canDrop', item);
        //     return item.category === 'layout';
        //     // return (item.task_id === props.task_id ? true : false);
        // },
        drop: (item: LibraryComponent, monitor) => {
            // Some code for the ondrop event to be executed...
            console.log('dropped on block', item, monitor.didDrop());
            
            addBlockComponent({
                parentId: component.parentId ? `${component.parentId}:${id}` : id,
                type: item.type,
                category: item.category,
            });
        },
        // Props to collect
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          item: monitor.getItem(),
        })
    }), [components])

    return (
        <div
            ref={drop}
            role={'Blockbin'}
            className={classNames(styles.block,  { [styles.canDrop]: isOver && canDrop })}
        >
            <div>
                id: {id}
            </div>
            <div>
                type: {component.type}
            </div>
            {
                component?.children && Object.keys(component.children).map((id) => {
                    const block = component.children?.[id];
                    
                    return (
                        <div key={id}>
                            <div>
                                {block?.type}
                                {block?.children && Object.keys(block.children).length ?'no children' : ''}
                                <CanvasBlock id={id} component={component} />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default CanvasBlock;