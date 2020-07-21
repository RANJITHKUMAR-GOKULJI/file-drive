import React, {Component} from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import serverUrl from './utilities/general_const';
import {connect} from 'react-redux';
import {Spinner} from 'reactstrap'
import action from './Redux/action';
import dispatcher, { dispatcher02 } from './Redux/dispatcher'
import SidePanel from './SidePanel';

import {activeTab, onLogout, fileUpload, uploadFile, deleteFile} from './utilities/Functions';

class Drive extends Component{
    constructor(props){
        super(props);
        this.state={
            file:'',
            fileType:'/',
            folderName:{},
            retrieveItems:[],
            userName:'',
            currentFolder:'',
            delFileName:'',
            sessionUser: props.sessionUser,
            printSession: props.printSession
        }
    }



    componentWillMount(){
        this.setState({folderName: cookie.load('token')})
        //console.error(cookie.load('token'))
        //console.error()
        // this.props.printSession('Ranjith')
        // console.error(this.props.sessionUser)
        
    }
    componentDidUpdate(){
        console.error('did update')
    }
    componentDidMount(){
        const {folderName} = this.state;
        console.error(folderName.userName)
        this.setState({userName : folderName.userName, currentFolder: folderName.userName})
        
        console.error('drive mounted')
        Axios({
            method:'get',
            url: serverUrl+'/file/fileRetrieve',
            params:{
                fileType:'/',
                folderName: folderName.userName
            },
            responseType:'json'
        }).then(res=>{
            console.error(res);
            this.setState({retrieveItems: res.data.items})
            //this.setState({currentFolder: res.data.folderName})
        }).catch(err=>{
            console.error(err);
        })
    }

    
    
    render(){
        if(this.state.sessionUser){
            const {retrieveItems, userName} = this.state;
            return(
                <div className="wrapper" id="wrapper">
                    <SidePanel />
                    <div className="container-fluid">
                        <div className="d-flex p-2" id="topDiv">
                            <div className="w-100 flex-wrap">
                                <h4>DDL Development</h4>
                            </div>
                            <div>
                                <button type="button" className="btn btn-danger btn-sm" onClick={onLogout.bind(this)}>Logout</button>
                            </div>
                        </div>
                        <div className="" id="mainDiv">
                            <div className="d-md-flex">
                                <div className="w-100">
                                    <ul className="nav navbar">
                                        <li className="nav-tabs" name="all"  onClick={activeTab.bind(this)} id="/">
                                            All
                                        </li>
                                        <li className="nav-tabs"  onClick={activeTab.bind(this)}  name="image" id="image">
                                            Image
                                        </li>
                                        <li className="nav-tabs"  onClick={activeTab.bind(this)} name="video" id="video">
                                            Video
                                        </li>
                                        <li className="nav-tabs"  onClick={activeTab.bind(this)} name="audio" id="audio">
                                            Audio
                                        </li>
                                        <li className="nav-tabs"  onClick={activeTab.bind(this)} name="pdf" id="pdf">
                                            PDF
                                        </li>
                                    </ul>                            
                                </div> 
                                <div>
                                    <form className="form-check-inline form-control" onSubmit={uploadFile.bind(this)}>
                                        <div>
                                            <input type="file" id="file" name="file" className="file-secondary" onChange={fileUpload.bind(this)}></input>
                                        </div> 
                                        <div>
                                            <button className="btn btn-success btn-sm" name="upload" type="submit" >Upload</button>
                                        </div>    
                                    </form>                       
                                </div> 
                            </div>
                            <div className="card p-2 m-1">
                                {retrieveItems.length !== 0 && retrieveItems.map((fileName,index)=>
                                    <div className="badge-light nav-tabs" >
                                        <a href={serverUrl+'/'+userName+'/'+fileName} alt={fileName} key={index} >{fileName}</a>
                                        <i className="align-self-center fa fa-close text-danger" id={fileName} onClick={deleteFile.bind(this)}></i>
                                    </div>
                                    
                                )}
                            </div>
                        </div>
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

//export default Drive;
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
(Drive);