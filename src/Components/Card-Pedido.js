import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Col, Label, Row, Tooltip } from 'reactstrap';

import { ordenesDePedidosActions } from '../_actions';
import { globalConstants } from '../_constants';
import { DetallePedido } from '../Components';

import '../css/App.css';

const idSucursalesWithUrl = [8909, 37686, 41481];


let styHead = {
    color: '#3298dc',
    borderBottom: '1px solid #3298dc',
    marginLeft: '15px',
    marginRight: '15px'
}

export const CardPedido = ({ pedido, fechaPedido, nit, sucursal, direccion, estado, factura, fechaFactura, numGuia, transportadora, paginaWeb, consultaGuia, idTransportador, matches = false }) => {

    const [items, setItems] = useState([])
    const [modificado, setModificado] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        return () => {
            setItems([]);
            setModificado(false);
        };
    }, [nit])

    const handleDetallePedido = e => {

        ordenesDePedidosActions.obtenerDetallePedido(e).then(data => {
            if (data.estado === globalConstants.estado_okApi) {
                setModificado(!modificado)
                setItems([...data.resultado]);
            } else {
                setItems([]);
                setModificado(false);

            }
        })
    }

    let mostar = 'dropdown is-';
    mostar += modificado ? 'active' : 'inactive';

    return (
        <>
            <Row>
                <div className={!matches ? 'SinMargen' : 'col'}>
                    <Card className='parrafo' body outline color="secondary">
                        <CardHeader>
                            <Label>
                                Número de pedido:
                                <strong>
                                    <div className={mostar} >
                                        <div className="dropdown-trigger">
                                            <span id="TooltipExample"
                                                onClick={() => handleDetallePedido(pedido)}
                                                style={styHead}
                                            >
                                                {pedido}
                                            </span>
                                            <Tooltip placement="top"
                                                isOpen={tooltipOpen}
                                                target="TooltipExample"
                                                toggle={() => setTooltipOpen(!tooltipOpen)}>
                                                ver detalle del pedido.
                                            </Tooltip>
                                        </div>
                                        {
                                            items && <DetallePedido items={items} />
                                        }
                                    </div>
                                </strong>
                                <span>
                                    Fecha: <strong> {fechaPedido} </strong>
                                </span>
                            </Label>
                        </CardHeader>
                        <div className={matches ? 'BodyCard' : 'card-body'}>
                            <Row>
                                <Col md='2'>
                                    <Label className='caja'>Nit:</Label>
                                </Col  >
                                <Col md='2'>
                                    {nit}
                                </Col>
                                <Col md='1' >
                                    <Label className='caja'>Nombre:</Label>
                                </Col>
                                <Col md='3'>
                                    {sucursal}
                                </Col>
                                <Col md='1' >
                                    <Label className='caja'>Dirección:</Label>
                                </Col>
                                <Col md='3'>
                                    {direccion}
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Estado:</Label>
                                </Col>
                                <Col md='2'>
                                    <Label style={{ fontWeight: 'bold', color: '#3298dc' }} >{estado}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Factura:</Label>
                                </Col>
                                <Col md='2'>
                                    <Label>{factura}</Label>
                                </Col>
                                <Col md='2'>
                                    <Label className='boldTexto'>Fecha</Label>
                                </Col>
                                <Col md='2'>
                                    <Label>{fechaFactura}</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='2'>
                                    <Label className='boldTexto'>Guia:</Label>
                                </Col>
                                <Col md='2'>
                                    {numGuia}
                                </Col>
                                <Col md='2'>
                                    <Label className='boldTexto'>Transportador:</Label>
                                </Col>
                                <Col md='2'>
                                    {transportadora}
                                </Col>
                            </Row>
                            <Row>
                                {/* <Col md='2'>
                                    <Label className='boldTexto'>Consultar Guias:</Label>
                                </Col> */}
                                <Col>
                                    {paginaWeb !== '' && <a href={idSucursalesWithUrl.some(x => x === idTransportador) ?
                                        `${consultaGuia}${numGuia}` :
                                        consultaGuia === "" ? paginaWeb : consultaGuia}
                                        target='_blank' rel="noreferrer">Rastrear Guia</a>}
                                </Col>

                            </Row>
                        </div>
                    </Card>
                </div>
            </Row>
            <br />
        </>
    )
}


