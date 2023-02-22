import React from 'react'
import '../styles/Loading.css';

export const Loading = ({ cargar }) => {
    return (
        <>
            <div style={{ display: cargar ? 'none' : 'inline' }}
                className="fa-3x has-text-centered">
                <i className="fas fa-spinner fa-spin" />
            </div>
        </>
    )
}


