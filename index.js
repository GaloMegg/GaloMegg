const fs = require('fs').promises;
let Parser = require('rss-parser');
let parser = new Parser();
const LATEST_TWEET__PLACEHOLDER = "%{{latest_tweet}}%";

(async () => {
    let readme = await fs.readFile('README.md.tpl', 'utf8');
    let feed = await parser.parseURL('https://rss.app/feeds/ic84UeZrXsfkpYbj.xml');
    let { creator, title, link, enclosure } = feed.items[0];
    const img = enclosure ? `<img src=${enclosure.url} alt="${creator}" style="max-width:90%; margin:2%" />
    imf=enclosure.url? `: "";
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
    await fs.writeFile('README.md', readmeWithLatestTweet);
})();
