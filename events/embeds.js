const { EmbedBuilder } = require('discord.js');

const pokemonEmbed = (name = '', img = '', types, stats, abilities) => {

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

const shinyEmbed = (name = '', img = '') => {

    const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(name)
        .setAuthor({ name: 'Gabriel Sanchez - PokeCLI' })
        .setThumbnail('https://dnd-wiki.org/w/images/thumb/2/23/Platinumdex.png/600px-Platinumdex.png')
        .setImage(img)
        .setTimestamp()

    return embed;

}

const berryEmbed = (name = '', img = '', effect = '') => {

    const embed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle(name)
        .setAuthor({ name: 'Gabriel Sanchez - PokeCLI' })
        .setThumbnail('https://dnd-wiki.org/w/images/thumb/2/23/Platinumdex.png/600px-Platinumdex.png')
        .addFields({ name: '> Effect', value: `${'```'}${effect}${'```'}`, inline: false })
        .setImage(img)
        .setTimestamp()

    return embed;

}

module.exports = {
    pokemonEmbed,
    shinyEmbed,
    berryEmbed
}

