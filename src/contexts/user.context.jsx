import { createContext, useState, useEffect, useReducer} from "react";

import { createUserDocumentFromAuth,onAuthStateChangedListner, } from "../utils/firebase.utils";

export const USER_ACTION_TYPES={
    SET_CURRENT_USER:'SET_CURRENT_USER'
}



const userReducer=(state,action)=>{
 const {type,payload}=action
 console.log(action);
 console.log('user dispatched')
 switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
        return{
        ...state,
         currentUser:payload

        }
        default:
            throw new Error(`unhandle type in ${type} in userReduser`)
 }
 
} 
export const UserContext= createContext({
   
    setCurrentUser:()=>null
})

const INTIAL_STATE={
    currentUser:null,
}

export const UserProvider=({ children })=>{
    //  const [currentUser, setCurrentUser] = useState(null);
const [state,dispatch]=useReducer(userReducer,INTIAL_STATE)

const {currentUser}=state

    

const setCurrentUser=(user)=>{
    dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
 
}

const value={ currentUser, setCurrentUser}

useEffect(()=>{
   const unsubscribe= onAuthStateChangedListner((user)=>{
    if (user ){
    createUserDocumentFromAuth(user);
    }
    setCurrentUser(user);
    console.log("This is user",user);
   })

   return unsubscribe
},[])



    return <UserContext.Provider value={value}>{children}</ UserContext.Provider>
}

   