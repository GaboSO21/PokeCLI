const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('berry')
        .setDescription('Prompts a modal window'),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setTitle('PokeCLI')
            .setCustomId('berryModal');

        const name = new TextInputBuilder()
            .setCustomId('berryName')
            .setRequired(true)
            .setLabel('Enter a berry name')
            .setStyle(TextInputStyle.Short);

        const firstActonRow = new ActionRowBuilder().addComponents(name);

        modal.addComponents(firstActonRow);

        await interaction.showModal(modal);

    }
}

