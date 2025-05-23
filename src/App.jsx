import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Home from './pages/Home/Home';
import Exercises from './pages/Exercises';
import WordOrder from './pages/Exercises/WordOrder';
import GuidedReading from './pages/Exercises/GuidedReading';
import LetterSounds from './pages/Exercises/LetterSounds';
import SpellingPractice from './pages/Exercises/SpellingPractice';
import CompletarPalabras from './pages/Exercises/CompletarPalabras';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Navbarlogin from './components/Navbarlogin';
import Test from './pages/Test/Test';
import Login from './components/login/login';
import Cerrar from '../src/components/Navbar/cerrar';
import { ROUTES } from './routes';

function AppContent() {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen">
        {user ? <Navbarlogin /> : <Navbar />}
        <main className="pt-20">
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
            <Route path={ROUTES.TEST} element={<Test />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.Navbar} element={<Navbar />} />
            <Route path={ROUTES.Navbarlogin} element={<Navbarlogin />} />
            <Route path={ROUTES.Cerrar} element={<Cerrar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;