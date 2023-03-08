import axios from "axios";
import colors from 'colors';

export class Pokemon {

    pokeURl = '';
    pokeName;
    stats = [];
    types = [];
    versions = {};

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
        this.pokeName = pokemon;

    }

    set pokeTypes(value) {
        this.types = value;
    }

    set pokeStats(value) {
        this.stats = value;
    }

    set pokeVersions(value) {
        this.versions = value;
    }

    async buscarPokemon() {

        const instance = axios.create({
            baseURL: this.pokeURl,
        })

        try {

            const resp = await instance.get()

            this.pokeVersions = resp.data.versions;
            this.pokeStats = resp.data.stats;
            this.pokeTypes = resp.data.types;

            return resp.data;
        } catch (error) {

            console.log('Pokemon not found.')

        }

    }

    printStats() {
        console.log(`${colors.yellow('  Stats')}`);
        console.log(`${colors.yellow('==========')}`);
        this.stats.forEach((stat, i) => {
            console.log(`${colors.red((i + 1) + '.')} ${stat.stat.name} :: ${stat.base_stat}`)
        })
        console.log();
    }

    printTypes() {
        console.log(`${colors.yellow('  Types')}`);
        console.log(`${colors.yellow('==========')}`);
        this.types.forEach((type, i) => {
            const typeName = type.type.name;
            console.log(`${colors.red((i + 1) + '.')} ${typeName}`);
        })
        console.log();
    }

    printName() {
        console.log(`${colors.yellow('  Name')}`);
        console.log(`${colors.yellow('==========')}`);
        console.log(`${colors.red(this.pokeName.toUpperCase())}`);
        console.log();
    }

}

