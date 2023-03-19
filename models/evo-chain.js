const axios = require('axios');

class EvoChain {

    pokeURL = '';
    evolution = [];

    constructor(pokemon = '') {

        this.pokeURl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.replace(' ', '-').toLowerCase()}`;

    }

    set evolutionTo(value) {
        this.evolution = value;
    }

    async searchChain() {

        const pokeInstance = axios.create({
            baseURL: this.pokeURl,
        })

        try {

            const resp = await pokeInstance.get()
            const { url } = resp.data.evolution_chain;

            const evoInstance = axios.create({
                baseURL: url
            })

            const evoResp = await evoInstance.get();
            const { evolves_to } = evoResp.data.chain;

            this.evolutionTo = evolves_to;
            return evoResp.data.chain;

        } catch (error) {

            console.log('Pokemon not found.')

        }

    }

    printChain(obj = {}, arr = [], idx = 0) {

        if (arr.length === 0) {
            return;
        } else {

            if (idx === 0) {
                let name = obj.species.name;
                let details = arr[0].evolution_details[0];
                console.log();
                console.log(`\t${colors.yellow(name.replace(name.charAt(0), name.charAt(0).toUpperCase()))}`);
                this.printTrigger(details, details.trigger.name);
                console.log(`\t${'   |   '.red}`);
                console.log(`\t${'   |   '.red}`);
                console.log(`\t${'   v   '.red}`);
                return this.printChain({}, arr, 1);
            } else {
                let name = arr[0].species.name;
                let evolution = arr[0].evolves_to;
                console.log(`\t${colors.yellow(name.replace(name.charAt(0), name.charAt(0).toUpperCase()))}`);
                if (evolution.length !== 0) {
                    let details = arr[0].evolves_to[0].evolution_details[0];
                    this.printTrigger(details, details.trigger.name);
                    console.log(`\t${'   |   '.red}`);
                    console.log(`\t${'   |   '.red}`);
                    console.log(`\t${'   v   '.red}`);
                    return this.printChain({}, arr[0].evolves_to, 1);
                } else {
                    console.log();
                    return this.printChain({}, arr[0].evolves_to, 1);
                }
            }

        }

    }

    printTrigger(obj = {}, trigger = '') {

        switch (trigger) {
            case "level-up":
                console.log(`\t${colors.white(trigger)}`);
                console.log(`\tLvl - ${obj.min_level}`);
                break;
            default:
                console.log(`\t${colors.white(trigger)}`);
                break;
        }

    }

}

module.exports = {
    EvoChain
}











