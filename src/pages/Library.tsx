import DraggableUIComponent from "../components/DraggableUIComponent";
import { LibraryComponent } from "../state/AppStore";

import styles from './Library.module.css';

type PropTypes = {
    title: string;
    components: LibraryComponent[];
}

const Library = ({ title, components}: PropTypes) => {
    return (
        <div className={styles.library}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <div className={styles.list}>
                    {
                        components.map((component) => (
                            <div key={component.name}>
                                <DraggableUIComponent
                                    name={component.name}
                                    type={component.type}
                                    category={component.category}
                                />
                            </div>
                        ))
                    }
                </div>
        </div>
    );
};

export default Library;