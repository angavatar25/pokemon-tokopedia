import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './pokemondetail.scss';
import BackIcon from '../../assets/icons/back-arrow.svg';
import Heart from '../../assets/icons/heart.svg';
import { NavLink } from 'react-router-dom';
import query from '../../query';
import {useQuery} from '@apollo/client';
import {small_device} from '../../breakpoints';

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
    height: auto;
    z-index: 1;
    width: 200px;
    @media (max-width: ${small_device}) {
        width: 120px;
    }
`
const PokemonAbout = styled.h3`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
`
const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    padding-bottom: inherit;
    margin: auto;
    text-align: center;
    left: 0;
    right: 0;
`
const CatchButton = styled.button`
    border: none;
    background-color: #48D0B0;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.3);
    color: white;
    border-radius: 50px;
    width: 100px;
    height: 100px;
    font-weight: bold;
    outline: none;
    @media (max-width: ${small_device}) {
        width: 60px;
        height: 60px;
        font-size: 10px;
    }
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
    const resistant = details.resistant || [];
    const weaknesses = details.weaknesses || [];
    
    const nicknameInput = (event) => {
        setnicknameValue(event.target.value)
    }

    const saveToList = () => {
        var detail = {"id": details.id, "name": nicknameValue, "pokemonName": details.name ,"image": details.image}
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
    let PokemonDetailArray = {
        about: [
            {id: 1, categories: "Classification", skill: details.classification},
            {id: 2, categories: "Flee Rate", skill: details.fleeRate},
            {id: 3, categories: "Resistant", skill: resistant + (resistant.length - 1 ? ', ' : '')},
            {id: 4, categories: "Weakness", skill: weaknesses + (weaknesses.length - 1 ? ', ' : '')},
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
                    <PokemonImage src={details.image}></PokemonImage>
                </PokemonImageContainer>
                <div className="card-container pokemon-card-detail">
                    <div className="detail-container">
                        <div className="text-wrapper">
                            <PokemonAbout>
                                About
                            </PokemonAbout>
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
                <ButtonContainer>
                    <CatchButton onClick={buttonValue}>
                        Catch <br/> Pokemon
                    </CatchButton>
                </ButtonContainer>
                {inputPokemon}
                {toast}
            </div>
        </div>
    )
}


