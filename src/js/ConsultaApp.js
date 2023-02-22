import React, { useEffect, useRef, useState } from 'react'
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Label, Row, Col } from 'reactstrap'
import { useLocation } from 'react-router-dom';


import { ordenesDePedidosActions } from '../_actions';
import { globalConstants, util } from '../_constants';
import { useForm } from '../hooks/useForm';
import { Logo, FooterPedido, Paginacion, Loading, CardPedido } from '../Components';

import '../css/App.css';

const styleTitle = {
    fontSize: '0.8rem',
    color: '#3298dc'
}


const styleMessageErro =
{
    color: '#f86c6b',
    fontSize: '0.8rem',
    margin: '0',
    fontWeight: 'bold'
}


const ConsultaApp = () => {

    const location = useLocation();
    const inputConsulta = useRef(null);
    const [matches, setMatches] = useState(false)

    const handler = () => {
        const list = window.matchMedia('(max-width:640px)');
        setMatches(list.matches)
    }

    useEffect(() => {
        let campoId = inputConsulta.current.props.id;
        document.querySelector(`#${campoId}`).focus();

        handler();
        window.addEventListener('reset', handler);
        return () => {
            window.removeEventListener('reset', handler);
        }
    }, [])

    const { cargar, detalle, ordenNovalida, nit, page, sort, size, filter, totalElements, onInputChange, formState, setFormState } = useForm({
        nit: '',
        page: 1,
        sort: util.obtenerParametro(location.search, 'sort', 'pedido asc'),
        size: globalConstants.CANTIDAD_REGISTROS_PAGINA_POR_10,
        totalElements: 0,
        filter: '',
        mostrar: true,
        cargar: true,
        detalle: [],
        ordenNovalida: false,
    })
    const handlePaginacion = e => {
        setFormState(prev => ({
            ...prev,
            page: e
        }))
    };

    const handleSubmit = (event, error, values) => {
        event.preventDefault();
        if (error.length > 0 || nit === '' || !nit.length > 0) {
            setFormState({
                ...formState,
                mostrar: false,
                detalle: [],
                page: 1

            });
            document.querySelector('input').select();
        } else {
            consultar();
        }
    }

    const consultar = async () => {
        setFormState({
            ...formState,
            cargar: false
        })
        await ordenesDePedidosActions.obtenerOrdenesDePedidosPage(nit.toString().trim(), page, size, sort, filter).then(data => {
            if (data.estado === globalConstants.estado_okApi) {
                const { resultado } = data;
                if (resultado && resultado.content.length > 0) {
                    setFormState({
                        ...formState,
                        detalle: resultado.content,
                        mostrar: true,
                        ordenNovalida: false,
                        cargar: true,
                        totalElements: resultado.totalRegistros,
                    });
                }
                else {
                    setFormState({
                        ...formState,
                        detalle: [],
                        mostrar: false,
                        ordenNovalida: true,
                        cargar: true,
                    });
                    setTimeout(() => {
                        document.querySelector('input').focus();
                    }, 500);
                }

            } else {
                setFormState({
                    ...formState,
                    detalle: [],
                    mostrar: false,
                    ordenNovalida: true,
                    cargar: true,
                });

            }
        })
    }

    return (
        <div className="section">
            <div className={matches ? 'container' : 'SinMargen'}>
                <div className="columns is-mobile is-centered">
                    <Loading cargar={cargar} />
                    <div id='mensaje'
                        style={{ display: cargar === false ? 'none' : 'inline' }}
                        className={`${matches ? 'column box' : 'column'}`}>
                        <Logo />
                        <div className="has-text-centered has-text-black">
                            <h6 className="subtitle is-6 has-text-black panel-heading">
                                Consulta de Pedidos
                            </h6>
                        </div>
                        <AvForm onSubmit={handleSubmit}>
                            <Row>
                                <Col md='12' xs='12'>
                                    <span style={styleTitle}>
                                        Ingrese su número  de cédula ó NIT sin dígito de verificación
                                    </span>
                                </Col>
                            </Row>
                            <br></br>
                            <Row >
                                <Col md='1' xs='12'>
                                    <Label className='boldTexto'>Documento:</Label>
                                </Col>
                                <Col md='9' xs='12' >
                                    <AvField
                                        className='input is-small'
                                        type="number"
                                        name='nit'
                                        ref={inputConsulta}
                                        id='nit'
                                        onChange={onInputChange}
                                        placeholder="Ingrese su número de cédula ó NIT."
                                        autoComplete='off'
                                        value={nit}
                                        validate={{
                                            required:
                                            {
                                                value: true,
                                                errorMessage: 'Debe ingresar su número  de cédula ó nit (sin dígito de verificación)'
                                            },
                                            pattern: {
                                                value: '/^([0-9])*$/',
                                                errorMessage: 'Debe ingresar solo números.'
                                            },
                                            minLength: {
                                                value: 4,
                                                errorMessage: 'Mínimo 4 caracteres.'
                                            },
                                            maxLength: {
                                                value: 15,
                                                errorMessage: 'Máximo  15 caracteres.'
                                            }
                                        }} />
                                </Col>
                                <br></br>
                                <Col md='2' xs='12' >
                                    <button className={matches ? 'button is-small is-info mt-2' : 'button is-small is-info mt-0'} type='submit'>
                                        <span className="icon">
                                            <i className="fa fa-search"></i>
                                        </span>
                                        <span>Buscar</span>
                                    </button>
                                </Col>
                            </Row>
                            <Row style={{ display: !ordenNovalida ? 'none' : 'inline' }} >
                                <Col md='12' xs='12'>
                                    <div style={{ textAlign: 'center', margin: '0' }}>
                                        <span style={styleMessageErro}>
                                            El número de documento no existe.
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            {
                                detalle.length > 0 && <Row className='mt-2'>
                                    <Col md='1'>
                                        <Paginacion
                                            page={page}
                                            size={size}
                                            totalElements={totalElements}
                                            onSelect={handlePaginacion}
                                        />
                                    </Col>
                                </Row>
                            }
                            <br />
                            {
                                detalle.length > 0 && (
                                    detalle.map((el, index) => (
                                        <CardPedido key={index} {...el} matches={matches} />
                                    ))
                                )
                            }
                            {

                                detalle.length > 0 && <Row className='mt-2'>
                                    <Col md='1'>
                                        <Paginacion
                                            page={page}
                                            size={size}
                                            totalElements={totalElements}
                                            onSelect={handlePaginacion}
                                        />
                                    </Col>
                                </Row>
                            }
                        </AvForm>
                        <br />
                        <FooterPedido />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultaApp