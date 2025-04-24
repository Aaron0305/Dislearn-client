import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Exercises from './pages/Exercises';
import WordOrder from './pages/Exercises/WordOrder';
import GuidedReading from './pages/Exercises/GuidedReading';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { UserProvider } from './contexts/UserContext';
import './styles/App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/exercises/word-order" element={<WordOrder />} />
              <Route path="/exercises/guided-reading" element={<GuidedReading />} />
              {/* Ruta para el otro ejercicio que se implementará después */}
              <Route path="/exercises/sound-matching" element={<div>Emparejamiento de Sonidos (En desarrollo)</div>} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;