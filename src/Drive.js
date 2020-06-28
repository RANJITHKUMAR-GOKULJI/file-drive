import React, {Component} from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import serverUrl from './utilities/general_const';
import {connect} from 'react-redux';
import action from './Redux/action';
import dispatcher, { dispatcher02 } from './Redux/dispatcher'
import SidePanel from './SidePanel';
import classnames from 'classnames';

import {activeTab, onLogout, fileUpload, uploadFile} from './utilities/Functions';

class Drive extends Component{
    constructor(props){
        super(props);
        this.state={
            file:'',
            fileType:'/',
            folderName:{},
            retrieveItems:[],
            userName:'',
            sessionUser: props.sessionUser,
            printSession: props.printSession
        }
    }



    componentWillMount(){
        const {folderName} = this.state;
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
        const {retrieveItems,fileType,folderName,userName} = this.state;
        console.error(folderName.userName)
        this.setState({userName : folderName.userName})
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
        }).catch(err=>{
            console.error(err);
        })
    }

    
    
    render(){
        const {retrieveItems, printSession, userName} = this.state;
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
                        <div className="card p-2">
                            {retrieveItems.length !== 0 && retrieveItems.map((fileName,index)=>
                                <div className="badge-light nav-tabs" >
                                    <a href={serverUrl+'/'+userName+'/'+fileName} alt={fileName} key={index} >{fileName}</a>
                                    <i className="align-self-center fa fa-close text-danger" ></i>
                                </div>
                                
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
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