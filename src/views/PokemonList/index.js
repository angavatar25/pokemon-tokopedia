import React,{useState, useEffect} from 'react';
import './pokemonlist.scss';
import PokemonListComponent from '../../components/PokemonList';
import pokeball from '../../assets/icons/pokeball.svg';
import styled from 'styled-components';
import {useQuery} from '@apollo/client';
import query from '../../query';
import { NavLink } from 'react-router-dom';

const OwnedPokemon = styled.div`
    display: flex;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.12);
    padding: 10px;
    border-radius: 50px;
    background-color: white;
    color: white;
    margin: 30px 0 50px 0;
`
const ImageContainer = styled.div`
    width: 10%;
    margin-right: 5%;
`
const TextContainer = styled.div`
    width: 70%;
    margin: auto 0;
`

export default function PokemonList(props) {
    const [ownedPokemon, setownedPokemon] = useState()
    const {loading, error, data} = useQuery(query.allPokemon);
    const pokemon_data = data ? data.pokemons : [];
    let pokemonStorage = localStorage.getItem('pokemon')
    const parsedPokemon = JSON.parse(pokemonStorage)
    useEffect(() => {
        document.title = "My Pokemons"
        if (parsedPokemon === null) {
            setownedPokemon('0')
        } else {
            setownedPokemon(parsedPokemon.length)
        }
    },[])
    const pokemon = pokemon_data.map((index) => {
        return {
            id: index.id,
            name: index.name,
            types: index.types,
            image: index.image
        }
    })

    return (
        <div className="pokemon-list-container">
            <div className="title-container">
                <h1 className="main-title" style={{color: 'white'}}>Pokedex</h1>
                <NavLink to="/my-pokemon-list">
                    <OwnedPokemon>
                        <ImageContainer>
                            <img src={pokeball} alt="" style={{width: '100%'}}/>
                        </ImageContainer>
                        <TextContainer>
                            <p className="owned-pokemon" 
                                style={{
                                    margin: "0", 
                                    fontSize: "12px", 
                                    fontWeight: 'bold',
                                    color: '#76BDFE'
                                }}>
                                Owned Pokemon ({ownedPokemon} Pokemon)
                            </p>
                        </TextContainer>
                    </OwnedPokemon>
                </NavLink>
            </div>
            <div className="card-stack-container">
                <div className="row">
                    {pokemon.map((index) => {
                        return(
                            <div className="col-6" key={index.id}>
                                <PokemonListComponent
                                    PokemonName={index.name}
                                    PokemonSkills={index.types}
                                    PokemonImage={index.image}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
