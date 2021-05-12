import { ordenesDePedidosService } from "../_servicios";

export const ordenesDePedidosActions = {
    obtenerOrdenesDePedidos,
    obtenerDetallePedido
};

//Obtiene el resultado de la orden de taller.
function obtenerOrdenesDePedidos(nit) {
    return ordenesDePedidosService.obtenerOrdenesDePedidos(nit);
}

function obtenerDetallePedido(pedido) {
    return ordenesDePedidosService.obtenerDetallePedido(pedido);
}