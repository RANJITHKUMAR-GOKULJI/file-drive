import React, { Component } from 'react';
import {deleteFolder, createNew, inputChange, changeFolder} from './utilities/Functions';
import Axios from 'axios';
import serverUrl from './utilities/general_const';
import cookie from 'react-cookies';
import {Spinner} from 'reactstrap';

import {connect} from 'react-redux';
import action from './Redux/action';
import dispatcher, { dispatcher02 } from './Redux/dispatcher'

class SidePanel extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:'',
            currentFolder:'',
            delFolderName:'',
            newFolderName:'',
            retrieveItems:[],            
            printSession: props.printSession,
            sessionUser: props.sessionUser          
        }
    }

    componentWillMount(){
        //setUserCookie.bind(this);
        console.error('wil mounted')
    }

    componentDidMount(){

        const {userName} = this.state;

        const token = cookie.load('token');

        this.setState({userName: token.userName})
        
        this.props.printSession(token.userName)              

        const timer = setTimeout(()=>{
            console.error('Side Panel mounted')
            Axios({
                method:'get',
                url: serverUrl+'/file/folderRetrieve',
                params:{
                    creater: userName
                },
                responseType:'json'
            }).then(res=>{
                console.error(res);
                this.setState({retrieveItems: res.data.items})
            }).catch(err=>{
                console.error(err);
            })        
        }, 1000);
        return() => clearTimeout(timer);


    }

    render(){
        if((this.state.userName) && (this.state.retrieveItems)){
            const {retrieveItems, userName} = this.state;
            return(            
                <div className="border-right sideView container" id="sideDiv">
                    <div>
                        <h3>NDrive</h3>                
                    </div>
                    <div>
                        <form onSubmit={createNew.bind(this)} className="d-flex form-check-inline">
                            <input type="text" className="w-100 h-100" name="newFolderName" onChange={inputChange.bind(this)}></input>
                            <button type="submit" aria-expanded="false" className="btn btn-sm" aria-controls="inputName" data-toggle="collapse" data-target="#inputName" name="createFolder"><i className="fa fa-folder"/></button>                    
                        </form>
                    </div>
                    <div className="">
                        
                            <div className="nav-tabs dropdown-header allFolder" type="button" onClick={changeFolder.bind(this)} name="allFolder" id={userName}>
                                All
                            </div>
                        {retrieveItems.length !== 0 && retrieveItems.map((folderName, index)=>
                            <div className="d-flex">
                                <div className="dropdown-item" type="button" data-toggle="tooltip" data-placement="top" onClick={changeFolder.bind(this)} name={folderName} id={userName+"/"+folderName} key={index}>
                                    <text >{folderName}</text>
                                </div>
                                    <i className="fa fa-close align-self-center" onClick={deleteFolder.bind(this)} name={folderName} id={folderName}></i>                            
                            </div>
                        )}
                    </div>
                </div>
            )
        }
        else{
            return( 
                <div className="spinners">
                  <Spinner type="grow" color="primary" />
                  <Spinner type="grow" color="secondary" /> 
                  <Spinner type="grow" color="success" />
                  <Spinner type="grow" color="danger" />
                  <Spinner type="grow" color="warning" />
                  <Spinner type="grow" color="info" />
                  <Spinner type="grow" color="primary" />
                  <Spinner type="grow" color="dark" />
                </div>);
        }
    }
}

//export default SidePanel;
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
(SidePanel);