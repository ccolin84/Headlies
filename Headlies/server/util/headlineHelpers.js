const fetch = require('node-fetch');

// for parsing text parts of speach
const Sentencer = require('sentencer');
const WordPOS = require('wordpos');
const wordpos = new WordPOS();

const generateHeadlines = (source = 'bloomberg') => {
  return getHeadLines(source)
    .then((headlinesData) => {
      let titles = headlinesData.articles.map((article) => article.title);
      let titlesText = titles.reduce((acc, titleText) => acc + ' ' + titleText);
      return {pos: wordpos.getPOS(titlesText), titles, headlinesData};
    })
    .then(({ pos, titles, headlinesData }) => {
      return pos
        .then((posData) => {
          return headlinesData.articles.map((headlineData, inx) => {
            let realHeadline = headlinesData.articles[inx];
            let fakeHeadlines = [];
            for (var i = 0; i < 3; i++) {
              fakeHeadlines.push(generateFakeHeadline(realHeadline.title, posData));
            }
            return { fakeHeadlines, realHeadline };
          })
        })
    });
};

const generateFakeHeadline = (realHeadline, pos, percentageToReplace = .33) => {
  let fakeHeadline = realHeadline.slice();
  let words = fakeHeadline.split(' ');
  let verbs = pos.verbs;
  let adjs = pos.adjectives;
  return words.map((word) => {
    if (adjs.indexOf(word) >= 0) {
      let randomAdjIndex = Math.floor(Math.random() * adjs.length);
      let replacement = adjs[randomAdjIndex];
      replacement = replacement.split('');
      replacement[0] = (word[0] === word[0].toUpperCase()) ? replacement[0].toUpperCase() : replacement[0].toLowerCase();
      return replacement.join('');
    } else if (verbs.indexOf(word) >= 0) {
      let randomVerbIndex = Math.floor(Math.random() * verbs.length);
      let replacement = verbs[randomVerbIndex];
      replacement = replacement.split('');
      replacement[0] = (word[0] === word[0].toUpperCase()) ? replacement[0].toUpperCase() : replacement[0].toLowerCase();
      return replacement.join('');
    } else {
      return word;
    }
  }).join(' ');
}

// ----------------  NewsAPI Querys  ----------------
const getHeadLines = (source = 'bloomberg') => {
  const apiUrl = `https://newsapi.org/v1/articles?source=${source}&apiKey=${process.env.NEWSKEY}`;
  return fetch(apiUrl)
    .then((stream) => stream.json())
    .catch((err) => consol.log('Error getting news headlines: ', err));
};

const getPossibleSources = () => {
  const apiUrl = `https://newsapi.org/v1/sources?language=en`;
  // query the news api for all possible news sources
  return fetch(apiUrl)
    .then((stream) => stream.json())
    .catch((err) => console.log('Error getting news sources: ', err));
};
// ---------------------------------------------------

module.exports = {
  generateHeadlines: generateHeadlines,
  getPossibleSources: getPossibleSources
};