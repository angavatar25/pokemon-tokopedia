import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import MyPokemonList from './views/MyPokemonList';
import PokemonDetail from './views/PokemonDetail';
import PokemonList from './views/PokemonList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <PokemonList{...props}/>}></Route>
        <Route path="/pokemon-detail" render={(props) => <PokemonDetail{...props}/>}></Route>
        <Route path="/my-pokemon-list" render={(props) => <MyPokemonList{...props}/>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
