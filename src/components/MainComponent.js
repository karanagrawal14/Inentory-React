import React,{Component} from "react";
// import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
// import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
// import { COMMENTS } from "../shared/comments";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";
import About from "./AboutComponent";

import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchElectronics,fetchRefreshments, fetchStationaries,postFeedback } from "../redux/ActionCreaters";
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
// import { Leaders } from "../redux/leaders";


const mapDispatchToProps = dispatch => ({
  
    // addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchElectronics:()=>{dispatch(fetchElectronics())},
    resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
    // fetchComments:()=>dispatch(fetchComments()),
    fetchRefreshments:()=>{dispatch(fetchRefreshments())},
    // postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
    fetchStationaries:()=>{dispatch(fetchStationaries())},
    postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  });

const mapStateToProps = state=>{
    return{
        dishes:state.dishes,
        // comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders
    }
}

class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            // dishes:DISHES,
            // comments:COMMENTS,
            // leaders:LEADERS,
            // promotions:PROMOTIONS,
            // selectedDish:null
        }
    }

    componentDidMount(){
        this.props.fetchElectronics();
        this.props.fetchRefreshments();
        this.props.fetchStationaries();
        // this.props.fetchPromos();
    }
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
      }
    render(){

        const HomePage=()=>{
            return(
                <Home
                    dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            )
        }
        const DishWithId=({match})=>{
            return(
                <Dishdetail dish={this.props.dishes.dishes.filter((dish)=>dish._id===match.params.dishId,10)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                
            
               
                />
            )
        }
        const AboutPage=()=>{
            return(
                <About leaders={this.props.leaders.leaders}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            )
        }
        return(
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key = {this.props.location.key} classNames="page" timeout={300}>
                    <Switch>
                    <Route path='/home' component={HomePage}/>
                    <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>}/>
                    {/* <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}}/> */}
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/aboutus' component={AboutPage}/>
                    <Redirect to='/home'/>    
                </Switch>
                    </CSSTransition>
                </TransitionGroup>
                
                <Footer/>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));