# Headlies

A fun web app that mixes a realtime headline from a variety of news sources with three fake headlines based off that real headline. Use your intuition to distinguish real from fake news. 

Live app: https://headlies.herokuapp.com/

### Prerequisites

What things you need to install the software and how to install them

```
Node.js
an api key for NewsAPI.org in an .env variable called NEWSKEY for the express server
```

### Installing

install all dependencies with 

```
npm install
```

running npm start should get the app running on localhost:3000


## Built With

* [Express](https://expressjs.com/) - Server Framework
* [React](https://react.foundation/) - Client Side Framework
* [Wordpos](https://github.com/moos/wordpos) - Used to parse part of speech
* [Sentencer](https://www.npmjs.com/package/sentencer) - Also used in text and syntax manipulation
* [NewsAPI.org](https://www.NewsAPI.org) - Used for retrieving news stories
* [React-Bootstrap](https://react-bootstrap.github.io/) - UI styling and formatting

## Authors

* **Colin Crawford**

## License

This project is licensed under the MIT License 