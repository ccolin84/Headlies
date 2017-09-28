const router = require('express').Router();
const headlineHelpers = require('../util/headlineHelpers');

router.get('/', (req, res) => {
  headlineHelpers.getPossibleSources()
    .then((sources) => res.send(sources))
    .catch((err) => {
      console.log('There was an error getting sources: ', err);
      res.send('There was an error getting sources');
    });
});

module.exports = router;