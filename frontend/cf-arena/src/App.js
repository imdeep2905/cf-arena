// import logo from './logo.svg';
import './App.css';
import Room from '../src/pages/room.component';
import Homepage from '../src/pages/homepage.component';
import Header from '../src/components/header.component';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/room/:roomId' component={Room} />
      </Switch>
    </div>
  );
}

export default App;
