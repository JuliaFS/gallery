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
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/404/Error boundary/ErrorBoundary';
import AuthGuard from './components/quards/AuthGuard';
import PageNotFound from './components/404/PageNotFound/PageNotFound';
import ErrorFallback from './components/common/ErrorFallBack';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <div className='main-container'>
          <Header />

          <Routes>
            <Route path={Path.Home} element={<Home />} />
            <Route path={Path.Gallery} element={<PicturesList />} />
            {/*<Route path={Path.CreatePicture} element={<CreatePicture />} />*/}
            {/*<Route element={<AuthGuard />}>*/}
              <Route path={Path.Login} element={<Login />} />
              <Route path={Path.Register} element={<Register />} />
              {/*<Route path={Path.Logout} element={<Logout />} />*/}
            {/*</Route>*/}
            <Route path={Path.Details} element={<PictureDetails />} />
            

            <Route element={<AuthGuard />}>
              <Route path={Path.CreatePicture} element={<CreatePicture />} />
              <Route path={Path.PictureEdit} element={<EditPicture />} />
              <Route path={Path.Logout} element={<Logout />} />
            </Route>
            <Route path={Path.Error404Path} element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}
