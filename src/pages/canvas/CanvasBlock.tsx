import { BlockComponent } from '../../state/AppStore';
import styles from './CanvasBlock.module.css'

const CanvasBlock = (component: BlockComponent) => {
    const childComponents = component.children ?? [];

    console.log('component', component);

    return (
        <div className={styles.block}>
            id: {component.id}
            type: {component.type}
            {
                childComponents.map((component) => (
                    <div key={component.id}>
                        <div>
                            {component.type}
                            {component.children?.length ?? 'no children'}
                            <CanvasBlock
                                id={component.id}
                                type={component.type}
                                children={component.children}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CanvasBlock;