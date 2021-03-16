const Express = require('express');

const router = new Express.Router();

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

router.get('/posts', async (req, res) => {
  //await delay(3000);
  res.status(200);
  res.json(require('./mock/posts.json'));
});

module.exports = router;
