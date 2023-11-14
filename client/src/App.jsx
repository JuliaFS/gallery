import { Routes, Route } from 'react-router-dom';

import { paths } from './constants/constants';

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import PicturesList from './components/PicturesList/PicturesList';
import CreatePicture from './components/CreatePicture/CreatePicture';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

export default function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.gallery} element={<PicturesList />} />
        <Route path={paths.createPicture} element={<CreatePicture />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.register} element={<Register />} />
      </Routes>
    </div>
  );
}
