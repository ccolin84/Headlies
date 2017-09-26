const router = require('express').Router();
const headlineHelpers = require('../util/headlineHelpers');

router.get('/', (req, res) => {
  let source = req.body.source;
  let number_of_sets = req.body.number_of_sets;

  headlineHelpers.generateHeadlines(source, number_of_sets)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('There was an error generating headlines', err);
      res.send('There was an error generating headlines');
    });
});

module.exports = router;