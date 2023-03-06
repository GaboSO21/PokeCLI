import axios from "axios";

export class Pokemon {

    pokeURl = '';
    pokeName;

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
        this.pokeName = pokemon;

    }

    async buscarPokemon() {

        const instance = axios.create({
            baseURL: this.pokeURl,
        })

        try {

            const resp = await instance.get()

            return resp.data;

        } catch (error) {

            console.log('Pokemon not found.')

        }

    }


}

