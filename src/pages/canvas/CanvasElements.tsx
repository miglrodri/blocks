import { useAppStore } from '../../state/AppStore';
import CanvasBlock from './CanvasBlock';

import styles from './CanvasElements.module.css'

const CanvasElements = () => {
    const rootComponents = useAppStore(state => state.components);

    console.log('elements', rootComponents);

    return (
        <div className={styles.elements}>
            {
                rootComponents.map((component) => (
                    <CanvasBlock
                        key={component.id}
                        id={component.id}
                        type={component.type}
                        children={component.children}
                    />
                ))
            }
        </div>
    );
};

export default CanvasElements;