import React,{useState, useEffect} from 'react';
import pokemon from '../../assets/images/pokemon.png';
import BackIcon from '../../assets/icons/back-arrow.svg';
import styled from 'styled-components';
import './mypokemonlist.scss';
import MyPokemonCardList from '../../components/MyPokemonCard';
import { NavLink } from 'react-router-dom';

export default function MyPokemonList() {
    const pokemonStorage = localStorage.getItem('pokemon');
    let parsedPokemon = JSON.parse(pokemonStorage)
    const [pokemonList, setpokemonList] = useState(parsedPokemon)
    useEffect(() => {
        handleRemove()
    },[])
    const Navigation = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    `
    const IconSize = {
        width: "25px",
        fill: "white"
    }
    const handleRemove = name => {
        setpokemonList(pokemonList => pokemonList.filter(index => index !== name))
        pokemonList.splice(pokemonList.indexOf(name), 1)
        localStorage.setItem("pokemon", JSON.stringify(pokemonList))
    }
    return (
        <div className="my-pokemon-list-container">
            <NavLink to="/">
                <Navigation>
                    <img src={BackIcon} alt="" className="icon" style={IconSize}/>
                </Navigation>
            </NavLink>
            <div className="title-container">
                <h3 className="main-title">My Pokemon List</h3>
            </div>
            {pokemonList.map((index, id) => {
                return (
                    <MyPokemonCardList
                        PokemonImage={index.image}
                        PokemonNickname={index.name}
                        onRemove={() => handleRemove(index.name)}
                    />
                )
            })}
        </div>
    )
}
