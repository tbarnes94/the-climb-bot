"use strict";
var discord = require('discord.js');
var overwatch = require('overwatch-api');
// import { oversmash } from 'oversmash';
var client = new discord.Client();
// const ow = oversmash();
/* Discord Config import */
var config;
try {
    config = require(__dirname + "/config.json");
}
catch (_a) {
    throw new Error('Please create a config.json file!');
}
// const platform = 'pc';
// const region = 'us';
// const tag = 'foxtrot-1160';
// function statsLookUp(platform: string, region: string, tag: string): any {
//     let profile: any;
//     overwatch.getProfile(platform, region, tag, (err: any, json: any) => {
//         if (err) console.error(err);
//         else profile = json;
//     });
//     while (profile === undefined) {
//         console.log('waiting');
//     }
//     return profile;
// }
var helpText = "Working on it...";
var typeAnnoy = false;
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
client.on('typingStart', function (channel, user) {
    if (typeAnnoy) {
        user.sendMessage('Typing Annoyer');
    }
});
client.on('typingStop', function (channel, user) {
    if (typeAnnoy) {
        user.send('Typing Annoyer');
    }
});
client.on('message', function (msg) {
    var args = msg.content.split(' ');
    switch (args[0]) {
        case '!climb':
            try {
                switch (args[1]) {
                    case 'help':
                        msg.channel.send(helpText);
                        break;
                    case 'stats':
                        // console.log(statsLookUp(args[2], args[3], args[4]));
                        if (args[3] !== undefined) {
                            var platform_1 = args[2];
                            var region_1 = args[3];
                            var tag_1 = args[4];
                            overwatch.getProfile(platform_1, region_1, tag_1, function (err, json) {
                                if (err)
                                    console.error(err);
                                else {
                                    // console.log(JSON.stringify(json, null, 2));
                                    var stats = json;
                                    // console.log(stats.username);
                                    // console.log(stats.level);
                                    // console.log(stats.competitive.rank);
                                    // console.log(stats.portrait);
                                    var embed = new discord.RichEmbed()
                                        .setTitle("" + stats.competitive.rank)
                                        .setAuthor(stats.username + "#" + tag_1.split('-')[1], "" + stats.competitive.rank_img, "https://playoverwatch.com/en-us/career/" + platform_1 + "/" + region_1 + "/" + tag_1)
                                        .setThumbnail("" + stats.portrait)
                                        /*
                                        * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
                                        */
                                        .setColor(0x00AE86)
                                        .setFooter('Brought to you by Sarthak, Destroyer of Worlds.')
                                        /*
                                        * Takes a Date object, defaults to current date.
                                        */
                                        .setTimestamp();
                                    var compWinrate = "" + Math.round((Number(stats.games.competitive.won) * 100) / Number(stats.games.competitive.played));
                                    console.log(compWinrate);
                                    embed.setDescription("This is " + stats.username + "'s stat profile.");
                                    embed.addField("Competitive Rank", "" + stats.competitive.rank);
                                    embed.addField("Competitive Playtime", "" + stats.playtime.competitive);
                                    embed.addField("Competitive Wins", "" + stats.games.competitive.won);
                                    embed.addField("Competitive Losses", "" + stats.games.competitive.lost);
                                    embed.addField("Competitive Draws", "" + stats.games.competitive.draw);
                                    embed.addField("Competitive Winrate", compWinrate + "%");
                                    if (embed !== undefined) {
                                        msg.channel.send({ embed: embed });
                                    }
                                    else {
                                        msg.channel.send("Something went wrong.");
                                    }
                                }
                            });
                            // only used tag
                        }
                        else {
                            var platform_2 = "pc";
                            var region_2 = "us";
                            var tag_2 = args[2];
                            overwatch.getProfile(platform_2, region_2, tag_2, function (err, json) {
                                if (err)
                                    console.error(err);
                                else {
                                    // console.log(JSON.stringify(json, null, 2));
                                    var stats = json;
                                    // console.log(stats.username);
                                    // console.log(stats.level);
                                    // console.log(stats.competitive.rank);
                                    // console.log(stats.portrait);
                                    var embed = new discord.RichEmbed()
                                        .setTitle("" + stats.competitive.rank)
                                        .setAuthor(stats.username + "#" + tag_2.split('-')[1], "" + stats.competitive.rank_img, "https://playoverwatch.com/en-us/career/" + platform_2 + "/" + region_2 + "/" + tag_2)
                                        .setThumbnail("" + stats.portrait)
                                        /*
                                        * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
                                        */
                                        .setColor(0x00AE86)
                                        .setFooter('Brought to you by Sarthak, Destroyer of Worlds.')
                                        /*
                                        * Takes a Date object, defaults to current date.
                                        */
                                        .setTimestamp();
                                    var compWinrate = "" + Math.round((Number(stats.games.competitive.won) * 100) / Number(stats.games.competitive.played));
                                    // console.log(compWinrate);
                                    embed.setDescription("This is " + stats.username + "'s stat profile.");
                                    embed.addField("Competitive Rank", "" + stats.competitive.rank);
                                    embed.addField("Competitive Playtime", "" + stats.playtime.competitive);
                                    embed.addField("Competitive Wins", "" + stats.games.competitive.won);
                                    embed.addField("Competitive Losses", "" + stats.games.competitive.lost);
                                    embed.addField("Competitive Draws", "" + stats.games.competitive.draw);
                                    embed.addField("Competitive Winrate", compWinrate + "%");
                                    if (embed !== undefined) {
                                        msg.channel.send({ embed: embed });
                                    }
                                    else {
                                        msg.channel.send("Something went wrong.");
                                    }
                                }
                            });
                            // ow.playerStats(tag, region, platform).then(player => {
                            //     console.log(JSON.stringify(player, null, 2));
                            // });
                        }
                        break;
                }
            }
            catch (err) {
                console.error(err);
                msg.channel.send("**Incorrect Syntax**: try ***!climb help*** for more information.");
                break;
            }
    }
});
client.login(config.botToken);
