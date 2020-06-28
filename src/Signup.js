import React, {Component} from 'react';
import {validate, inputChange} from './utilities/Functions';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',
            confPassword:''
        }
    }



    render(){
        return(
            <div className="container">
                <div className="row justify-content-between">
                    <form id="loginForm" className="card d-inline-flex loginFormCard mx-auto my-5 shadow-lg">
                        <div className="form-group loginFormGroup">
                            <input type="text" name="userName" className="form-control mb-4 p-4" onChange={inputChange.bind(this)} placeholder="Enter User name"></input>
                            <input type="text" name="password" className="form-control p-4" onChange={inputChange.bind(this)} placeholder="Enter Password"></input>
                            <input type="text" name="confPassword" className="form-control mb-4 p-4" onChange={inputChange.bind(this)} placeholder="Confirm Password"></input>
                        </div>
                        <div className="m-auto form-group pt-2">
                            <button  className="btn btn-success"  type="button" name="registerBtn" onClick={validate.bind(this)}>Register</button>
                        </div>
                    </form>
                </div>
            </div>            
        )
    }
}


export default Signup;