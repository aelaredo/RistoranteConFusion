import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

//recibe 4 params y devuelve on objeto accion con type y payload
export const addComment = (comment) =>({
    type: ActionTypes.ADD_COMMENT,
    payload:comment
});

export const postComment = (dishId, rating, author, comment)=> (dispatch)=>{
    const newComment ={
        dishId: dishId,
        rating: rating,
        author: author,
        comment:comment
    }
    newComment.date = new Date().toISOString();
        return fetch (baseUrl + 'comments',{
         method:'POST',
         body: JSON.stringify(newComment),
         headers:{'Content-Type': 'application/json'},
         credential:'same-origin'
        })
        .then(response =>{
            if (response.ok){
                return response;
            }else{
                //si responde con un error, armo el objeto error y hago un throw
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },error=>{
        //aca seria cuando tenes un 404 o algo que es servidor no responde
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(comment=>dispatch(addComment(comment)))
        .catch(error =>{console.log('Post comments ', error.message)
                        alert('Your comment could not be posted \nError: '+error.message);}
              )
}

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message, date )=> (dispatch)=>{
    const newFeedback ={
        "firstname": firstname,
        "lastname": lastname,
        "telnum": telnum,
        "email": email,
        "agree": agree,
        "contactType": contactType,
        "message": message,
        "date": date,
    }
    newFeedback.date = new Date().toISOString();
        return fetch (baseUrl + 'feedback',{
         method:'POST',
         body: JSON.stringify(newFeedback),
         headers:{'Content-Type': 'application/json'},
         credential:'same-origin'
        })
        .then(response =>{
            if (response.ok){
                return response;
            }else{
                //si responde con un error, armo el objeto error y hago un throw
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },error=>{
        //aca seria cuando tenes un 404 o algo que es servidor no responde
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(comment=>alert("Thank you for posting your feedback "+JSON.stringify(comment)))
        .catch(error =>{console.log('Post comments ', error.message)
                        alert('Your comment could not be posted \nError: '+error.message);}
            )
}

export const addFeedback = (feedback)=>({
    // En esta accion voy a cargfar mi store con los dishes
    type: ActionTypes.ADD_FEEDBACK,
    payload:feedback
})


export const fetchDishes = () =>(dispatch) => {
    //esta accion no tiene tipo, porque solamente llama a otras dos acciones que si van a ser pasadas por el reducer 
    // dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response =>{
            if (response.ok){
                return response;
            }else{
                //si responde con un error, armo el objeto error y hago un throw
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
            
        },
        //aca seria cuando tenes un 404 o algo que es servidor no responde
        error=>{
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)))
        //aca voy a catchar cualquier de los dos tiopio de errores que tire
        //entonces es cuando voy a despachar una actio de dishesFailed
        .catch(error => dispatch(dishesFailed(error.message))) 
}

export const dishesLoading=()=>({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errmess
})

export const addDishes = (dishes)=>({
    // En esta accion voy a cargfar mi store con los dishes
    type: ActionTypes.ADD_DISHES,
    payload:dishes
})

export const fetchComments = () =>(dispatch) => {
    //esta accion no tiene tipo, porque solamente llama a otras dos acciones que si van a ser pasadas por el reducer 
    
    
    return fetch(baseUrl+'comments')
        .then(response =>{
            if (response.ok){
                return response;
            }else{
                //si responde con un error, armo el objeto error y hago un throw
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }

        },
        //aca seria cuando tenes un 404 o algo que es servidor no responde
        error=>{
            var errmess = new Error (error.message);
            throw errmess;
        })  
        .then(response=>response.json())
        .then(comments=>dispatch(addComments(comments)))
        .catch(error =>dispatch(commentsFailed(error.message))) ;
}

export const commentsFailed = (errmess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
})

export const addComments = (comments)=>({
    // En esta accion voy a cargfar mi store con los dishes
    type: ActionTypes.ADD_COMMENTS,
    payload:comments
})

export const fetchPromos = () =>(dispatch) => {
    //esta accion no tiene tipo, porque solamente llama a otras dos acciones que si van a ser pasadas por el reducer 

    dispatch(promosLoading());

    return fetch(baseUrl+'promotions')
        .then(response =>{
            if (response.ok){
                return response;
            }else{
                //si responde con un error, armo el objeto error y hago un throw
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }

        },
        //aca seria cuando tenes un 404 o algo que es servidor no responde
        error=>{
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(promos=>(dispatch(addPromos(promos))))
        .catch(error =>(dispatch(promosFailed(error.message))));
}

export const promosLoading=()=>({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmess
})

export const addPromos = (promos)=>{
    return({
    // En esta accion voy a cargfar mi store con los dishes
    type: ActionTypes.ADD_PROMOS,
    payload:promos
})}

export const fetchLeaders = () =>(dispatch) => {
    //esta accion no tiene tipo, porque solamente llama a otras dos acciones que si van a ser pasadas por el reducer 
    // dispatch(dishesLoading(true));

    return fetch(baseUrl+'leaders')
        .then(response =>{
            if (response.ok){
                return response;
            }else{
                //si responde con un error, armo el objeto error y hago un throw
                var error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        //aca seria cuando tenes un 404 o algo que es servidor no responde
        error=>{
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response=>response.json())
        .then(dishes=>dispatch(addLeaders(dishes)))
        //aca voy a catchar cualquier de los dos tiopio de errores que tire
        //entonces es cuando voy a despachar una actio de dishesFailed
        .catch(error => dispatch(leadersFailed(error.message))) 
}

export const leadersFailed = (errmess)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errmess
})

export const addLeaders = (leaders)=>{
    debugger;
    return({
    // En esta accion voy a cargfar mi store con los dishes
    type: ActionTypes.ADD_LEADERS,
    payload:leaders
})}