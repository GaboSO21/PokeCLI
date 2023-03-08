import { Pokemon } from './models/pokemon.js';
import { inquireMenu, leerInput, pausa } from "./helpers/inquire.js";


const main = async () => {

    let opt = 0;


    do {

        opt = await inquireMenu();

        if (opt !== 0) await pausa();

        switch (opt) {
            case 1:
                const input = await leerInput('Enter a pokemon name');
                const pokemon = new Pokemon(input);

                const data = await pokemon.buscarPokemon(pokemon);

                if (data) {

                    console.clear();
                    // console.log(data);
                    console.log(pokemon.versions);
                    // pokemon.printName();
                    // pokemon.printTypes();
                    // pokemon.printStats();
                    // console.log(pokemon.versions);
                    ;
                }

                await pausa();


                break;
        }

    } while (opt !== 0);


}


main();

