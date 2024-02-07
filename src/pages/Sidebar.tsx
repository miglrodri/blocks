
import { LibraryComponent } from '../state/AppStore';
import Library from './Library';

import styles from './Sidebar.module.css'

const Sidebar = () => {
    const layoutComponents = [
        {
            name: 'div',
            type: 'block',
            category: 'layout'
        },
        {
            name: 'flex',
            type: 'flex',
            category: 'layout'
        },
        {
            name: 'grid',
            type: 'grid',
            category: 'layout'
        }
    ] as LibraryComponent[];

    const uiComponents = [
        {
            name: 'button',
            type: 'button',
            category: 'ui'
        },
    ] as LibraryComponent[];

    return (
        <div className={styles.sidebar}>
            <Library
                title='Layout'
                components={layoutComponents}
            />

            <Library
                title='Other'
                components={uiComponents}
            />
        </div>
    );
};

export default Sidebar;