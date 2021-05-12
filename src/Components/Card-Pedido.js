import React from 'react'
import { useState } from 'react'
import {
    Label, Row, Col, Card, CardHeader,
    CardBody
} from 'reactstrap'
import '../css/App.css'
import { DetallePedido } from './Detalle-Pedido'
import { ordenesDePedidosActions } from '../_actions';
import { globalConstants } from '../_constants/global.constants'

const CardPedido = (detalle) => {

    const [numPedido, setNumPedido] = useState(detalle.pedido)
    const [items, setItems] = useState([])
    const [modico, setmodico] = useState(false)

    const datos = (e) => {

        setNumPedido(e.target.innerText);
        setmodico(!modico)
        
        if (!modico) {
            ordenesDePedidosActions.obtenerDetallePedido(numPedido).then(data => {
                if (data.estado === globalConstants.ESTADO_OK && data.resultado.length > 0) {
                    setItems(data.resultado);
                }
            })
        }
    }

    return (
        // 
        <div>
            <Row className='parafo'>
                <Col>
                    <Col>

                    </Col>
                    <Card body outline color="secondary">
                        <CardHeader>
                            <Label>
                                Numero de pedido:
                                <strong>
                                    <div className={modico ? 'dropdown is-active' : 'dropdown is-inactive'} >
                                        <div className="dropdown-trigger">
                                            <span onClick={datos} style={{ color: '#3298dc', borderBottom: '1px solid #3298dc', marginLeft: '15px', marginRight: '15px' }}> {detalle.pedido} </span>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                            <div className="dropdown-item">
                                                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth parafo">
                                                    <tr>
                                                        <th>Referencia</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                    <tbody>
                                                        {
                                                            items.map(item => <DetallePedido key={item.ean} {...item} />)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </strong>
                                <span>
                                    Fecha: <strong> {detalle.fechaPedido} </strong>
                                </span>
                            </Label>
                        </CardHeader>

                        <CardBody>
                            <Row>
                                <Col md='2' >
                                    <Label className='caja'>Nit:</Label>
                                </Col  >
                                <Col md='2'>{detalle.nit}</Col>
                                <Col md='1' >
                                    <Label className='caja'>Nombre:</Label>
                                </Col  >
                                <Col md='3'> {detalle.sucursal} </Col>
                                <Col md='1' >
                                    <Label className='caja'>Dirección:</Label>
                                </Col>
                                <Col md='3'> {detalle.direccion} </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Estado:</Label>
                                </Col>
                                <Col md='2'>
                                    <Label style={{ fontWeight: 'bold', color: '#3298dc' }} >{detalle.estado}</Label>
                                </Col>
                            </Row>
                            <Row >
                                <Col md='2'>
                                    <Label className='boldTexto'>Factura:</Label>
                                </Col>
                                <Col md='2'>
                                    <Label  >{detalle.factura}</Label>
                                </Col>
                                <Col md='2'>
                                    <Label className='boldTexto'>Fecha</Label>
                                </Col>
                                <Col md='2'>
                                    <Label>{detalle.fechaFactura}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Guia:</Label>
                                </Col>
                                <Col md='2'>
                                    {detalle.numGuia}
                                </Col>
                                <Col md='2'>
                                    <Label className='boldTexto'>Transportador:</Label>
                                </Col>
                                <Col md='2'>
                                    {detalle.transportadora}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <br></br>
        </div>
    )

}
export {
    CardPedido
}