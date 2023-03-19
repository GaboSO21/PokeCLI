const { Pokemon } = require('../models/pokemon');
const { Berry } = require('../models/berry');
const { Shiny } = require('../models/shiny');

const { EmbedBuilder } = require('discord.js');

const createEmbed = (name = '', img = '', types, stats, abilities) => {

    const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(name)
        .setAuthor({ name: 'Gabriel Sanchez - PokeCLI' })
        .addFields({ name: '> Types', value: `${'```'}${types}${'```'}`, inline: false })
        .addFields({ name: '> Stats', value: `${'```'}${stats}${'```'}`, inline: false })
        .addFields({ name: '> Abilities', value: `${'```'}${abilities}${'```'}`, inline: false })
        .setThumbnail('https://dnd-wiki.org/w/images/thumb/2/23/Platinumdex.png/600px-Platinumdex.png')
        .setImage(img)
        .setTimestamp()

    return embed;

}

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

                interaction.reply({ embeds: [createEmbed(pokemon.pokeName, data.sprites.front_default, pokemon.printTypes(), pokemon.printStats(), pokemon.printAbilities())] });

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
















