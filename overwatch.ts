const discord = require('discord.js');
const overwatch = require('overwatch-api');
const client = new discord.Client();

/* Discord Config import */
let config: any;
try {
	config = require(`${__dirname}/config.json`);
} catch {
	throw new Error('Please create a config.json file!');
}

const helpText: string = `Working on it...`;

let typeAnnoy = false;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('typingStart', (channel: any, user: any) => {
	if (typeAnnoy) {
		user.sendMessage('Typing Annoyer');
	}
});

client.on('typingStop', (channel: any, user: any) => {
	if (typeAnnoy) {
		user.send('Typing Annoyer');
	}
});

client.on('message', (msg: any) => {
    let args: any = msg.content.split(' ');
    switch (args[0]) {
        case '!climb':
            try {
                switch (args[1]) {
                    case 'help':
                        msg.channel.send(helpText);
                        break
                    case 'stats':
                        // console.log(statsLookUp(args[2], args[3], args[4]));
                        if (args[3] !== undefined) {
                            let platform: string = args[2];
                            let region: string = args[3];
                            let tag: string = args[4];
                            overwatch.getProfile(platform, region, tag, (err: any, json: any) => {
                                if (err) console.error(err);
                                else {
                                    let stats: any = json;

                                    let embed: any = new discord.RichEmbed()
                                        .setTitle(`${stats.competitive.rank}`)
                                        .setAuthor(`${stats.username}#${tag.split('-')[1]}`, `${stats.competitive.rank_img}`, `https://playoverwatch.com/en-us/career/${platform}/${region}/${tag}`)
                                        .setThumbnail(`${stats.portrait}`)
                                        /*
                                        * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
                                        */
                                        .setColor(0x00AE86)
                                        .setFooter('Brought to you by Sarthak, Destroyer of Worlds.')
                                        /*
                                        * Takes a Date object, defaults to current date.
                                        */
                                        .setTimestamp();

                                    let compWinrate: string = `${Math.round(( Number(stats.games.competitive.won) * 100 )/ Number(stats.games.competitive.played) )}`;
                                    console.log(compWinrate);

                                    embed.setDescription(`This is ${stats.username}'s stat profile.`);
                                    embed.addField(`Competitive Rank`, `${stats.competitive.rank}`);
                                    embed.addField(`Competitive Playtime`, `${stats.playtime.competitive}`);
                                    embed.addField(`Competitive Wins`, `${stats.games.competitive.won}`);
                                    embed.addField(`Competitive Losses`, `${stats.games.competitive.lost}`);
                                    embed.addField(`Competitive Draws`, `${stats.games.competitive.draw}`);
                                    embed.addField(`Competitive Winrate`, `${compWinrate}%`);

                                    if (embed !== undefined) {
                                        msg.channel.send({ embed });
                                    } else {
                                        msg.channel.send(`Something went wrong.`);
                                    }
                                }
                            });
                        // only used tag
                        } else {
                            let platform: string = `pc`;
                            let region: string = `us`;
                            let tag: string = args[2];
                            overwatch.getProfile(platform, region, tag, (err: any, json: any) => {
                                if (err) console.error(err);
                                else {
                                    let stats: any = json;

                                    let embed: any = new discord.RichEmbed()
                                        .setTitle(`${stats.competitive.rank}`)
                                        .setAuthor(`${stats.username}#${tag.split('-')[1]}`, `${stats.competitive.rank_img}`, `https://playoverwatch.com/en-us/career/${platform}/${region}/${tag}`)
                                        .setThumbnail(`${stats.portrait}`)
                                        /*
                                        * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
                                        */
                                        .setColor(0x00AE86)
                                        .setFooter('Brought to you by Sarthak, Destroyer of Worlds.')
                                        /*
                                        * Takes a Date object, defaults to current date.
                                        */
                                        .setTimestamp();

                                    let compWinrate: string = `${Math.round(( Number(stats.games.competitive.won) * 100 )/ Number(stats.games.competitive.played) )}`;

                                    embed.setDescription(`This is ${stats.username}'s stat profile.`);
                                    embed.addField(`Competitive Rank`, `${stats.competitive.rank}`);
                                    embed.addField(`Competitive Playtime`, `${stats.playtime.competitive}`);
                                    embed.addField(`Competitive Wins`, `${stats.games.competitive.won}`);
                                    embed.addField(`Competitive Losses`, `${stats.games.competitive.lost}`);
                                    embed.addField(`Competitive Draws`, `${stats.games.competitive.draw}`);
                                    embed.addField(`Competitive Winrate`, `${compWinrate}%`);

                                    if (embed !== undefined) {
                                        msg.channel.send({ embed });
                                    } else {
                                        msg.channel.send(`Something went wrong.`);
                                    }
                                }
                            });
                        }
                        break
                }
            } catch (err) {
                console.error(err);
                msg.channel.send(`**Incorrect Syntax**: try ***!climb help*** for more information.`);
                break;
            }
    }
})

client.login(config.botToken);
