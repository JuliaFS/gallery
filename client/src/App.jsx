import { Routes, Route } from 'react-router-dom';

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
        <Route path="/" element={<Home />} />
        <Route path="/all-pictures" element={<PicturesList />} />
        <Route path="/create-picture" element={<CreatePicture />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
