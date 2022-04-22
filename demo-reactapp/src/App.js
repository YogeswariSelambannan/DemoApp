import logo from './logo.svg';
import './App.css';
//import * as ReactDOM from "react-dom";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import {Home} from './Home'
import {DemoSell} from './DemoSell'

function App() {
  return (
    <div className="container">
      <h3>ReactJS Demo Energy Selling App</h3>
      <p>Please choose a link from the list below.</p>
      <Router>
    <ul>
        <li>
            <Link to="t1">Demo Form</Link>
        </li>
       
    </ul>

    <Routes>
        <Route path="/t1" exact element={<DemoSell/>}/>
        <Route path="/t2" exact element={<Home/>}/>
        
    </Routes>

</Router>
    </div>
  );
}

export default App;
