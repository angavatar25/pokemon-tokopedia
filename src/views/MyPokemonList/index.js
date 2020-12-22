import React,{useEffect, useState} from 'react';
import BackIcon from '../../assets/icons/back-arrow.svg';
import styled from 'styled-components';
import './mypokemonlist.scss';
import MyPokemonCardList from '../../components/MyPokemonCard';
import { NavLink } from 'react-router-dom';
import box from '../../assets/icons/unavailable.svg';


export default function MyPokemonList(props) {
    const pokemonStorage = localStorage.getItem('pokemon');
    let parsedPokemon = JSON.parse(pokemonStorage)
    const [pokemonList, setpokemonList] = useState(parsedPokemon)
    const [emptyPokeomon, setemptyPokeomon] = useState(false)
    var imageEmpty = props;
    var lengthOfArray = pokemonList.length;

    useEffect(() => {
        if (lengthOfArray == 0) {
            setemptyPokeomon(true)
        } else {setemptyPokeomon(false)}
    },[lengthOfArray])
    
    const Navigation = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    `
    const IconSize = {
        width: "25px",
        height: "25px",
        fill: "white"   
    }
    const handleRemove = name => {
        setpokemonList(pokemonList => pokemonList.filter(index => index.name !== name))
        pokemonList.splice(pokemonList.indexOf(name), 1)
        localStorage.setItem("pokemon", JSON.stringify(pokemonList))
    }

    imageEmpty = (
        <div className={emptyPokeomon ? "pokemon-not-available" : "pokemon-not-available inactive"}>
            <div className="child" style={{textAlign: 'center'}}>
                <img src={box} alt="unavailable" className="image" style={{
                    width: '100px',
                    height: '100px'
                }}/>
                <p className="warning" style={{margin: '20px 0'}}>No pokemon available</p>
            </div>
        </div>
    )
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
            {imageEmpty}
        </div>
    )
}
