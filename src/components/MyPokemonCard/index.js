import React, { Component } from 'react';
import styled from 'styled-components';
import './comp_mypokemoncard.scss';
import pokemon from '../../assets/images/pokemon.png';
import Remove from '../../assets/icons/cancel.svg';

export default class MyPokemonCardList extends Component {
  render() {
    const PokemonImage = styled.img.attrs(props => ({
        src: props.src
    }))`
        width: 100%;
        height: auto;
        z-index: 1;
    `
    const Nickname = styled.h3`
        font-size: 20px;
        font-weight: bold;
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
        font-size: 12px;
        font-weight: bold;
        color: white;
    `
    const PokemonDetail = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    `
    const CloseButtonContainer = styled.div`
        position: absolute;
        top: 0;
        right: 0;
        text-align: right;
        padding: 10px 15px;
    `
    return (
      <div className="card-container my-pokemon-card">
        <div className="row">
            <div className="col-4 image-container px-0">
                <PokemonImage src={pokemon}></PokemonImage>
            </div>
            <div className="col-8 text-container">
                <Nickname>Nickname</Nickname>
                <PokemonDetail>
                    <PokemonSkillContainer>
                        <PokemonSkillText>Skills</PokemonSkillText>
                    </PokemonSkillContainer>
                </PokemonDetail>
            </div>
        </div> 
        <CloseButtonContainer>
            <img src={Remove} alt="" style={{width: '10%'}}/>
        </CloseButtonContainer>
      </div>
    );
  }
}
