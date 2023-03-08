import { Pokemon } from './models/pokemon.js';
import { inquireMenu, leerInput, pausa } from "./helpers/inquire.js";
import { EvoChain } from './models/evo-chain.js';


const main = async () => {

    let opt = 0;


    do {

        opt = await inquireMenu();

        if (opt !== 0) await pausa();

        switch (opt) {
            case 1:
                const inputPoke = await leerInput('Enter a pokemon name:');
                const pokemon = new Pokemon(inputPoke);

                const data = await pokemon.buscarPokemon();

                if (data) {

                    pokemon.printName();
                    pokemon.printAbilities();
                    pokemon.printTypes();
                    pokemon.printStats();

                }

                await pausa();

                break;
            case 2:
                const inputEvo = await leerInput('Enter a pokemon name:');
                const chain = new EvoChain(inputEvo);

                const evoData = await chain.searchChain()

                if (evoData) {
                    chain.printChain(evoData, chain.evolution);
                    // console.log(evoData);
                    // console.log(chain.evolution[0].evolves_to);
                }

                await pausa();

                break;
        }

    } while (opt !== 0);


}


main();

