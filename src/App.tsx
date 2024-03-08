import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';
import './App.css';


function App() {
  return (
    <Router>
      <main className='bg-gray-100 dark:bg-gray-900 min-h-[100vh] w-full'>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:userId" element={<Detail />} />
          </Routes>
        </div>
      </main>
    </Router>)
}

export default App;
