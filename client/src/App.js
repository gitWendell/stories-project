import './App.css';
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {

  return (
  <Router>
    <div className="App">
    <Navbar />
      <Container maxwidth='lg'>
        <Switch>
          <Route 
            path="/" 
            exact 
            component={Home} />
          <Route 
            path="/auth" 
            exact 
            component={Auth} />
        </Switch>
      </Container>
    </div>
  </Router>
   
  );
}

export default App;
