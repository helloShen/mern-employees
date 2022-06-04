import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import Navbar from './components/navbar';
import RecordList from './components/recordlist';
import Edit from './components/edit';
import Create from './components/create';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RecordList />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" exact element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
