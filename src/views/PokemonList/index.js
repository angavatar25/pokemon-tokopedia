import React,{useState, useEffect} from 'react';
import './pokemonlist.scss';
import Settings from '../../assets/icons/settings.svg';
import PokemonListComponent from '../../components/PokemonList';
import pokeball from '../../assets/icons/pokeball.svg';
import styled from 'styled-components';
import axios from 'axios';
import {API_LINK} from '../../apiReference';

export default function PokemonList() {
    const [pokemonName, setpokemonName] = useState([]);
    const [pokemonSkills, setpokemonSkills] = useState([]);
    useEffect(() => {
        axios.get(API_LINK + "/pokemon/").then((response) => {
            const pokemon_result = response.data.results
            const pokemon = pokemon_result.map((index, id) => {
                return{
                    id: id,
                    pokename: index.name
                }
            })
            setpokemonName(pokemon)
        })
        pokemonName.map((index) => {
            axios.get(API_LINK + "pokemon/" + index.pokename).then((response) => {
                const abilities_result = response.data.abilities
                const abilities = abilities_result.map((index, id) => {
                    return {
                        id: id,
                        abilities: index.ability
                    }
                })
                setpokemonSkills(abilities)
            })
        })
    },[])
    const OwnedPokemon = styled.div`
        display: flex;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.12);
        padding: 10px;
        border-radius: 50px;
        background-color: #76BDFE;
        color: white;
    `
    const ImageContainer = styled.div`
        width: 10%;
        margin-right: 5%;
    `
    const TextContainer = styled.div`
        width: 70%;
        margin: auto 0;
    `
    return (
        <div className="pokemon-list-container">
            <div className="navigation-container">
                <img src="" alt="" className="icon back-icon"/>
                <img src={Settings} alrt="" className="icon settings-icon"/>
            </div>
            <div className="title-container">
                <h1 className="main-title">Pokedex</h1>
                <OwnedPokemon>
                    <ImageContainer>
                        <img src={pokeball} alt="" style={{width: '100%'}}/>
                    </ImageContainer>
                    <TextContainer>
                        <p className="owned-pokemon" 
                            style={{
                                margin: "0", 
                                fontSize: "12px", 
                                fontWeight: 'bold'
                            }}>
                            Owned Pokemon (20 Pokemon)
                        </p>
                    </TextContainer>
                </OwnedPokemon>
            </div>
            <div className="card-stack-container">
                <div className="row">
                    {pokemonName.map((index, id) => {
                        return(
                            <div className="col-6" key={id}>
                                <PokemonListComponent
                                    PokemonName={index.pokename}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
