import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService';
import usePersistedState from "../hooks/usePersistedState";
import { Path } from "../constants/constants";

const AuthContext = createContext();

export const AuthProvider = ({
    children, 
}) => {
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});


  
    const loginSubmitHandler = async (values) => {
      try{
        const result = await authService.login(values.email, values.password);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate(Path.Gallery);
      } catch(error){
        setError(error);
      }
    };
  
    const registerSubmitHandler = async (values) => {
      console.log(values.username)
      try{
        const result = await authService.register(values.username, values.email, values.password, values['confirm-password']);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate(Path.Gallery);
      } catch(err){
        setError(err);
        //throw new Error('Error with registering. Pls try again...');
        console.log(err);
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
      username: auth.username,
      email: auth.email,
      userId: auth._id,
      error,
      isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

AuthContext.displayName = 'AuthContext';

export default AuthContext;