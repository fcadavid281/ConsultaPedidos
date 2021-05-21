import React, { useState } from 'react'
import {
    Label, Row, Col, Card, CardHeader,
    CardBody, Tooltip
} from 'reactstrap'
import '../css/App.css'
import { DetallePedido } from './Detalle-Pedido'
import { ordenesDePedidosActions } from '../_actions';
import { globalConstants } from '../_constants/global.constants'

const CardPedido = (detalle) => {

    const [numPedido, setNumPedido] = useState(detalle.pedido)
    const [items, setItems] = useState([])
    const [modificado, setModificado] = useState(false)
    const [seleccionado, setSeleccionado] = useState('dropdown is-inactive');


    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const datos = (e) => {
        setNumPedido(e.target.innerText);
        setModificado(!modificado)
        if (!modificado) {
            ordenesDePedidosActions.obtenerDetallePedido(numPedido).then(data => {
                if (data.estado === globalConstants.ESTADO_OK && data.resultado.length > 0) {
                    setSeleccionado('dropdown is-active');
                    setItems(data.resultado);
                }
            })
        } else {
            setSeleccionado('dropdown is-inactive');
        }
    }

    return (
        <>
            <Row className='parafo'>
                <Col>
                    <Card body outline color="secondary">
                        <CardHeader>
                            <Label>
                                Numero de pedido:
                                <strong>
                                    <div className={seleccionado} >
                                        <div className="dropdown-trigger">
                                            <span id="TooltipExample" onClick={datos} style={{ color: '#3298dc', borderBottom: '1px solid #3298dc', marginLeft: '15px', marginRight: '15px' }}> {detalle.pedido} </span>
                                            <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                                                ver detalle del pedido.
                                            </Tooltip>
                                        </div>
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
                                                            items.map(item => <DetallePedido key={item.ean.trim()} {...item} />)
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
                                <Col md='2'>
                                    {detalle.nit}
                                </Col>
                                <Col md='1' >
                                    <Label className='caja'>Nombre:</Label>
                                </Col>
                                <Col md='3'>
                                    {detalle.sucursal}
                                </Col>
                                <Col md='1' >
                                    <Label className='caja'>Dirección:</Label>
                                </Col>
                                <Col md='3'>
                                    {detalle.direccion}
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Estado:</Label>
                                </Col>
                                <Col md='2'>
                                    <Label style={{ fontWeight: 'bold', color: '#3298dc' }} >{detalle.estado}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Factura:</Label>
                                </Col>
                                <Col md='2'>
                                    <Label>{detalle.factura}</Label>
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
        </>
    )

}
export {
    CardPedido
}