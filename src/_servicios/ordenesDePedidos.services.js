import { util } from '../_constants/util.js'
import { globalConstants } from '../_constants/global.constants'

export const ordenesDePedidosService = {
    obtenerOrdenesDePedidos,
    obtenerDetallePedido
};

const apiBase = `/api/OrdenesDePedidos/`;

//Obtiene los pedidos del ultimo mes por su nit
function obtenerOrdenesDePedidos(nit) {
    const reqOpt = {
        method: 'GET',
        headers: util.authHeader(),
    };
    return fetch(`${globalConstants.API_REST}${apiBase}${nit}`, reqOpt).then(util.jsonRespuesta);
}

function obtenerDetallePedido(pedido) {
    let data={
        pedido:pedido
    };

    const reqOpt = {
        method: 'POST',
        headers: util.authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${globalConstants.API_REST}${apiBase}`, reqOpt).then(util.jsonRespuesta);
}