const fetch = require('node-fetch');

// for parsing text parts of speach
const WordPOS = require('wordpos');
const wordpos = new WordPOS();

const generateHeadlines = (source = 'bloomberg', number_of_sets = 0) => {
  return getHeadLines(source, number_of_sets)
    .then((headlinesData) => {
      let titles = headlinesData.articles.map((article) => article.title);
      let titlesText = titles.reduce((acc, titleText) => acc + ' ' + titleText);
      return {pos: wordpos.getPOS(titlesText), titles: titles};
    })
    .then(({ pos, titles }) => {
      return pos
        .then((posData) => {
          let randomTitleIndex = Math.floor(Math.random() * titles.length);
          let realHeadline = titles[randomTitleIndex];
          let fakeHeadlines = [];
          for (var i = 0; i < 3; i++) {
            fakeHeadlines.push(generateFakeHeadline(realHeadline, posData));
          }
          return { fakeHeadlines, realHeadline };
        })
    });
};

const generateFakeHeadline = (realHeadline, pos, percentageToReplace = .33) => {
  let fakeHeadline = realHeadline.slice();
  let words = fakeHeadline.split(' ');
  let verbs = pos.verbs;
  return words.map((word) => {
    if (verbs.indexOf(word) >= 0) {
      let randomVerbIndex = Math.floor(Math.random() * verbs.length);
      return verbs[randomVerbIndex];
    } else {
      return word;
    }
  }).join(' ');
}

// ----------------  NewsAPI Querys  ----------------
const getHeadLines = (source = 'bloomberg', number_of_sets = 0) => {
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