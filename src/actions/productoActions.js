import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITO,
    DESCARGAR_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
}from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
//crear nuevos poductos
export function crearNuevoProductoAction(producto){
    return async(dispatch)=>{
        dispatch(agregarProducto());
        try {
            //insertar en la api
            await clienteAxios.post('/productos',producto);
            //actualiza el state
            dispatch(agregarProductoExito(producto));

            //sweetalert
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            //debug error
            console.log(error);
            dispatch(agregarProductoError(true));
            //alerta error
            Swal.fire({
                title:'Hubo un error',
                icon:'error',
                text:'Hubo un error, intenta nuevamente'
            });
        }
    }
}

const agregarProducto=()=>({
    type:AGREGAR_PRODUCTO,
    payload:true
})
//si se guarda 
const agregarProductoExito=producto=>({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
})
// hay 
const agregarProductoError=estado=>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})

//funcion que descarga los productos de la base de datos:

export function obtenerProductosAction(){
    return async(dispatch)=>{
         dispatch(descargarProductos());
         try {
             const respuesta=await clienteAxios.get('/productos');
             dispatch(descargaProductosExitosa(respuesta.data));
         } catch (error) {
             console.log(error);
             dispatch(descargaProductosError());
         }
    }
}

const descargarProductos=()=>({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload:true
})

const descargaProductosExitosa=productos=>({
    type:DESCARGAR_PRODUCTOS_EXITO,
    payload:productos
})
const descargaProductosError=()=>({
    type:DESCARGAR_PRODUCTOS_ERROR,
    payload:true
});

//selecciona y elimina el producto
export function borrarProductoAction(id){
    return async(dispatch)=>{
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            //si se elimina muestro la sweetalert:
            Swal.fire(
                'Eliminado!',
                'El producto fue eliminado',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}
const obtenerProductoEliminar=id=>({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})
const eliminarProductoExito=()=>({
    type:PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError=()=>({
    type:PRODUCTO_ELIMINADO_ERROR,
    payload:true
});
//colocar producto en edición:
export function obtenerProductoEditar(producto){
    return (dispatch)=>{
        dispatch(obtenerProductoAction(producto));
    }
}
const obtenerProductoAction=producto=>({
    type:OBTENER_PRODUCTO_EDITAR,
    payload:producto
})

//edita un registro en la api:
export function editarProductoAction(producto){
    return async(dispatch)=>{
        dispatch(editarProducto());

        try {
           await clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}
const editarProducto=()=>({
    type:COMENZAR_EDICION_PRODUCTO
})
const editarProductoExito=producto=>({
    type:PRODUCTO_EDITADO_EXITO,
    payload:producto
})
const editarProductoError=()=>({
    type:PRODUCTO_EDITADO_ERROR,
    payload:true
})
