import { util } from '../_constants/util.js'
import { globalConstants } from '../_constants/global.constants'


const apiBase = `/api/OrdenesDePedidos/`;

//Obtiene los pedidos del ultimo mes por su nit
const obtenerOrdenesDePedidos = async (nit) => {
    const reqOpt = {
        method: 'GET',
        headers: util.authHeader(),
    };
    return fetch(`${globalConstants.API_REST}${apiBase}${encodeURI(nit)}`, reqOpt).then(util.jsonRespuesta);
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
    obtenerDetallePedido
};

