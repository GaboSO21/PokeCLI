import axios from "axios";
import colors from 'colors';

export class Pokemon {

    pokeURl = '';
    pokeName;
    stats = [];

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
        this.pokeName = pokemon;

    }

    set pokeStats(value) {
        this.stats = value;
    }

    async buscarPokemon() {

        const instance = axios.create({
            baseURL: this.pokeURl,
        })

        try {

            const resp = await instance.get()

            this.pokeStats = resp.data.stats;

            return resp.data;
        } catch (error) {

            console.log('Pokemon not found.')

        }

    }

    printStats() {
        this.stats.forEach((stat, i) => {
            console.log(`${colors.red((i + 1) + '.')} ${stat.stat.name} :: ${stat.base_stat}`)
        })
    }

}

