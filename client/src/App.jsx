import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as authService from './services/authService';
import AuthContext from './contexts/AuthContext';

import { Path } from './constants/constants';

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import PicturesList from './components/PicturesList/PicturesList';
import CreatePicture from './components/CreatePicture/CreatePicture';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PictureDetails from './components/PictureDetails/PictureDetails';
import Logout from './components/Logout/Logout';


export default function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem('accessToken');
    
    return {};
  });

  const loginSubmitHandler = async (values) => {
    //console.log(values);
    try{
      const result = await authService.login(values.email, values.password);
      console.log('result login: ')
      console.log(result)
      setAuth(result);
      localStorage.setItem('accessToken', result.accessToken);
      navigate(Path.Gallery);
    } catch(err){
      console.log(err);
    }
  };

  const registerSubmitHandler = async (values) => {
    //console.log(values['confirm-password']);
    try{
      const result = await authService.register(values.email, values.password, values['confirm-password']);
      setAuth(result);
      //console.log(result)
      localStorage.setItem('accessToken', result.accessToken);
       navigate(Path.Gallery);
    } catch(err){
      console.log(err);
    }
  };

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('accessToken');
    console.log('setAuth: ' + setAuth)
    navigate(Path.Home);
  }

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    //username: auth.username,
    email: auth.email,
    isAuthenticated: !!auth.accessToken //double nogation, ako ima username, obrashtame v truti stoinost ili folsi
  };

  return (
    <AuthContext.Provider value={values}>
      <div>
        <Header />

        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.Gallery} element={<PicturesList />} />
          <Route path={Path.CreatePicture} element={<CreatePicture />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path={Path.Details} element={<PictureDetails />} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
