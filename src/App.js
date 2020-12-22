import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import MyPokemonList from './views/MyPokemonList';
import PokemonDetail from './views/PokemonDetail';
import PokemonList from './views/PokemonList';
import styled from 'styled-components';

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
const MobileViewContainer = styled.section`
  max-width: 500px;
  margin:0 auto;
  position: relative;
`

function App() {
  // var {pokemon_name} = useParams();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <MobileViewContainer>
            <Route exact path="/" render={(props) => <PokemonList{...props}/>}></Route>
            <Route path="/pokemon-detail/:pokemon_name" render={(props) => <PokemonDetail{...props}/>}></Route>
            <Route path="/my-pokemon-list" render={(props) => <MyPokemonList{...props}/>}></Route>
          </MobileViewContainer>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
