const initState = {
    err: null,
    data: null,
    requestProcessing: false
}

const getReducer = ({INIT, RES, PRINTED, FAIL})=>{
    return(state=initState,action)=>{
        switch (action.type) {
            case INIT:
                return{
                    ...state,
                    requestProcessing:true                     
                }
            case RES:
                return{
                    ...state,
                    data: action.payload,
                    err:null,
                    requestProcessing:false
                }
            case PRINTED:
                return{
                    ...state,
                    data: action.payload,
                    err: null,
                    requestProcessing:true
                }
            case FAIL:
                return{
                    ...state,
                    err: action.error,
                    data: null,
                    requestProcessing : false
                }
             default:
                return state;
         }
    }
}


export default getReducer;