import React, { CSSProperties } from 'react';

interface FlexProps {
    style: CSSProperties;
    children: React.ReactNode;
}

const UIFlex: React.FC<FlexProps> = ({ style, children }) => {
    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default UIFlex;