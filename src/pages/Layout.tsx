import Canvas from "./canvas/Canvas";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Toolbar />
            <div className={styles.editor}>
                <Sidebar />
                <Canvas />
            </div>
        </div>
    );
};

export default Layout;