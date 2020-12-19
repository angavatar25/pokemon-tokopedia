import React from 'react';
import pokemon from '../../assets/images/pokemon.png';
import BackIcon from '../../assets/icons/back-arrow.svg';
import styled from 'styled-components';
import './mypokemonlist.scss';
import MyPokemonCardList from '../../components/MyPokemonCard';

export default function MyPokemonList() {
    const Navigation = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    `
    const IconSize = {
        width: "25px",
        fill: "white"
    }
    return (
        <div className="my-pokemon-list-container">
            <Navigation>
                <img src={BackIcon} alt="" className="icon" style={IconSize}/>
            </Navigation>
            <div className="title-container">
                <h3 className="main-title">My Pokemon List</h3>
            </div>
            <MyPokemonCardList/>
        </div>
    )
}
