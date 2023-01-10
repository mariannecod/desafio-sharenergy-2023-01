import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
 
function Rotas() {
  return (
    <Router>
      <div className='App'>
        <Link to='/'>Login</Link>
        <Link to='/'>Home</Link>
      </div>
      <Switch>
        <Route path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  );
}
 
export default Rotas;
