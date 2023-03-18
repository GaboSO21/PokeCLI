const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Prompts a modal window'),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setTitle('PokeCLI')
            .setCustomId('pokeModal');

        const name = new TextInputBuilder()
            .setCustomId('pokeName')
            .setRequired(true)
            .setLabel('Enter a pokemon name')
            .setStyle(TextInputStyle.Short);

        const firstActonRow = new ActionRowBuilder().addComponents(name);

        modal.addComponents(firstActonRow);

        await interaction.showModal(modal);

    }
}

