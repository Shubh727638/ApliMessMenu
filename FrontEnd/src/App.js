import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Mess from './pages/Mess';
import Pagenotfound from './pages/Pagenotfound';
import PlanDetails from './pages/PlanDetails';
//import PrivateRoute from './pages/PrivateRoute'; // Import PrivateRoute component

const domain = 'dev-fbkinoo8f2q6g3nk.us.auth0.com';
const clientId = 'hRR9Ch4YfsiWa8sBu2sLF54O9hbXOzpQ';

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      // Use authorizationParams to specify redirect_uri
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mess" element={<Mess />} />
          <Route path="/planDetails" element={<PlanDetails />} /> {/* Use PrivateRoute */}
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
