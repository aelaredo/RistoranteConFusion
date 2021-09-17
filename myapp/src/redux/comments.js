import * as ActionTypes from './ActionTypes';

export const Comments = (state = 
                    {
                        errMess:null,
                        comments:[]
                    }, action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            ///devuelvo nuevo objketo con dishes nuevos
            return{...state, errMess:null, comments:action.payload}
        case ActionTypes.COMMENTS_FAILED:
                //paso un mensaje de error
                return{...state, errMess:action.payload, comments:[]}
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments:state.comments.concat(comment)};
        default:
            return state;
    }
}