import React from 'react';

function Tr(props) {
    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.mesa}</td>
                <td>{props.compra}</td>
                <td>{props.fecha}</td>
                <td>{props.total}</td>
            </tr>
        </>
    );
};

export default Tr;