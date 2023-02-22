import { ordenesDePedidosService } from "../_servicios";

const obtenerDetallePedido = async (pedido) => {
    return await ordenesDePedidosService.obtenerDetallePedido(pedido);
}

const obtenerOrdenesDePedidos = async (nit) => {
    return await ordenesDePedidosService.obtenerOrdenesDePedidos(nit);
}

const obtenerOrdenesDePedidosPage = async (nit, page, size, sort, filter) => {
    return await ordenesDePedidosService.obtenerOrdenesDePedidosPage(nit, page, size, sort, filter)
}

export const ordenesDePedidosActions = {
    obtenerOrdenesDePedidos,
    obtenerDetallePedido,
    obtenerOrdenesDePedidosPage
};