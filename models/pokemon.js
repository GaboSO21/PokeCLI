import axios from "axios";
import colors from 'colors';

export class Pokemon {

    pokeURl = '';
    pokeName = '';
    id;
    stats = [];
    types = [];
    abilities = [];

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
        this.pokeName = pokemon;

    }

    set pokeAbilities(value) {
        this.abilities = value;
    }

    set pokeId(value) {
        this.id = value;
    }

    set pokeTypes(value) {
        this.types = value;
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

            this.pokeId = resp.data.id;
            this.pokeAbilities = resp.data.abilities;
            this.pokeStats = resp.data.stats;
            this.pokeTypes = resp.data.types;

            return resp.data;

        } catch (error) {

            console.log('Pokemon not found.')

        }

    }

    printStats() {
        console.log(`${colors.yellow('  Stats')}`);
        console.log(`${colors.red('===================')}`);
        this.stats.forEach((stat, i) => {
            console.log(`${colors.yellow((i + 1) + '.')} ${stat.stat.name} :: ${stat.base_stat}`)
        })
        console.log();
    }

    printTypes() {
        console.log(`${colors.yellow('  Types')}`);
        console.log(`${colors.red('===================')}`);
        this.types.forEach((type, i) => {
            const typeName = type.type.name;
            console.log(`${colors.yellow((i + 1) + '.')} ${typeName}`);
        })
        console.log();
    }

    printName() {
        console.log(`${colors.yellow('  Id')}`);
        console.log(`${colors.red('===================')}`);
        console.log(`${colors.white(this.id)}`);
        console.log();
        console.log(`${colors.yellow('  Name')}`);
        console.log(`${colors.red('===================')}`);
        console.log(`${colors.white(this.pokeName.toUpperCase())}`);
        console.log();
    }

    printAbilities() {
        console.log(`${colors.yellow('  Abilities')}`);
        console.log(`${colors.red('===================')}`);
        this.abilities.forEach((ab, i) => {
            console.log(`${colors.yellow(i + 1)} ${'Abilitiy:'.random} ${ab.ability.name}`)
            console.log(`${'Hidden:'.yellow} ${ab.is_hidden}`)
            console.log('--------------'.yellow);
        })
        console.log();
    }

}

