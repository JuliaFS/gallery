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


export default function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = async (values) => {
    console.log(values);
    try{
      const result = await authService.login(values.email, values.password);
      setAuth(result);
      navigate(Path.Gallery);
    } catch(err){
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{loginSubmitHandler}}>
      <div>
        <Header />

        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.Gallery} element={<PicturesList />} />
          <Route path={Path.CreatePicture} element={<CreatePicture />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path={Path.Details} element={<PictureDetails />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
