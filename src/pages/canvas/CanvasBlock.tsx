import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import { BlockComponent, BlockComponentsMap, LibraryComponent } from '../../types';
import { useAppStore } from '../../state/AppStore';
import UIFlex from '../../components/layout/UIFlex';

import styles from './CanvasBlock.module.css'
import UIGrid from '../../components/layout/UIGrid';
import { useOptionsStore } from '../../state/OptionsStore';
import { CSSProperties } from 'react';

type PropTypes = {
    id: string;
    component: BlockComponent;
}

const CanvasBlock = ({ id, component }: PropTypes) => {
    const { components, addBlockComponent } = useAppStore();
    const { selectedBlock, setSelectedBlock } = useOptionsStore();
    
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept: 'BOX',
        canDrop: () => {
            // console.log('canDrop', item);
            return component.category === 'layout';
            // return (item.task_id === props.task_id ? true : false);
        },
        drop: (item: LibraryComponent, monitor) => {
            // Some code for the ondrop event to be executed...
            console.log('dropped on block', item, monitor.didDrop());
            
            if (!monitor.didDrop()) {
                addBlockComponent({
                    parentId: id,
                    type: item.type,
                    category: item.category,
                    content: item.type === 'button' ? 'Submit' : undefined
                });
            }
        },
        // Props to collect
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          item: monitor.getItem(),
        })
    }), [components, addBlockComponent])

    const childComponents = components && Object.keys(components).reduce((acc, key) => {
        const current = components[key];
        if (current.parentId === id) {
            return {
                ...acc,
                [key]: current,
            };
        }
        
        return {...acc};
    }, {} as BlockComponentsMap);

    console.log('render block', { id, component });

    const renderChildren = () => {
        if (!childComponents || Object.keys(childComponents).length === 0) return <div style={{ height: '8rem' }}></div>;

        return Object.keys(childComponents).map((id) => {
            const block = childComponents[id];
            
            return (<CanvasBlock key={id} id={id} component={block} />);
        });
    };

    const defaulStyle = {
        height: '100%',
        backgroundColor: '#48CAE4',
    } as CSSProperties;

    let content = null;
    switch (component.type) {
        case 'block':
            content = (<div style={{ ...defaulStyle, ...component.style }}>{renderChildren()}</div>);
            break;
        case 'flex':
            content = (<UIFlex style={{ ...defaulStyle, ...component.style }}>{renderChildren()}</UIFlex>);
            break;
        case 'grid':
            content = (<UIGrid style={{ ...defaulStyle, ...component.style }}>{renderChildren()}</UIGrid>);
            break;
        case 'button':
            content = (<button style={{ ...component.style }}>{component.content}</button>);
            break;
    
        default:
            break;
    }

    return (
        <div
            key={id}
            ref={drop}
            role={'Blockbin'}
            data-id={id}
            className={classNames(styles.block,  {
                [styles.canDrop]: isOver && canDrop,
                [styles.selected]: selectedBlock === id
            })}
            onClick={(event) => {
                console.log(event.target);
                console.log({component});
                event.preventDefault();
                setSelectedBlock(id);
            }}
        >
            {content}
        </div>
    );
};

export default CanvasBlock;