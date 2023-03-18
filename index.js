const { Client, IntentsBitField, Events, Collection } = require('discord.js');

const fs = require('fs');
const path = require('node:path');
const { submitModal, showModal } = require('./events/modal');

require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent
    ]
}
);

client.commands = new Collection();

const loadCommands = () => {

    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

}

const main = async () => {

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    });

    client.login(process.env.CLIENT_TOKEN);

    client.on(Events.InteractionCreate, showModal);

    client.on(Events.InteractionCreate, submitModal);

}

loadCommands();
main();

// const main = async () => {
//
//     client.on('ready', () => {
//         console.log(`Logged in as ${client.user.tag}`);
//     });
//
//     client.on(Events.InteractionCreate, async interaction => {
//         if (!interaction.isChatInputCommand()) return;
//
//         if (interaction.commandName === 'ping') {
//
//             await interaction.showModal(modal);
//
//         }
//     });
//
//     client.on('messageCreate', async (msg) => {
//         const { content } = msg;
//         if (!msg.author.bot && content === 'pokemon') {
//
//             const pokemon = new Pokemon(content);
//             const data = await pokemon.searchPokemon();
//
//             if (!data) {
//
//                 msg.reply('Pokemon not found');
//
//             } else {
//
//                 msg.reply(pokemon.printTypes());
//
//             }
//
//         }
//
//     });
//
//     client.login(process.env.CLIENT_TOKEN);
// }
//
// main();
//
// Cli app
// const main = async () => {
//
//     let opt = 0;
//
//
//     do {
//
//         opt = await inquireMenu();
//
//         if (opt !== 0) await pausa();
//
//         switch (opt) {
//             case 1:
//                 const inputPoke = await leerInput('Enter a pokemon name:');
//                 const pokemon = new Pokemon(inputPoke);
//
//                 const data = await pokemon.searchPokemon();
//
//                 if (data) {
//
//                     pokemon.printName();
//                     pokemon.printAbilities();
//                     pokemon.printTypes();
//                     pokemon.printStats();
//
//                 }
//
//                 await pausa();
//
//                 break;
//             case 2:
//                 const inputEvo = await leerInput('Enter a pokemon name:');
//                 const chain = new EvoChain(inputEvo);
//
//                 const evoData = await chain.searchChain()
//
//                 if (evoData) {
//
//                     chain.printChain(evoData, chain.evolution);
//
//                 }
//
//                 await pausa();
//
//                 break;
//             case 3:
//                 const inputBerry = await leerInput('Enter a berry name:');
//                 const berry = new Berry(inputBerry);
//
//                 const berryData = await berry.searchBerry();
//
//                 if (berryData) {
//                     console.log(berryData);
//                 }
//
//                 await pausa();
//
//                 break;
//         }
//
//     } while (opt !== 0);
//
//
// }
//main();
