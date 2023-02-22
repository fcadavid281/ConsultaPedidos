import React from 'react';

export const DetallePedido = ({ items }) => {
    return (
        <>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                <div className="dropdown-item">
                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth parafo">
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(item => (
                                    <tr>
                                        <td>{item.ean}</td>
                                        <td>{item.cantidad}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
};

