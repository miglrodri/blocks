import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { useCallback } from 'react';

import { BlockComponent, LibraryComponent } from '../../types';
import { useAppStore } from '../../state/AppStore';

import styles from './CanvasBlock.module.css'

type PropTypes = {
    component: BlockComponent;
}

const CanvasBlock = ({ component }: PropTypes) => {
    const { components, setComponents } = useAppStore();
    
    const childComponents = component.children ?? [];

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
            
            handleAddChildComponent({
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

    const handleAddChildComponent = useCallback((item: BlockComponent) => {
        console.log('components', { components, item });
        const newArray = components.map((oldComponent) => {
            if (oldComponent.id === component.id) {
                oldComponent.children = [...oldComponent.children, item]
            }

            return oldComponent;
        });
        setComponents([
            ...newArray
        ]);
    }, [components, setComponents]);

    return (
        <div
            ref={drop}
            role={'Blockbin'}
            className={classNames(styles.block,  { [styles.canDrop]: isOver && canDrop })}
        >
            id: {component.id}
            type: {component.type}
            {
                childComponents.map((component) => (
                    <div key={component.id}>
                        <div>
                            {component.type}
                            {component.children?.length ?? 'no children'}
                            <CanvasBlock component={component} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CanvasBlock;