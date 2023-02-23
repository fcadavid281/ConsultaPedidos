import { util } from '../_constants/util.js'
import { globalConstants } from '../_constants/global.constants'
import axios from 'axios';


const apiBase = `/api/OrdenesDePedidos/`;

//Obtiene los pedidos del ultimo mes por su nit
const obtenerOrdenesDePedidos = async (nit) => {
    const reqOpt = {
        method: 'GET',
        headers: util.authHeader(),
    };
    let response;

    await axios.get(`${globalConstants.API_REST}${apiBase}${encodeURI(nit)}`, reqOpt).then(d => {
        if (d.statusText === globalConstants.ESTADO_OK) {
            const { data } = d;
            response = data;
        }
    });
    return response;
}

const obtenerOrdenesDePedidosPage = async (nit, page, size, sort, filter) => {

    const reqOpt = {
        method: 'GET',
        headers: util.authHeader()
    };

    let request = await fetch(`${globalConstants.API_REST}${apiBase}${encodeURI(nit)}/${page}/${size}/${sort}/${filter}`, reqOpt);
    let response = await util.jsonRespuesta(request);
    return response;
}

const obtenerDetallePedido = async (pedido) => {
    let data = {
        pedido: pedido
    };

    const reqOpt = {
        method: 'POST',
        headers: util.authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${globalConstants.API_REST}${apiBase}`, reqOpt).then(util.jsonRespuesta);
}


export const ordenesDePedidosService = {
    obtenerOrdenesDePedidos,
    obtenerDetallePedido,
    obtenerOrdenesDePedidosPage,
};

