import React, { CSSProperties } from 'react';

interface GridProps {
    style: CSSProperties;
    children: React.ReactNode;
}

const UIGrid: React.FC<GridProps> = ({ style, children }) => {
    return (
        <div
            style={{
                display: 'grid',
                height: '100%',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default UIGrid;