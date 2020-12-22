import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './pokemondetail.scss';
import BackIcon from '../../assets/icons/back-arrow.svg';
import Heart from '../../assets/icons/heart.svg';
import { NavLink } from 'react-router-dom';
import query from '../../query';
import {useQuery} from '@apollo/client';

const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`
const PokemonDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0 20px 0;
`
const PokemonSkillContainer = styled.div`
    background-color: gray;
    opacity: 0.8;
    border-radius: 20px;
    padding: 5px 15px;
    margin-bottom: 10px;
    margin-right: 5px;
`
const PokemonSkillText = styled.p`
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: white;
    text-transform: capitalize
`
const PokemonNumber = styled.p`
    color: black;
    font-size: 16px;
    font-weight: bold;
`
const PokemonImageContainer = styled.div`
    text-align: center
`
const PokemonImage = styled.img.attrs(props => ({
    src: props.src
}))`
    width: 200px;
    height: auto;
    z-index: 1;
`

export default function PokemonDetail({props, match}) {
    let params = match.params
    const pokemonName = params.pokemon_name;
    var inputPokemon = props;
    var toast = props;
    const [inputNickname, setinputNickname] = useState(false)
    const [nicknameValue, setnicknameValue] = useState('')
    const [toastState, settoastState] = useState(false)
    const {loading, error, data} = useQuery(query.pokemonInfo(pokemonName));
    const details = data ? data.pokemon : [];

    const nicknameInput = (event) => {
        setnicknameValue(event.target.value)
    }

    const saveToList = () => {
        var detail = {"id": details.id, "name": nicknameValue, "image": details.image}
        var pokemon = JSON.parse(localStorage.getItem("pokemon") || "[]")
        pokemon.push(detail)
        localStorage.setItem("pokemon", JSON.stringify(pokemon))
        setnicknameValue('')
        setinputNickname(false)
        settoastState(true)
    }
    const buttonValue = () => {
        setinputNickname(true)
        setnicknameValue('')
    }
    useEffect(() => {
        setInterval(function() {
            settoastState(false)
        }, 6000)
    }, [])
    toast = (
        <div className={toastState ? "toast-container active" : "toast-container"}>
            <div className="text-container">
                <p className="toast-text">Pokemon added successfully</p>
            </div>
        </div>
    )

    inputPokemon = (
        <div className={inputNickname ? "container active" : "container"}>
            <section className="input-nickname-container">
                <div className="title-container">
                    <h3 className="title">Pokemon Catched Successfully</h3>
                </div>
                <div className="form-container">
                    <div className="label-container">
                        <p className="label">Give it a nickname</p>
                    </div>
                    <input type="text" name="" id="" className="input-nickname" onChange={nicknameInput} value={nicknameValue} placeholder="Enter a nickname"/>
                </div>
                <div className="button-save-container">
                    <button className="button-save outline" onClick={() => setinputNickname(false)}>Close</button>
                    <button className="button-save" onClick={saveToList}>
                        Save
                    </button>
                </div>
            </section>
        </div>
    )
    
    const DetailNavigation = [
        {id: 1, text: "About"},
        {id: 2, text: "Base Stats"},
        {id: 3, text: "Attacks"},
        {id: 4, text: "Evolutions"},
    ]

    const DetailNavigationContainer = styled.div`
        display: flex;
        width: 100%;
        border-bottom: 1px solid gray;
        justify-content: center;
    `
    let PokemonDetailArray = {
        about: [
            {id: 1, categories: "Classification", skill: details.classification},
            {id: 2, categories: "Height", skill: "(Maximum)"},
            {id: 3, categories: "Resistant", skill: details.resistant},
            {id: 4, categories: "Weakness", skill: details.weaknesses},
        ]
    }
    const IconSize = {
        width: "25px",
        fill: "white"
    }
    return (
        <div className="pokemon-detail-container">
            <div className="pokemon-detail-content">
                <Navigation>
                    <NavLink to="/">
                        <img src={BackIcon} alt="" className="icon" style={IconSize}/>
                    </NavLink>
                    <img src={Heart} alt="" className="icon" style={IconSize}/>
                </Navigation>
                <PokemonDetailContainer>
                    <div className="left-side">
                        <h3 className="main-title" style={{textTransform: 'capitalize'}}>{details.name}</h3>
                        <div className="skill-wrapper" style={{display: 'flex', marginTop: '15px'}}>
                            {details.types && details.types.map((index) => {
                                return (
                                    <PokemonSkillContainer>
                                        <PokemonSkillText>{index}</PokemonSkillText>
                                    </PokemonSkillContainer>
                                )
                            })}
                        </div>
                    </div>
                    <div className="right-side" style={{margin: 'auto 0'}}>
                        <PokemonNumber>
                            #{details.number}
                        </PokemonNumber>
                    </div>
                </PokemonDetailContainer>
                <PokemonImageContainer>
                    {/* <img src={pokemon} alt="" className="pokemon"/> */}
                    <PokemonImage src={details.image}></PokemonImage>
                </PokemonImageContainer>
                {/* {menu} */}
                <div className="card-container pokemon-card-detail">
                    <div className="detail-container">
                        <div className="text-wrapper">
                            {PokemonDetailArray.about && PokemonDetailArray.about.map((index,id) => {
                                return(
                                    <div className="text-container">
                                        <div className="categories-container">
                                            <p className="categories">{index.categories}</p>
                                        </div>
                                        <div className="stats-container">
                                            <p className="stats">{index.skill}</p>            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={buttonValue} className="catch-pokemon">
                        Catch <br/> Pokemon
                    </button>
                </div>
                {inputPokemon}
                {toast}
            </div>
        </div>
    )
}


