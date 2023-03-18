const { Pokemon } = require('../models/pokemon');
const { Berry } = require('../models/berry');
const { Shiny } = require('../models/shiny');

const { Events, Client, IntentsBitField } = require('discord.js');

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

require('dotenv').config();
client.login(process.env.CLIENT_TOKEN);

const submitModal = async (interaction, i = 1) => {

    if (!interaction.isModalSubmit()) return;

    switch (interaction.customId) {
        case 'pokeModal':

            const name = interaction.fields.getTextInputValue('pokeName');

            const pokemon = new Pokemon(name);
            const data = await pokemon.searchPokemon();

            if (!data) {

                interaction.reply('Pokemon not found');

            } else {

                interaction.reply(`${data.sprites.front_default}`);

                client.on(Events.MessageCreate, async (msg) => {

                    if (i === 1) {
                        msg.reply(`${'> TYPES:'}\n${'```'}${pokemon.printTypes()}${'```'}
                                       ${'> BASE STATS:'}\n${'```'}${pokemon.printStats()}${'```'}
                                       ${'> ABILITIES:'}\n${'```'}${pokemon.printAbilities()}${'```'}`);
                        i++;
                    }

                });

            }
            break;

        case 'shinyModal':

            const shinyName = interaction.fields.getTextInputValue('shinyName');

            const shiny = new Shiny(shinyName);
            const shinyImg = await shiny.searchPokemon();

            if (!shinyImg) {

                interaction.reply('Pokemon not found');

            } else {

                interaction.reply(shinyImg);

            }

            break;

        case 'berryModal':

            const berryName = interaction.fields.getTextInputValue('berryName');

            const berry = new Berry(berryName);
            const berryData = await berry.searchBerry();

            if (!berryData) {

                interaction.reply('Berry not found');

            } else {

                interaction.reply(berryData.berryImg);

            }

            break;
    }

}

const showModal = async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

    }
}

module.exports = {
    submitModal,
    showModal
}
















