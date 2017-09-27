const router = require('express').Router();
const headlineHelpers = require('../util/headlineHelpers');

router.get('/:source', (req, res) => {
  let source = req.params.source;

  headlineHelpers.generateHeadlines(source)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('There was an error generating headlines', err);
      res.send('There was an error generating headlines');
    });
});

module.exports = router;