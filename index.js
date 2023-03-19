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
