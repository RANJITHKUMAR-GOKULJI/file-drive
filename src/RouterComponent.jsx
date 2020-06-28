import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from './Login';
import Drive from './Drive';
import Signup from './Signup'
import cookie from 'react-cookies';

function RouterComponent(){
    if((cookie.load('token'))){
        return(
            <Router>
                <Switch>                
                    <Route path="/Drive" exact component={Drive}></Route>
                    <Redirect to="/Drive" />
                </Switch>
            </Router>
        )
    }
    else{
        return(
            <Router>
                <Switch>                
                    <Route path="/Login" exact component={Login}></Route>
                    <Route path="/Signup" exact component={Signup}></Route>
                    <Redirect to="/Login"/>
                </Switch>    
            </Router>
        )
    }
}

export default RouterComponent;