const fs = require('fs').promises;
let Parser = require('rss-parser');
let parser = new Parser();
const LATEST_TWEET__PLACEHOLDER = "%{{latest_tweet}}%";

(async () => {
    try{ let readme = await fs.readFile('README.md.tpl', 'utf8');
    let feed = await parser.parseURL('http://fetchrss.com/rss/62d979201ac725338631044362d97900daf74c2073049b22.xml');
    console.log(feed)
    const { creator, title, link } = feed.items[0];
    const { image } = feed;
    const { url } = image;
    const img = image ? `<img src=${url} alt="${creator}" style="max-width:90%; margin:2%" />` : "<p></p>";
    replaceable = `<div align="center">
    <a href=${link} style="text-decoration:none; padding:2% display:flex; flex-direction:column; justify-content:space-around; aling-items:center;">
    <div align="center" style="background-color:#0d0d0d; border-radius:16px; width:
    60%;">
    <p style="color:#fafafa; width:50%; font-size:1.2rem;">${title}</p>
    ${img}
    </div>
    </a>
    </div>`
    let readmeWithLatestTweet = readme.replace(LATEST_TWEET__PLACEHOLDER, replaceable);
    await fs.writeFile('README.md', readmeWithLatestTweet);}
    catch(error){console.log(error); throw error}
   
})();
