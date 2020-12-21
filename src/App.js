import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import MyPokemonList from './views/MyPokemonList';
import PokemonDetail from './views/PokemonDetail';
import PokemonList from './views/PokemonList';

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
})

function App() {
  // var {pokemon_name} = useParams();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <PokemonList{...props}/>}></Route>
          <Route path="/pokemon-detail/:pokemon_name" render={(props) => <PokemonDetail{...props}/>}></Route>
          <Route path="/my-pokemon-list" render={(props) => <MyPokemonList{...props}/>}></Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
