import React from 'react'
import { Col, Row } from 'reactstrap'


const styleMessageErro =
{
    color: '#f86c6b',
    fontSize: '0.8rem',
    margin: '0',
    fontWeight: 'bold'
}

export const Message = (ordenNovalida) => {
    return (
        <Row style={{ display: !ordenNovalida ? 'none' : 'inline' }} >
            <Col md='12' xs='12'>
                <div style={{ textAlign: 'center', margin: '0' }}>
                    <span style={styleMessageErro}>
                        El número de documento no existe.
                    </span>
                </div>
            </Col>
        </Row>
    )
}
