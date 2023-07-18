/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from 'react'

const AppStateContext = createContext()

const init = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

const reducer = (state, action) => {
    switch (action.type){
        case "SET_USER": {
            return {
                ...state,
                user: action.payload
            }
        }
        default: {
            throw Error("Unknown Action")
        }
    }
}

export const AppStateContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, init)

    useEffect(() => {
        // Save the state to local storage whenever it changes
        if(state?.user){
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }, [state]);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppStateContext = () => useContext(AppStateContext)
