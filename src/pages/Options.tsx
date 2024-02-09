
import { useAppStore } from '../state/AppStore';
import { useOptionsStore } from '../state/OptionsStore';
import styles from './Options.module.css'

const Options = () => {
    const selectedBlock = useOptionsStore(state => state.selectedBlock);
    const {components, updateBlockComponentStyles} = useAppStore();

    console.log('options', selectedBlock);

    const currentBlock = selectedBlock ? components?.[selectedBlock] : null;

    const handleChangeStyle = (prop: string, value: string) => {
        if (!selectedBlock) return;

        updateBlockComponentStyles(selectedBlock, {
            ...currentBlock?.style,
            [prop]: value,
        })
    }

    return (
        <div className={styles.options}>
            <h2>
                Options
            </h2>
            {selectedBlock}
            {
                !currentBlock &&
                <div>Select a block</div>
            }
            {
                currentBlock &&
                <div>
                    <input
                        type="text"
                        value={currentBlock.style?.backgroundColor ?? ''}
                        onChange={({target: {value}}) => handleChangeStyle('backgroundColor', value)}
                    />
                </div>
            }
        </div>
    );
};

export default Options;