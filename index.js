var Discord = require('discord.js')
var client = new Discord.Client();
var fs = require('fs')
const data = require("./data.json");
var moment = require('moment');
client.on('ready', () => {
    console.log('봇 실행중')
})

client.on('message', (message) => {
    if (message.content == "!회원가입") {
        delete require.cache[require.resolve('./data.json')]
        const data = require("./data.json");
        if (data[message.author.id]) {
            message.reply('당신은 이미 회원가입이 완료되어있습니다!')
        } else {
            data[message.author.id] = {
                money: 0, userid: message.author.id, moneyget: 0
            };
            fs.writeFileSync("./data.json", JSON.stringify(data));
            message.reply('회원가입이 완료되었습니다!\n이제 봇을 자유롭게 사용하실 수 있습니다 ㅎㅎ')
        }
    }
    if (message.content == "!내돈") {
        delete require.cache[require.resolve('./data.json')]
        const data = require("./data.json");
        if (!data[message.author.id]) {
            message.reply('!회원가입 을 먼저 해주세요!')
        } else {
            message.reply('당신의 돈은 ' + data[message.author.id].money + "원 입니다!")
        }
    }
    if (message.content == "!돈받기") {
        delete require.cache[require.resolve('./data.json')]
        const data = require("./data.json");
        if (!data[message.author.id]) {
            message.reply('!회원가입 을 먼저 해주세요!')
        } else {
            if (data[message.author.id].moneyget == null) {
                data[message.author.id].money += 10000
                data[message.author.id].moneyget = moment().valueOf()
                fs.writeFileSync("./data.json", JSON.stringify(data));
                message.reply(`당신의 돈은 이제' + data[message.author.id].money + "원 입니다!`)
            } else if (data[message.author.id].moneyget + 3600000 < moment().valueOf()) {
                data[message.author.id].money += 10000
                data[message.author.id].moneyget = moment().valueOf()
                fs.writeFileSync("./data.json", JSON.stringify(data));
                message.reply(`당신의 돈은 이제` + data[message.author.id].money + "원 입니다!")
            } else {
                message.reply(`당신은 아직 이 기능을 쓸수 없어요..(명령어 사용시간을 기준으로 1시간 뒤에 사용이 가능합니다!)`)
            }
        }
    }
    if (message.content == "!올인") {
        delete require.cache[require.resolve('./data.json')]
        const data = require("./data.json");
        if (!data[message.author.id]) {
            message.reply('!회원가입 을 먼저 해주세요!')
        } else {
            if (data[message.author.id].money == 0) {
                message.reply('당신은 이 기능을 사용할수 없어요..\n!내돈 을 봐요..\n왜 안될까요..')
            } else {
                var allin = Math.floor((Math.random() * 2) + 1);
                let ments = [
                    "뭐가 나오려나..",
                    "두근두근..",
                    "쓰읍 사기는 아니겠지!?",
                    "따리리리링~"
                ]
                var ment = Math.floor((Math.random() * ments.length));
                message.channel.send(ments[ment]).then(msg => {
                    setTimeout(() => {
                        if (allin == 1) {
                            msg.edit(`성공입니다!\n${message.author}님의 돈은 이제 2배입니다!`)
                            data[message.author.id].money = data[message.author.id].money * 2
                            fs.writeFileSync("./data.json", JSON.stringify(data));
                        } else {
                            msg.edit(`실패입니다 ㅠㅠ\n${message.author}님은 이제 돈이..ㅠㅠㅠㅠㅠ`)
                            data[message.author.id].money = 0
                            fs.writeFileSync("./data.json", JSON.stringify(data));
                        }
                    }, 2000);
                })
            }
        }
    }
})

client.login('토큰')
