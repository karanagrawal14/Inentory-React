import { baseUrl } from "../shared/baseUrl";
import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Row
  // Button
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Input,Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';
const required = (val)=>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len);
const minLength = (len)=>(val)=>val&&(val.length>=len);
const isNumber = (val)=>(!isNaN(Number(val)));
const validEmail = (val)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); 

class CommentForm extends Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen:false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    //   console.log()
    });
    console.log(this.state.isModalOpen)
  }
  handleSubmit(values){
    console.log('Current State is: '+JSON.stringify(values));
    alert('Current State is: '+JSON.stringify(values));
    // event.preventDefault();
    this.props.postComment(this.props.dishId,values.rating,values.name,values.comment)
}
  render(){
    return(
        <div>
          <Button onClick={this.toggleModal} outline><span className="fa fa-pencil"></span>{' '}Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                    <Label md={12} htmlFor="rating">Rating</Label>
  
                    <Col md={12}>
                    <Control.select 
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
    )
  }
}
function RenderDish({ dish }) {
  if (dish != null) {
    return (
     <div>
        {/* <p>Karan is back</p> */}
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
     </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComment({ comments,postComment,dishId }) {
  if (comments!= null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                        
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    );
  } else {
    return <div></div>;
  }
}
const Dishdetail = (props) => {
  if(props.isLoading){
    return(
      <div className="container">
        <div className="row">
          <Loading/>
        </div>
      </div>
    )
  }
  else if(props.errMess){
    return(
      <div className="container">
          <div className="row">            
              <h4>{props.errMess}</h4>
          </div>
      </div>
  );
  }
  else if(props.dish!=null)
  {
    return (
      <div className="container">
          <div className="row">
                      <Breadcrumb>
  
                          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>                
                  </div>
        <div className="row">
        
          <div className="col-12 col-md-5 m-1">
            
            <RenderDish dish={props.dish}/>
          </div>
  
          {/* <RenderComment comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/> */}
          {/* <p>This is Karan Don</p> */}
          
        </div>
      </div>
    );
  }
};
export default Dishdetail;
