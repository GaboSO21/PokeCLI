import axios from "axios";
import colors from 'colors';

export class EvoChain {

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
                console.log();
                console.log(`\t${colors.yellow(name.replace(name.charAt(0), name.charAt(0).toUpperCase()))}`);
                console.log(`\t${'   |   '.red}`);
                console.log(`\t${'   |   '.red}`);
                console.log(`\t${'   v   '.red}`);
                return this.printChain({}, arr, 1);
            } else {
                let name = arr[0].species.name;
                console.log(`\t${colors.yellow(name.replace(name.charAt(0), name.charAt(0).toUpperCase()))}`);
                if (arr[0].evolves_to.length !== 0) {
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

}













