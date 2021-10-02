const { Listener } = require('discord-akairo');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer')
const cheerio = require('cheerio');
const { Message } = require('discord.js');



module.exports = class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {

    let price;

    const getPrice = async () => {
      const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=plant-vs-undead-token&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
      const json = await result.json()
      // console.log(json)
      // return json
      price = json['plant-vs-undead-token'].usd
      console.log(price)
      return price;
    }

    let price2;
    function updateFunction1() {
      setInterval(async () => { price2 = await getPrice() }, 60000);
    }

    updateFunction1();
    const getSeed = async () => {
      const browser = await puppeteer.launch();

      const page = await browser.newPage();
      await page.goto("https://bscscan.com/readContract?m=normal&a=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275&v=0x5ab19e7091dd208f352f8e727b6dcc6f8abb6275");

      const pageData = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
          //     width: document.documentElement.clientWidth,
          // height: document.documentElement.clientHeight,
        };
      });
      // document.querySelector("#readCollapse16 > div > form > div").textContent
      
      const $ = cheerio.load(pageData.html);
      const element = $("#readCollapse16 > div > form > div")
      console.log(element.text())
      let finalRes = element.text().slice(0,-7);
      await browser.close();
      return finalRes;
      


    }

    let seed2;
    function updateFunction1() {
      setInterval(async () => { seed2 = await getSeed() }, 15000);
    }
    // let seedData = html.html;

    let i = 0;
    setInterval(() => this.client.user.setActivity(`${seed2} seeds`, { type: 'PLAYING' }), 3000);
    console.log(`${this.client.user.tag} is now ready!`);
  }
};
