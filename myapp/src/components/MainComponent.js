import React, { Component } from 'react';
import Home from'./HomeComponent';
import '../App.css';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders }from'../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

///Agarra el store que tenemos y nos da un state de esa store, haciendola disponigle para este 
///y los demas componentes que rendereen desde aca tengan acceso a la data compartida en la store 
const mapStateToProps= state =>{
  return {
    //cada campo se hace disponible en props.dishes, props.commenst etc.
    dishes: state.dishes,
    comments : state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
                            //esta es una funcion que nos da connect 
const mapDispatchToProps = (dispatch)=>({
  // //addComment aca pasa a ser estar disponible en  funcion que se pasa por props,
  // //esta funcion recibe 4 params y devuelve el dispatch de la accion addComment
  // //y se la pasa como prop a DishDetail para que luego se la pase a la parte de los comentarios
  // // y por ultimo al componente de agregar comentario que tiene el form con la data
  // addComment:(dishId, rating, author, comment)=> dispatch(addComment(dishId, rating, author, comment)),

  // //voy a tener una prop que es una funcion traida del action creator, esta funcion llamara a dos acciones consecutivas
  // fetchPromos:()=>dispatch(fetchPromos()),

  // fetchDishes:()=>{dispatch(fetchDishes())},

  // resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},

  // fetchComments:()=>{dispatch(fetchComments())}

  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback:(firstname, lastname, telnum, email, agree, contactType, message, date ) =>dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, date)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => (dispatch(fetchPromos())),
  fetchLeaders: () => dispatch(fetchLeaders())
})

class Main extends Component {

  // constructor(props){
  //   super(props);
  // } 

  componentDidMount(){
    //cuando el componente Main se monte, es decir al darle f5 o entrar a la pagina. Se dispararÃ¡ la funcion fetchDishes que despacha el loadingDishes y el addDishes
    this.props.fetchDishes();
    this.props.fetchLeaders();
    this.props.fetchComments();
    
    this.props.fetchPromos();
  }


  render() {
    /* {paso como prop mis platos hacia el menu que creo aca} */
    const HomePage = ()=>{
      //ahora tambien debo pasar el estado de loading y si hubo algun error a los componentes, ya que este componente los carga l momento de hacer el fetch.
        return (
            <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}
            />
        )
    }

    const DishWithId = ({match})=>{
        /// esta funcion recibe el match que seria lo que se le pasa como argumento del path 
        // match viene con los parametros que se me pasa por URL el rouute path
        // le pasamos a dishDetail, la funcion de addComment, que la pasamos a props con mapDispatchToProps y que consiste en la 
        // funcion que recibe 4 params y despacha el objecto accion de agregar comentario con el payload siendo el commentario.

        return (
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errmess}
            comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errmess}
            postComment={this.props.postComment}
            />
        );
    }

    return (
      <div>      
          <Header/>   
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch> 
                  <Route path="/home" component={HomePage}/>
                  <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />}/>
                  <Route path="/menu/:dishId" component ={DishWithId}/>
                  <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders}/>}/>
                  <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                  <Redirect to ="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer/>
      </div>
    );
  }
}

//aca debemos usar withRouter y connect ya que este Main component esta dentro de App.js sobre 
//dentro de componentes, Provider/connect(que nos da acceso a una store en comun)
//y de BrowserRouter/withRouter que nos da la posibilida de usar Route en el header y footer
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));