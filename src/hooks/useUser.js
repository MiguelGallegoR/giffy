import { useCallback, useContext} from "react"
import Context from "../context/UserContext.js"
import loginService from '../services/login.js'

export default function useUser(){
    const {jwt, setJWT} = useContext(Context)
    
    const login = useCallback(({username, password}) =>{
        loginService({username, password})
            .then(jwt => {
                console.log(jwt)
                setJWT(jwt)
            })
            .catch(err => {
                console.error(err)
            })
    }, [setJWT])

    const logout = useCallback(() =>{
        setJWT(null)
    }, [setJWT])

    return {
        isLogged: Boolean(jwt),
        login,
        logout
    }
}