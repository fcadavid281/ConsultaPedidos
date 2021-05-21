import React from 'react'

const DetallePedido = ({ ean, cantidad }) => {
    return (
        <>
            <tr>
                <td>{ean}</td>
                <td>{cantidad}</td>
            </tr>
        </>
    )
}
export {
    DetallePedido
}