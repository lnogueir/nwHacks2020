import React from 'react'

function Overlay(props) {
    const childrenWithProps = React.Children.map(props.children, child => {
        return React.cloneElement(child, { toggleDisplay: props.toggleDisplay })
    });

    return (
        <div
            onClick={props.toggleDisplay}
            style={{ display: props.display ? 'block' : 'none' }}
            className="overlay"
        >
            <div onClick={e => e.stopPropagation()}>
                {childrenWithProps}
            </div>
        </div>
    )
}

export default Overlay;