import React, { Component } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import {
  Label, Row, Col, Button, CardFooter
} from 'reactstrap'
import { ordenesDePedidosActions } from '../_actions';
import { globalConstants } from '../_constants/global.constants';
import { util } from '../_constants/util';
import '../css/App.css';
import logo from '../assets/Durespo_300px.png';
import { CardPedido } from '../Components/Card-Pedido';


class App extends Component {
  constructor(props) {
    super(props);
    this.location = this.props.location;
    this.state = {
      records: [],
      page: 'page',
      // page: util.obtenerParametro(this.location.search, 'page', 1),
      mostrar: true,
      nit: 0,
      loading: true,
      matches: window.matchMedia('(min-width: 640px)').matches,
      detalle: {
        pedido: '',
        fechaPedido: '',
        sucursal: '',
        nit: '',
        direccion: '',
        estado: '',
        factura: '',
        fechaFactura: '',
        numGuia: '',
        transportadora: ''
      },
    };

    this.setValue = util.setValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const handler = e => {
      this.setState({
        matches: e.matches
      });
    }
    window.matchMedia('(min-width: 640px)').addListener(handler);
  }

  handleSubmit(event, error, values) {
    this.setState({
      error,
      values,
      ordenTaller: values.ordenTaller,
      loading: false
    });

    if (error.length > 0 || !this.state.nit.length > 0) {
      this.setState({
        detalle: {
          pedido: '',
          fechaPedido: '',
          sucursal: '',
          nit: '',
          direccion: '',
          estado: '',
          factura: '',
          fechaFactura: '',
          numGuia: '',
          transportadora: ''
        },
        mostrar: false,
        ordenNovalida: false,
        loading: true
      });
    } else {
      this.consultar();
    }
  }

  consultar() {
    ordenesDePedidosActions.obtenerOrdenesDePedidos(this.state.nit).then(data => {
      if (data.estado === globalConstants.ESTADO_OK && data.resultado !== null && data.resultado.length > 0) {
        this.setState({
          detalle: data.resultado,
          mostrar: true,
          ordenNovalida: false,
          loading: true
        });
      } else {
        this.setState({
          ordenNovalida: true,
          mostrar: false,
          loading: true,
          detalle: {
            pedido: '',
            fechaPedido: '',
            sucursal: '',
            nit: '',
            direccion: '',
            estado: '',
            factura: '',
            fechaFactura: '',
            numGuia: '',
            transportadora: ''
          },
        })
      }
    })
  }

  render() {
    const { detalle, ordenNovalida, loading, matches } = this.state
    let items = [];
    if (detalle.length > 0) {
      detalle.forEach((element, index) => {
        items.push(
          <CardPedido key={index} {...element} />
        )
      });
    }

    return (

      <div className="section">
        <div className='container'>
          <div className="columns is-mobile is-centered">
            <div style={{ display: loading === true ? 'none' : 'inline' }} className="fa-3x has-text-centered">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
            <div id='mensaje' style={{ display: loading === false ? 'none' : 'inline' }} className={matches ? 'column box' : 'column'}  >
              <Row>
                <Col md='1' xs='4'>
                  <figure className="image">
                    <img src={logo} />
                  </figure>
                </Col>
              </Row>
              <div className="has-text-centered has-text-black">
                <h6 className="subtitle is-6 has-text-black panel-heading">
                  Consulta de Pedidos
                  </h6>
              </div>
              <AvForm onSubmit={this.handleSubmit}>
                <Row>
                  <Col md='12' xs='12'>
                    <span style={{ fontSize: '0.8rem', color: '#3298dc' }} >Ingrese su número  de cédula ó NIT sin dígito de verificación</span>
                  </Col>
                </Row>
                <br></br>
                <Row >
                  <Col md='1' xs='12'>
                    <Label className='boldTexto' >Documento: </Label>
                  </Col>
                  <Col md='9' xs='12' >
                    <AvField className='input is-small' type="text"
                      name='nit'
                      id='nit'
                      onChange={this.setValue}
                      placeholder="Ingrese su número  de cédula ó NIT."
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
                    <span style={{ fontSize: '13px', textAlign: 'center' }} className='has-text-danger'></span>
                  </Col>
                </Row>
                <br></br>
                {items}
              </AvForm>
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
                    <span> Medellín: (+4) 444 62 62</span>
                  </Col>
                  <Col md='12' xs='12'>
                    <span>Bogotá:  (+1) 482 482 9</span>
                  </Col>
                </Row>
              </CardFooter>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default App;
