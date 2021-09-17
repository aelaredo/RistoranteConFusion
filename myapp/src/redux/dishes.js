import * as ActionTypes from './ActionTypes';

//los dishes pueden hacer 3 cosas declaradas en el creador de accionnes y en las constantes de tipo pero ejecutadas aca
export const Dishes = (state = {
    isLoading:true,
    errMess:null,
    dishes:[]
}, action)=>{
    //me traigo todos los verbos(tipos de acciones) y las ejecuto en este ¿objeto? de esa forma voy a poder 
    switch(action.type){
        ///en mi payload va a estar la info, aca solo defino que es lo que se quiere hacer y asigno en donde se deba
        case ActionTypes.ADD_DISHES:
            //(VERBO= agregar un dish SUSTANTIVO=el payload con los dishes)
            ///devuelvo un  estado nuevo ahora con dishes que se le pasaron a la accion como payload 
            return{...state, isLoading:false, errMess:null, dishes:action.payload}
        case ActionTypes.DISHES_LOADING:
            ///seteo isloading a true
            return{...state, isLoading:true, errMess:null, dishes:[]}
        case ActionTypes.DISHES_FAILED:
            //paso un mensaje de error
            return{...state, isLoading:false, errMess:action.payload, dishes:[]}
        default:
            return state
    }
}