import { BlockComponentsMap, useAppStore } from '../../state/AppStore';
import CanvasBlock from './CanvasBlock';

import styles from './CanvasElements.module.css'

const CanvasElements = () => {
    const components = useAppStore(state => state.components);

    const rootComponents = components && Object.keys(components).reduce((acc, key) => {
        const current = components[key];
        if (current.parentId === null) {
            return {
                ...acc,
                [key]: current,
            };
        }
        
        return {...acc};
    }, {} as BlockComponentsMap);

    return (
        <div className={styles.elements}>
            {
                rootComponents && Object.keys(rootComponents).map((id) => {
                    const component = rootComponents[id];

                    return (
                        <CanvasBlock
                            key={id}
                            id={id}
                            component={component}
                        />
                    );
                })
            }
        </div>
    );
};

export default CanvasElements;