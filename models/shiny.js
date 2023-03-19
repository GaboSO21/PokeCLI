const axios = require('axios');

class Shiny {

    pokeURl = '';
    pokeName = '';

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon/${pokemon.replace(' ', '-').toLowerCase()}`;
        this.pokeName = pokemon;

    }

    async searchPokemon() {

        const instance = axios.create({
            baseURL: this.pokeURl,
        })

        try {

            const resp = await instance.get()

            return resp.data.sprites.front_shiny;

        } catch (error) {

            console.log('Pokemon not found.')

        }

    }

}

module.exports = {
    Shiny
}
