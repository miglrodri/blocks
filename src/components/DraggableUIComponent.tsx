import { useDrag } from "react-dnd";

import { LibraryComponent } from "../state/AppStore";

import styles from './DraggableUIComponent.module.css';

const DraggableUIComponent = ({ name, type, category }: LibraryComponent) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
      // "type" is required. It is used by the "accept" specification of drop targets.
      type: 'BOX',
      // The collect function utilizes a "monitor" instance (see the Overview for what this is)
      // to pull important pieces of state from the DnD system.
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        console.log('draggable', item, dropResult);
        // addTaskToSprint(task.id, dropResult.sprintId);
      },
      item: {
        name,
        type,
        category
      }
    }));

  
    return (
        <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
        {/* This is optional. The dragPreview will be attached to the dragSource by default */}
        {/* The drag ref marks this node as being the "pick-up" node */}
        <div role="Handle" ref={drag}>
            <div className={styles.component}>
                <div>
                    {name}
                </div>
                <div>
                    {type.toString()}
                </div>
            </div>
        </div>
    </div>
    );
};

export default DraggableUIComponent;
