import React from 'react'
import { Col, Row } from 'reactstrap'
import logo from '../../assets/Durespo_300px.png';


const Logo = () => {
    return (
        <Row>
            <Col md='1' xs='4'>
                <figure className="image">
                    <img src={logo} alt='Logo durespo' />
                </figure>
            </Col>
        </Row>
    )
}
export { Logo };
