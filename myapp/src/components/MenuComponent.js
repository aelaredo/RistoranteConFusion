import React from 'react'
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from'../shared/baseUrl';

function RenderMenuItem({dish, onClick}) {
    return(
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardImgOverlay >
                    <CardTitle heading='true'>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );

    }

    const Menu = (props)=>{
        //aca creo mi plato, agarro el prop que le pase al momento de crearlo
        //lo mape y creo cada tarjeta de plato
        
        const menu = props.dishes.dishes.map((dish)=>{
            
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish}/>
            </div>
            );
        }); 


        //al momento de devolver algo debo fijarme que props de loading y de error me paso, el componente main donde se cargan las 
        if (props.dishes.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            )
        }else if (props.dishes.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            )
        }else{
            //recien aca voy a estar saeguro deque tengo dishes en el store por lo que acá es donde voy a renderear bien todo
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr/>
                        </div>   
                    </div>
                    <div className="row">
                            {menu}
                    </div>
                </div>
        );
        }
        

    }
export default Menu;  
    // renderDish(dish){
    //     if(dish!=null){
    //         return (
    //             <div>
    //             <Card>
    //                 <CardImg width="100%" src={dish.image} alt={dish.name}/>
    //                 <CardBody>
    //                     <CardTitle heading='true'>{dish.name}</CardTitle>
    //                     <CardText>{dish.description}</CardText>
    //                 </CardBody>                    
    //             </Card>
    //             <DishDetail dish={this.state.selectedDish}/>
    //             </div>
    //         )
    //     }else{
    //         return(
    //             <div></div>
    //         )
    //     }
    // }
