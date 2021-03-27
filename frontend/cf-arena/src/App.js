// import logo from './logo.svg';
import './App.css';
import room from '../src/pages/room.component';
import homepage from '../src/pages/homepage.component';
import Header from '../src/components/header.component';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={homepage} />
        <Route exact path='/room/:roomid' component={room} />
      </Switch>
    </div>
  );
}

export default App;
