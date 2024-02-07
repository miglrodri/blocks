import { useAppStore } from '../../state/AppStore';
import CanvasBlock from './CanvasBlock';

import styles from './CanvasElements.module.css'

const CanvasElements = () => {
    const rootComponents = useAppStore(state => state.components);

    return (
        <div className={styles.elements}>
            {
                rootComponents.map((component) => (
                    <CanvasBlock
                        key={component.id}
                        component={component}
                    />
                ))
            }
        </div>
    );
};

export default CanvasElements;