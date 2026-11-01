import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './config';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Mess from './pages/Mess';
import MessDetails from './pages/MessDetails';
import Pagenotfound from './pages/Pagenotfound';
import PlanDetails from './pages/PlanDetails';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

// Auth0 needs router access to send users back where they started after login.
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={(appState) => navigate(appState?.returnTo || '/', { replace: true })}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mess" element={<Mess />} />
            <Route path="/mess/:id" element={<MessDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plans" element={<PlanDetails />} />
            <Route path="/planDetails" element={<Navigate to="/plans" replace />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
