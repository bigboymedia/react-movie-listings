import React from 'react';

const Grid = (props) => {
    const renderElements = () => {
        const gridElements = props.children.map( (element, i) => {
            return (
                <li key={i} className="col-sm-6 col-md-4 col-lg-3 ">
                    {element}
                </li>
            )
        })
        return gridElements;
    }
    return (
        <ul className="grid clearfix">
            {renderElements()}
        </ul>
    )
}

export default Grid;
