import React, { useEffect, useRef, useState } from 'react'

import { AvField, AvForm } from 'availity-reactstrap-validation';
import {
    Label, Row, Col
} from 'reactstrap'


import '../css/App.css';
import logo from '../assets/Durespo_300px.png';
import { FooterPedido } from '../Components/Detalle-Pedido';
import { ordenesDePedidosActions } from '../_actions/ordenesDePedidos.actions';
import { globalConstants } from '../_constants/global.constants';
import { CardPedido } from '../Components/Card-Pedido';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const ConsultaApp = () => {

    const inputConsulta = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        let campoId = inputConsulta.current.props.id;
        document.querySelector(`#${campoId}`).focus();

    }, [])


    const { nit, onInputChange } = useForm({
        nit: ''
    })

    const [state, setState] = useState({
        mostrar: true,
        loading: true,
        matches: false,
        detalle: [],
        ordenNovalida: false
    })


    const { loading, matches, detalle, ordenNovalida } = state;

    const handleSubmit = (event, error, values) => {
        event.preventDefault();

        if (error.length > 0 || nit === '' || !nit.length > 0) {
            setState({
                ...state,
                mostrar: false,
                detalle: []
            });
            document.querySelector('input').select();

        } else {
            consultar();
        }

    }


    const consultar = async () => {
        setState({
            ...state,
            loading: false
        })
        await ordenesDePedidosActions.obtenerOrdenesDePedidos(nit.toString().trim()).then(data => {
            if (data.estado === globalConstants.ESTADO_OK) {
                const { resultado } = data;


                console.log(resultado);

                // if (resultado && resultado.length > 0) {
                setState({
                    ...state,
                    detalle: resultado,
                    mostrar: true,
                    ordenNovalida: false,

                });
                // }
                // else {
                //     setState({
                //         ...state,
                //         detalle: [],
                //         mostrar: false,
                //         ordenNovalida: true,

                //     });
                // }

            } else {
                setState({
                    ...state,
                    detalle: [],
                    mostrar: false,
                    ordenNovalida: true,
                });

            }
            // setState({
            //     ...state,
            //     loading: true
            // })
        })
    }




    return (
        <div className="section">
            <div className={matches ? 'container' : 'SinMargen'}>
                <div className="columns is-mobile is-centered">
                    <div style={{ display: loading ? 'none' : 'inline' }} className="fa-3x has-text-centered">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                    <div id='mensaje' style={{ display: loading === false ? 'none' : 'inline' }}
                        className={`${matches ? 'column box' : 'column'}`}>
                        <Row>
                            <Col md='1' xs='4'>
                                <figure className="image">
                                    <img src={logo} alt='Logo durespo' />
                                </figure>
                            </Col>
                        </Row>
                        <div className="has-text-centered has-text-black">
                            <h6 className="subtitle is-6 has-text-black panel-heading">
                                Consulta de Pedidos
                            </h6>
                        </div>
                        <AvForm onSubmit={handleSubmit}>
                            <Row>
                                <Col md='12' xs='12'>
                                    <span style={{ fontSize: '0.8rem', color: '#3298dc' }}>
                                        Ingrese su número  de cédula ó NIT sin dígito de verificación
                                    </span>
                                </Col>
                            </Row>
                            <br></br>
                            <Row >
                                <Col md='1' xs='12'>
                                    <Label className='boldTexto' >Documento:</Label>
                                </Col>
                                <Col md='9' xs='12' >
                                    <AvField
                                        className='input is-small'
                                        type="number"
                                        name='nit'
                                        ref={inputConsulta}
                                        id='nit'
                                        onChange={onInputChange}
                                        placeholder="Ingrese su número  de cédula ó NIT."
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
                                                errorMessage: 'Debe ingresar solo numeros.'
                                            },
                                            minLength: {
                                                value: 4,
                                                errorMessage: 'Minimo 4 caracteres.'
                                            },
                                            maxLength: {
                                                value: 15,
                                                errorMessage: 'Maximo  15 caracteres.'
                                            }
                                        }} />
                                </Col>
                                <br></br>
                                <Col md='2' xs='12' >
                                    <button className={matches ? 'button is-small is-info  ' : 'button is-small is-info  mt-2'} type='submit'>
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
                                        <span style={{ color: 'red', fontSize: '0.8rem', margin: '0' }}>
                                            El numero de documento no existe.
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '12px', textAlign: 'center' }} className='has-text-danger'></span>
                                </Col>
                            </Row>
                            <br />
                            {
                                detalle.length > 0 && (
                                    detalle.map((el, index) => (
                                        <CardPedido key={index} {...el} matches={matches} />
                                    ))
                                )
                            }
                        </AvForm>
                        <FooterPedido />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultaApp