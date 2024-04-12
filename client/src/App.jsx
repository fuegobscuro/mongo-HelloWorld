import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProgrammingLanguages from './pages/admin/ProgrammingLanguages';
import ContactMessages from './pages/admin/ContactMessages';
import Analytics from './pages/admin/Analytics';
import Users from './pages/admin/Users';
import NotFound from './pages/NotFound';
import NavBar from './components/common/NavBar';
import AdminNavBar from './components/admin/AdminNavBar';
import SessionChecker from './components/auth/SessionChecker';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingAnimation from './components/common/LoadingAnimation';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLang, setCurrentLang] = useState('');
  const [currentLangName, setCurrentLangName] = useState('');
  const [loading, setLoading] = useState(false);

  function NavbarWrapper() {
    const location = useLocation();

    if (location.pathname.startsWith('/admin-dashboard')) {
      return <AdminNavBar />;
    } else {
      return <NavBar />;
    }
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get('/programming-languages?includeInactive=false')
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openModalWithCode = (code, codeLang, langName) => {
    setCurrentCode(code);
    setCurrentLang(codeLang);
    setCurrentLangName(langName);
    setIsModalOpen(true);
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Provider store={store}>
      <Router>
        <SessionChecker>
          <NavbarWrapper />
          <Routes>
            <Route
              path='/'
              element={
                <Home
                  languages={languages}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  currentCode={currentCode}
                  currentLang={currentLang}
                  currentLangName={currentLangName}
                  openModalWithCode={openModalWithCode}
                />
              }
            />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashboard' element={<ProtectedRoute />}>
              <Route index element={<AdminDashboard />} />{' '}
              <Route
                path='programming-languages'
                element={<ProgrammingLanguages />}
              />
              <Route path='contact-messages' element={<ContactMessages />} />
              <Route path='analytics' element={<Analytics />} />
              <Route path='users' element={<Users />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </SessionChecker>
      </Router>
    </Provider>
  );
}

export default App;
