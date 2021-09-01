import React, { useEffect } from 'react'

import {
    Row, Col, CardFooter
} from 'reactstrap'

const DetallePedido = ({ ean, cantidad }) => {

    useEffect(() => {
        return () => {
            <div></div>
        }
    }, [ean])


    return (
        <>
            <tr>
                <td>{ean}</td>
                <td>{cantidad}</td>
            </tr>
        </>
    )
};


const FooterPedido = () => {
    return (
        <>
            <CardFooter>
                <Row className='column  parafo'>
                    <Col md='12' xs='12'>
                        <span>Para mayor información  comuníquese a las siguientes líneas:</span>
                    </Col>
                    <Col md='12' xs='12'>
                        <span>Whatsapp: 311 636 35 39</span>
                    </Col>
                    <Col md='12' xs='12'>
                        <span>Celular:  311 636 35 39</span>
                    </Col>
                    <Col md='12' xs='12' >
                        <span> Medellín: 604 444 62 62</span>
                    </Col>
                    <Col md='12' xs='12'>
                        <span>Bogotá:  601 482 482 9</span>
                    </Col>
                </Row>
            </CardFooter>
        </>

    )

}

export {
    DetallePedido,
    FooterPedido
}