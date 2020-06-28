import React, {Component} from 'react';
import {connect} from 'react-redux';
import action from './Redux/action';
import dispatcher, { dispatcher02 } from './Redux/dispatcher';

import {loginFunc, inputChange} from './utilities/Functions';
import {Link} from 'react-router-dom';
import store from './Redux/store';

class Login extends Component{
    constructor(props){
        super(props);  
        this.state = {
            userName: '',
            password: '',
            sessionUser : props.sessionUser,
            getSessionUser: props.getSessionUser,
            printSession: props.printSession
        }      
    }

    componentDidMount(){
        console.error(store.getState())
        this.props.printSession('sd')
        // console.error()
    }

    
    render(){
        return(
            <div className="container">
                <div className="row justify-content-between">
                    <form id="loginForm" className="card d-inline-flex loginFormCard mx-auto my-5 shadow-lg">
                        <div className="form-group loginFormGroup">
                            <input type="text" name="userName" className="form-control mb-4 p-4" onChange={inputChange.bind(this)} placeholder="Enter User name"></input>
                            <input type="text" name="password" className="form-control p-4" onChange={inputChange.bind(this)} placeholder="Enter Password"></input>
                        </div>
                        <div className="m-auto form-group pt-2">
                            <button  className="btn btn-success"  type="button" name="loginBtn"  onClick={loginFunc.bind(this)}>Login</button>
                            <span className="input-group-btn">
                                <Link to="/SignUp" className="btn btn-secondary ml-1" > New User </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect((state)=>{
    return{
        sessionUser: state.sessionUser
    }
},
{
    getSessionUser : dispatcher(action.sessionUser),
    printSession : dispatcher02(action.sessionUser)
}
)
(Login);