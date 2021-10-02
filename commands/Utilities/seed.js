const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const request = require("request-promise");



class SeedCommand extends Command {
  constructor() {
    super('seed', {
      aliases: ['seed'],
      channel: 'guild',
      category: 'Utilities',
      description: {
        content: 'This provides the seed of the bot.'
      },

    });
  }

  async exec(message) {

    // const token = KC79DPRU646ZCS9JACRXFMHBJTVBQADVFN;
    // let price;

    // const getPrice = async () => {
    //   const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=plant-vs-undead-token&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
    //   const json = await result.json()
    //   // console.log(json)
    //   // return json
    //   price = json['plant-vs-undead-token'].usd
    //   console.log(price)
    //   return price;
    // }
    // let com = await getPrice()
    // message.channel.send(com);


    // $('div[id="readCollapse16"]>div').text().slice(0,-7)


    const seed = "https://bscscan.com/readContract?m=normal&a=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275&v=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275";

    (async () => {
      let seedData = [];
      const response = await fetch(seed, {
        method: 'get',
        // body: JSON.stringify(body),
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9"
        }
      })
      console.log(response)

      let $ = cheerio.load(response);
      let value = $('#readCollapse16 > div > form > div').text()
      // console.log(value)
      seedData.push({
        value
      });
      // console.log(seedData[0].value)
    })()

  }
}

// https://api.bscscan.com/api
//    ?module=account
//    &action=addresstokennftinventory
//    &address=0x31471e0791fcdbe82fbf4c44943255e923f1b794 
//    &contractaddress=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275
//    &page=1
//    &offset=100
//    &apikey=KC79DPRU646ZCS9JACRXFMHBJTVBQADVFN

module.exports = SeedCommand;

