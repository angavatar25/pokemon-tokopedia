import React, { Component } from 'react';
import './comp_pokemonlist.scss';
import { NavLink } from 'react-router-dom';

export default class PokemonListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon_name: this.props.PokemonName || [],
            pokemon_skills: this.props.PokemonSkills || [],
            pokemon_image: this.props.PokemonImage || []
        }
    }
    render() {
        const {pokemon_name, pokemon_skills, pokemon_image} = this.state;
        const skills = pokemon_skills.map((values) => 
            <div className="skills-container">
                <p className="skills" key={values}>{values}</p>
            </div>
        )
        return (
            <NavLink to={{
                pathname:`/pokemon-detail/${pokemon_name}`,
                pokemonName: pokemon_name
            }}>
                <div className="content-container" style={{
                    backgroundColor: 'white',
                    borderRadius: "10px",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '15vh'
                }}>
                    <p className="pokemon-name">{pokemon_name}</p>
                    <div className="pokomon-skill-container">
                        <div className="skills-wrapper">
                            {skills}
                        </div>
                        <div className="pokemon-image-container">
                            <img src={pokemon_image} alt="" className="pokemon-image"/>
                        </div>
                    </div>
                </div>
            </NavLink>
        )
    }
}
