import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes'; // Asegúrate de que la ruta sea correcta
import Home from './pages/Home/Home';
import Exercises from './pages/Exercises';
import WordOrder from './pages/Exercises/WordOrder';
import GuidedReading from './pages/Exercises/GuidedReading';
import LetterSounds from './pages/Exercises/LetterSounds';
import SpellingPractice from './pages/Exercises/SpellingPractice';
import CompletarPalabras from './pages/Exercises/CompletarPalabras'; // Nuevo componente
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { UserProvider } from './contexts/UserContext';
import './styles/App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-20">  {/* Añadimos padding-top para compensar el navbar fijo */}
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.EXERCISES} element={<Exercises />} />
              <Route path={ROUTES.WORD_ORDER} element={<WordOrder />} />
              <Route path={ROUTES.GUIDED_READING} element={<GuidedReading />} />
              <Route path={ROUTES.SOUND_MATCHING} element={<LetterSounds />} />
              <Route path={ROUTES.SPELLING_PRACTICE} element={<SpellingPractice />} />
              <Route path={ROUTES.COMPLETE_WORDS} element={<CompletarPalabras />} />
              <Route path={ROUTES.PROGRESS} element={<Progress />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;