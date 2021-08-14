import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Form from './Components/Form/Form';
import Edit from './Components/Edit/Edit';
import { AuthProvider } from './Context/Context';
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div className="App">

      <Router>
        
        <AuthProvider>
        <Navbar />

        <Switch>

          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/entry" component={Form} />
          <PrivateRoute exact path="/edit/:id" component={Edit} />

          <Route exact path="/signup">
            <Signup/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

        </Switch>
        </AuthProvider>

      </Router>


    </div>
  );
}

export default App;
