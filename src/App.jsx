import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import { Footer, Navbar } from "./components";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import ARExperience from "./pages/ARExperience";
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <Navbar isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      <main className='bg-slate-300/20'>
        <Routes>
          <Route path='/' element={<Home isMenuOpen={isMenuOpen} />} />
          <Route path='/ar' element={<ARExperience />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/resume' element={<Resume />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
