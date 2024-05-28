import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
// Import pages
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
// Import components
import NavBar from './components/common/NavBar';
import AdminNavBar from './components/admin/AdminNavBar';
import TokenChecker from './components/auth/TokenChecker';
// Axios setup
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLang, setCurrentLang] = useState('');
  const [currentLangName, setCurrentLangName] = useState('');

  const openModalWithCode = (code, codeLang, langName) => {
    setCurrentCode(code);
    setCurrentLang(codeLang);
    setCurrentLangName(langName);
    setIsModalOpen(true);
  };

  function NavbarWrapper() {
    const location = useLocation();

    if (location.pathname.startsWith('/admin-dashboard')) {
      return <AdminNavBar />;
    } else {
      return <NavBar />;
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <NavbarWrapper />
        <Routes>
          <Route
            path='/'
            element={
              <Home
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                openModalWithCode={openModalWithCode}
                currentCode={currentCode}
                currentLang={currentLang}
                currentLangName={currentLangName}
              />
            }
          />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-dashboard' element={<TokenChecker />}>
            <Route index element={<AdminDashboard />} />
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
      </Router>
    </Provider>
  );
}

export default App;
