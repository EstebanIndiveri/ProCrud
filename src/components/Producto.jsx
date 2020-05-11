import React from 'react';
import {useHistory} from 'react-router-dom';
//redux:
import {useDispatch}from 'react-redux';
import {borrarProductoAction,obtenerProductoEditar} from '../actions/productoActions';
//alerta
import Swal from 'sweetalert2';

const Producto = ({producto}) => {
    const {nombre,precio,id}=producto

    const dispatch=useDispatch();
    const history=useHistory();//habilitar history para redirect
    //confirmar si desea eliminar:
    const confirmarEliminarProducto=id=>{
        //preguntamos

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podras revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText:'Cancelar'
            
          }).then((result) => {
            if (result.value) {
            //pasamos al action
            dispatch(borrarProductoAction(id))
                
            }
          })
    }
    //funcion que redirige
    const redireccionarEdicion=producto=>{
        dispatch(obtenerProductoEditar(producto));
        history.push(`Productos/editar/${producto.id}`);
    }
    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button type="button" 
                className="btn btn-primary mr-2"
                onClick={()=>redireccionarEdicion(producto)}
                >Editar
                </button>
                <button 
                type="button"
                className="btn btn-danger"
                onClick={()=>confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Producto;