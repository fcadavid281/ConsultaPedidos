import { ordenesDePedidosService } from "../_servicios";

const obtenerDetallePedido = async (pedido) => {
    return await ordenesDePedidosService.obtenerDetallePedido(pedido);
}


const obtenerOrdenesDePedidos = async (nit) => {
    return await ordenesDePedidosService.obtenerOrdenesDePedidos(nit);
}


export const ordenesDePedidosActions = {
    obtenerOrdenesDePedidos,
    obtenerDetallePedido
};