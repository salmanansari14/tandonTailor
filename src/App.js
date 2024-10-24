import './App.css';
import Item from "./Component/Item";
import { BrowserRouter as Router, Route, Routes, Link }
  from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Item2 from './Component/Item2';
function App() {

  return (
    <Router>
        <div className='nav'>
            <li><Link className='navitem' to='tandonTailor'>Sheet 1</Link></li>
            <li><Link className='navitem' to='irshad'>Sheet 2</Link></li>
        </div>
      <Routes >
        <Route exact path='/tandonTailor' element={<Item />} />
        <Route exact path='/irshad' element={<Item2 />} />
      </Routes>
    </Router>
  );

}

export default App;
