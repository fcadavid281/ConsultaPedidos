
import React from 'react'
import { Col, CardFooter, FormGroup, Label } from 'reactstrap'

export const FooterPedido = () => {
    return (
        <CardFooter>
            <FormGroup row className='parafo'>
                <Col md='12' xs='12'>
                    <Label className='text-input'>Para mayor información  comuníquese a las siguientes líneas:</Label>
                </Col>
                <Col md='12' xs='12'>
                    <Label className='text-input'>Whatsapp: 311 636 35 39</Label>
                </Col>
                <Col md='12' xs='12'>
                    <Label className='text-input'>Celular:  311 636 35 39</Label>
                </Col>
                <Col md='12' xs='12' >
                    <Label className='text-input'> Medellín: 604 444 62 62</Label>
                </Col>
                <Col md='12' xs='12'>
                    <Label className='text-input'>Bogotá:  601 482 482 9</Label>
                </Col>
            </FormGroup>
        </CardFooter>
    )
}

