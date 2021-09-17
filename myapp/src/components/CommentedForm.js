import React from 'react';
import {useState} from 'react';
import {  Modal, ModalHeader, ModalBody, Col, FormGroup, Input, Button, Label, Row}from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';

//trying out react hooks
export default function CommentedForm() {

    const required =(val) => val && val.length;
    const maxLength = (len)=> (val) => !(val) || (val.length<= len);
    const minLength = (len)=> (val) => (val) && (val.length>= len);
    function toggleModal(){
        setIsModalOpen(!isModalOpen);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleSubmit(values){
        alert("Current State is "+ JSON.stringify(values));
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
                    <Label htmlFor="message" md={2}>Comment</Label>
                        <Control.textarea model=".message" id="message" name="message" rows="6" 
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
