import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Navbar from './components/navbar';
import RecordList from './components/recordList';
import Edit from './components/edit';
import Create from './components/create';
import Navbar from './components/navbar';
import Footer from './components/footer/footer';

const App = () => {
  return (
    <div className="main">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecordList />} />
          <Route path="/mern-employees/" element={<RecordList />} />
          <Route path="/mern-employees/create" element={<Create />} />
          <Route path="/mern-employees/edit/:id" exact element={<Edit />} />
        </Routes>
        <Footer
          sourceCode="https://github.com/helloShen/mern-employees"
          githubLogo="black"
        />
      </Router>
    </div>
  );
};

export default App;
