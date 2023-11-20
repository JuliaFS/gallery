
import { Routes, Route } from 'react-router-dom';

import { paths } from './constants/constants';

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import PicturesList from './components/PicturesList/PicturesList';
import CreatePicture from './components/CreatePicture/CreatePicture';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PictureDetails from './components/PictureDetails/PictureDetails';
import { useState } from 'react';
import authContext from './contexts/AuthContext';

export default function App() {
  const [auth, setAuth] = useState({});

  const loginSubmitHandler = (values) => {
    console.log(values);
  }

  return (
    <authContext.Provider value={{loginSubmitHandler}}>
      <div>
        <Header />

        <Routes>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.gallery} element={<PicturesList />} />
          <Route path={paths.createPicture} element={<CreatePicture />} />
          <Route path={paths.login} element={<Login />} />
          <Route path={paths.register} element={<Register />} />
          <Route path={paths.details} element={<PictureDetails />} />
        </Routes>
      </div>
    </authContext.Provider>
  );
}
