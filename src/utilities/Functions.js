import React, { Component } from 'react';
import cookie from 'react-cookies';
import Axios from 'axios';
import serverUrl from './general_const';
import store from '../Redux/store';
import { act } from 'react-dom/test-utils';

export default class Functions extends Component{
    constructor(props){
        super(props);
        this.state = {
            //userName: props.userName
        }
    }

}

export function setUserCookie(e){
    console.error('set User cookie')
}

//Start of Login Page Functions
export function loginFunc(){
    const{userName,password} = this.state;   
    console.error(userName);     
    Axios({
        method:'post',
        url: serverUrl+'/user/login',
        data:{
            userName: userName,
            password: password
        }
    }).then(res=>{
        if(res.data.doc !== null){
        console.error(res.data.doc)
        cookie.save('token', res.data.doc, {path : '/'})
        console.error(cookie.load('token'))            
        window.location.reload();
        }
        else{
            alert('Login Failed');
        }
    }).catch(err=>{
        alert('login failed');
    });
}

//End of Login Page Function 

//inputChange(e) is Common to Login and Singup page
export function inputChange(e){
    this.setState({[e.target.name]: e.target.value})
    //console.error(e.target.value)
}

//Start of Singup Page Functions

export function validate(){
    const{password,confPassword} = this.state;
    if(password === confPassword){
        console.error('matched')
        signupFunc(this.state);
    }
    else{
        alert('Password Mismatched..');
    }
}

export function signupFunc(e){
    const{userName,password} = e;
    Axios({
        method: 'post',
        url: serverUrl+'/user/signup',
        data:{
            userName:userName,
            password:password
        },
        responseType:'json',
    }).then(res=>{
        if(res.data.doc){
            console.error(res.data.doc)
            cookie.save('token', res.data.doc, {path : '/'})
            console.error(cookie.load('token'))            
            window.location.reload();
            }
        else{
            alert('User name already Exist');
        }
    }).catch(err=>{
        console.error(err);
    })
}

//End of Singup Page Functions


//Start of SidePanel Functions

export function createNew(e){   
    const {newFolderName} = this.state;
    const token = cookie.load('token')
    const userName = token.userName;        
    
    Axios({
        method: 'post',
        url: serverUrl+'/file/createNew',
        data:{
            folderName: newFolderName,
            creater: userName
        },
        responseType:'json'
    }).then(res=>{
        if(res.data.doc)
            alert('new Folder Created');
        else
            console.error(res.data.err)
    }).catch(err=>{
        console.error(err);
    })
}

export function changeFolder(e){
    console.error('currect folder'+e.target.id);
    const setSessionId = e.target.id;

    const timer = setTimeout(()=>{
        this.props.printSession(setSessionId);  
        document.getElementById("/").click();
    },1000); 
    return () => clearTimeout(timer);

    // here active tab "All" called
}

export function deleteFolder(e){
    
    const {userName, delFolderName} = this.state;
    //alert('Are You sure')
    const delFolder= e.target.id;
    this.setState({delFolderName: e.target.id});
    const Timer = setTimeout(()=>{
    console.error('Delete folder :'+delFolderName+' /  creater'+userName);
    
        Axios({
            method:'get',
            url: serverUrl+'/file/folderDelete',
            params:{
                creater: userName,
                delFolderName: delFolder
            },
            responseType:'json'
        }).then(res=>{
            console.error(res);
            this.setState({retrieveItems: res.data.items})
        }).catch(err=>{
            console.error(err);
        })
    },500)
    
    return () => clearTimeout(Timer);

}
//End of SidePanel Functions

//Start of Drive Page Functions
export function activeTab(e){        
    this.setState({fileType: e.target.id})

    console.error('hi')
    const sessionData = store.getState()
    console.error(sessionData.sessionUser.data)

    const timer = setTimeout(() => {
        const {fileType, folderName} = this.state;
        Axios({
            method:'get',
            url: serverUrl+'/file/fileRetrieve',
            params:{
                fileType:fileType,
                folderName: sessionData.sessionUser.data
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

export function onLogout(){
    cookie.remove('token');
    window.location.reload();
}

export function fileUpload(e){
    console.error(e.target.files[0])
    this.setState({file: e.target.files[0]})
}

export function uploadFile(e){
    console.error('upload');
    const{file,userName,folderName} = this.state;
    !({file}) && alert('File not Selected');

    const sessionData = store.getState()
    console.error(sessionData.sessionUser.data)

    var bodyFormData = new FormData();
    bodyFormData.set('folder', sessionData.sessionUser.data);        
    bodyFormData.append('file', file);    

    Axios({
        method:'post',
        url: serverUrl+'/file/upload',
        data:bodyFormData,
        responseType:'json',
        //headers: {'Content-Type': 'multipart/form-data' }
    }).then(res=>{
        (res.data.err) && alert('Upload Failed: filename already exists');
        (res.data.doc) && alert('File Upload Successs');
        console.error(res);
        this.setState({retrieveItems: [...this.state.retrieveItems , res.doc.fileName]});            
    }).catch(err=>{
        console.error(err);
    })
}

//End of Drive Page Functions
