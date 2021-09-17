import React from 'react'
import {useState} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import {Breadcrumb, BreadcrumbItem, Button, Label, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from'../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components'

function RenderDish({dish}){
    return(
    <div className="col-5">
        <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%'}}>
            <Card >
                <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle heading='true'>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div>)
}
    const DishDetail = (props)=>{
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            )
        }else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }else if (props.dish != null){
            return(
                
            <div className="container" key={props.dish.id+"Detail"}>
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>   
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                    postComment ={props.postComment}
                    dishId={props.dish.id}/>
                </div>
            </div>)
        }else{
            return(<div></div>)
        }
    };

    // Nuevamente la funcion addComment se pasa por ulktima vez al componente de commented form
    function RenderComments({comments, postComment, dishId}){
        return(
            <div className="col-5">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>  
                        {comments.map((comment=>{return <Fade in key={comment.id}>
                                                            <li >
                                                            <div>
                                                                
                                                                    <p>{comment.comment}</p><p>{"---"}{comment.author}{" "}{new Intl.DateTimeFormat('es-ES',{year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                                                
                                                            </div> 
                                                            </li>  
                                                        </Fade>}))}
                    </Stagger>  
                </ul>
                <div>
                    <CommentedForm dishId={dishId} postComment={postComment}></CommentedForm>
                </div>
            </div>

        )
    }
    function CommentedForm(props) {

        const required =(val) => val && val.length;
        const maxLength = (len)=> (val) => !(val) || (val.length<= len);
        const minLength = (len)=> (val) => (val) && (val.length>= len);
        function toggleModal(){
            setIsModalOpen(!isModalOpen);
        }
    
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        function handleSubmit(values){
            //por ultimo aca se hace uso de addComment
            props.postComment(props.dishId, parseInt(values.stars), values.author, values.comment);
        }
        return (
            <>
            <div>
                <Button outline color="primary" onClick={toggleModal}> <span className="fa fa-pencil-square-o fa-1"></span>Leave a Comment</Button>{' '}
            </div>
    
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Login</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>handleSubmit(values)}>
                    <Row className="form-group">
                        <Label md={2}>Stars</Label>
                        <Control.select model=".stars" name="contactType" 
                        className ="form-control ml-3 mr-3">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author" className ="ml-3 mr-3">Your Name</Label>
                            <Control.text model=".author" id="author" name="author" 
                            placeholder="Your Name" 
                            className="form-control ml-3 mr-3"
                            validators={{
                                required,minLength:minLength(2), maxLength:maxLength(15)
                                }}
                            />
                            <Errors 
                                className="text-danger ml-3 mr-3"
                                model=".author"
                                show="touched"
                                messages={{
                                    required:'Required ',
                                    minLength:'Must be greater than 2 chars.  ',
                                    maxLength:'Must be 15 chars or less '
                                }}
                            />
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={2}>Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" 
                            className="form-control ml-3 mr-3"/>
                    </Row>
                    <Row className="form-group">
                            <Button type="submit" color="primary" className="ml-3 mr-3">
                                Send Comment
                            </Button>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
        </>
        )
    }

export default DishDetail;