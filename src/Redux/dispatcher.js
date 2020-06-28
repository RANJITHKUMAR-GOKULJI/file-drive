import Axios from "axios";

function dispatcher({INIT,RES,FAIL}){
    return(method,url,responseType,headers,data)=>{
        return(dispatch)=>{
            dispatch({
                type: INIT    
            })

            Axios({method,url,headers,data,responseType}).then(res=>{
                dispatch({
                    type:RES,
                    payload:res.data
                })
            }).catch(err=>{
                dispatch({
                    type:FAIL,
                    err: err.message
                })
            })
        }
    }
}

export function dispatcher02({PRINTED}){
    return(data)=>{
        return(dispatch)=>{
            dispatch({
                type: PRINTED,
                payload: data
            })
        }        
    }
}

export default dispatcher;