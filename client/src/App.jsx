import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Removed useSelector from imports
import store from './redux/store';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/NavBar';
import SessionChecker from './components/SessionChecker';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  const [languages, setLanguages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLang, setCurrentLang] = useState('');
  const [currentLangName, setCurrentLangName] = useState('');

  useEffect(() => {
    axios
      .get('programming-languages')
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const openModalWithCode = (code, codeLang, langName) => {
    setCurrentCode(code);
    setCurrentLang(codeLang);
    setCurrentLangName(langName);
    setIsModalOpen(true);
  };

  return (
    <Provider store={store}>
      <Router>
        <SessionChecker>
          {' '}
          {/* Wrap SessionChecker around components that need to wait for the session check */}
          <Navbar />
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
            <Route path='/admin' element={<Admin />} />
            <Route
              path='/admin-dashboard'
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SessionChecker>
      </Router>
    </Provider>
  );
}

export default App;
