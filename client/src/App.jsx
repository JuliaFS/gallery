import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import PicturesList from './components/PicturesList/PicturesList';

function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-pictures" element={<PicturesList />} />
      </Routes>
    </div>
  );
}

export default App;
