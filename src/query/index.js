import {gql} from '@apollo/client';
const query = {
    allPokemon: gql`
        {
            pokemons(first: 100){
                id
                number
                name
                types
                image
              }
        }
    `,
    pokemonInfo: (name) => gql`
        query{
            pokemon(name: "${name}") {
                id
                number
                name
                classification
                image
                types
                resistant
                weaknesses
                height {
                    minimum
                    maximum
                }
                fleeRate
                attacks {
                    fast {
                        name
                        type
                        damage
                    }
                    special {
                        name
                        type
                        damage
                    }
                }
                evolutions {
                    id
                    number
                    name
                    image
                    types
                }
            }
        }
    `
}

export default query;