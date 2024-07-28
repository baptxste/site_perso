// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './pages/home';
import Graph from "./pages/Graph_index";
// import About from './pages/About';
// import Contact from './pages/Contact';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/graph" element={<Graph />} />
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
            {/* <Footer /> */}
        </Router>
    );
};

export default App;
