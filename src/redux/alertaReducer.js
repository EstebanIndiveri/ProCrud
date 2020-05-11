import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';
//cada reducer tiene su state

const initalState={
    alerta:null
}

export default function (state=initalState,action){
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return{
                ...state,
                alerta:action.payload
            }
        case OCULTAR_ALERTA:
            return{
                ...state,
                alerta:action.payload
            }
        default:
            return state;
    }
}