const appReducer = (state:any,action:any)=>{
    switch(action.type){
        case 'CHANGE_LANGUAGE':{
            return{
                ...state,
                language: action.payload
            }
           
        }
        case 'CHANGE_THEME':{
            return{
                ...state,
                themeMode:action.payload
            }

        }
       

    }
   
    
}

export default appReducer