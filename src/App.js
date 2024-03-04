import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Contact from "./pages/Contact";
import Mess from "./pages/Mess";
import Pagenotfound from "./pages/Pagenotfound";
import PlanDetails from './pages/PlanDetails';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/mess" element={<Mess />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/planDetails" element={<PlanDetails/>}/>
        <Route path="*" element={<Pagenotfound/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
