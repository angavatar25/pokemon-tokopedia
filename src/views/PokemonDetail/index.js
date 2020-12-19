import React from 'react';
import styled from 'styled-components';
import './pokemondetail.scss';
import pokemon from '../../assets/images/pokemon.png';
import BackIcon from '../../assets/icons/back-arrow.svg';
import Heart from '../../assets/icons/heart.svg';
import { NavLink } from 'react-router-dom';

export default function PokemonDetail() {
    const Navigation = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    `
    const MyIcon = styled.img.attrs(props => ({
        src: `url(${props.img})`
    }))`
        width: 25px
    `
    const PokemonDetail = styled.div`
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
    const IconSize = {
        width: "25px",
        fill: "white"
    }
    return (
        <div className="pokemon-detail-container">
            <div className="pokemon-detail-content">
                <Navigation>
                    <img src={BackIcon} alt="" className="icon" style={IconSize}/>
                    <img src={Heart} alt="" className="icon" style={IconSize}/>
                </Navigation>
                <PokemonDetail>
                    <div className="left-side">
                        <h3 className="main-title">Bulbasaur</h3>
                        <div className="skill-wrapper" style={{display: 'flex', marginTop: '15px'}}>
                            <PokemonSkillContainer>
                                <PokemonSkillText>Grass</PokemonSkillText>
                            </PokemonSkillContainer>
                            <PokemonSkillContainer>
                                <PokemonSkillText>Poison</PokemonSkillText>
                            </PokemonSkillContainer>
                        </div>
                    </div>
                    <div className="right-side" style={{margin: 'auto 0'}}>
                        <PokemonNumber>
                            #001
                        </PokemonNumber>
                    </div>
                </PokemonDetail>
                <PokemonImageContainer>
                    {/* <img src={pokemon} alt="" className="pokemon"/> */}
                    <PokemonImage src={pokemon}></PokemonImage>
                </PokemonImageContainer>
                <CardDetail/>
            </div>
        </div>
    )
}

export class CardDetail extends React.Component {
  render() {
    const DetailNavigation = [
        {id: 1, text: "About"},
        {id: 2, text: "Base Stats"},
        {id: 3, text: "Attacks"},
        {id: 4, text: "Evolutions"},
    ]
    
    let PokemonDetail = {
        about: [
            {id: 1, categories: "Species", skill: "Seed"},
            {id: 2, categories: "Height", skill: "0.70cm"},
            {id: 3, categories: "Weight", skill: "15.2 lbs (6.9 kg)"},
            {id: 4, categories: "Abilities", skill: "Overgrow, Chlorophyl"},
        ],
        breding: [
            {id: 1, categories: "Egg Groups", skill: "Monster"},
            {id: 2, categories: "Egg Cycle", skill: "Grass"},
        ]
    }
    const DetailNavigationContainer = styled.div`
        display: flex;
        width: 100%;
        border-bottom: 1px solid gray;
        justify-content: center;
    `
    const ButtonStyle = {
        width: '100%',
        backgroundColor: 'transparent'

    }
    return (
      <div className="card-container pokemon-card-detail">
        <DetailNavigationContainer>
            {DetailNavigation.map((index, id) => {
                return(
                    <NavLink to="/" className="button" key={id}>{index.text}</NavLink>
                )
            })}
        </DetailNavigationContainer>
        <div className="detail-container">
            <div className="text-wrapper">
                {PokemonDetail.about.map((index,id) => {
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
                <h3 className="sub-title" style={{fontWeight: 'bold', fontSize: '15px', margin: '10px 0'}}>Breeding</h3>
                {PokemonDetail.breding.map((index,id) => {
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
                {/* <p className="categories">Species</p>
                <p className="stats">Seed</p> */}
            </div>
        </div>
      </div>
    );
  }
}

