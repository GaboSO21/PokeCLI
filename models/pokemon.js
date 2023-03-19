const axios = require('axios');

class Pokemon {

    pokeURl = '';
    pokeName = '';
    id;
    stats = [];
    types = [];
    abilities = [];

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon/${pokemon.replace(' ', '-').toLowerCase()}`;
        this.pokeName = pokemon.replace(pokemon.charAt(0), pokemon.charAt(0).toUpperCase());

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

    async searchPokemon() {

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
        let reply = ``;
        let total = 0;
        this.stats.forEach((stat, i) => {

            reply += `${((i + 1) + '.')} ${stat.stat.name} :: ${stat.base_stat}\n`;
            total += stat.base_stat

        })

        reply += `${'Total:'} :: ${total}\n`;

        return reply;
    }

    printTypes() {
        let reply = ``;
        this.types.forEach((type, i) => {

            const typeName = type.type.name;
            reply += `${((i + 1) + '.')} ${typeName} \n`;

        })
        return reply;
    }

    printAbilities() {
        let reply = ``;
        this.abilities.forEach((ab, i) => {
            reply += `${((i + 1) + '.')} Ability: ${ab.ability.name}\n   Hidden: ${ab.is_hidden}\n--------------------------\n`;
        })
        return reply;
    }

}

module.exports = {
    Pokemon
}
