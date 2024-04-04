import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import axios from 'axios';

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
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
