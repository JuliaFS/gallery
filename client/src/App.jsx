import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { Path } from './constants/constants';

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import PicturesList from './components/PicturesList/PicturesList';
import CreatePicture from './components/CreatePicture/CreatePicture';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PictureDetails from './components/PictureDetails/PictureDetails';
import Logout from './components/Logout/Logout';
import EditPicture from './components/PictureEdit/EditPicture';
import ErrorBoundary from './components/404/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div>
          <Header />

          <Routes>
            <Route path={Path.Home} element={<Home />} />
            <Route path={Path.Gallery} element={<PicturesList />} />
            <Route path={Path.CreatePicture} element={<CreatePicture />} />
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.Register} element={<Register />} />
            <Route path={Path.Details} element={<PictureDetails />} />
            <Route path={Path.PictureEdit} element={<EditPicture />} />
            <Route path={Path.Logout} element={<Logout />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}
