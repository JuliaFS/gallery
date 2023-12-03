import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";
import { Path } from "../constants/constants";

const AuthContext = createContext();

export const AuthProvider = ({
    children, 
}) => {
    const [errorMsg, setErrorMsg] = useState({});
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});


  
    const loginSubmitHandler = async (values) => {
      try{
        const result = await authService.login(values.email, values.password);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate(Path.Gallery);
      } catch(error){
        setErrorMsg(error);
        //navigate(Path.Login);
        //throw new Error('User does not exist!');
        //alert(err.message);
      }
    };
  
    const registerSubmitHandler = async (values) => {
      try{
        const result = await authService.register(values.email, values.password, values['confirm-password']);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
         navigate(Path.Gallery);
      } catch(err){
        setErrorMsg(err);
        console.log(err);
        //navigate(Path.Error404Path);
      }
    };
  
    const logoutHandler = () => {
      setAuth({});
      localStorage.removeItem('accessToken');
      navigate(Path.Home);
    }
  
    const values = {
      loginSubmitHandler,
      registerSubmitHandler,
      logoutHandler,
      //username: auth.username,
      email: auth.email,
      userId: auth._id,
      error: errorMsg,
      isAuthenticated: !!auth.accessToken //double nogation, ako ima username, obrashtame v truti stoinost ili folsi,
     
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContext.displayName = 'AuthContext';

export default AuthContext;
