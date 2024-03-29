const Url = require('url');
const next = require('next');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const getQuery = (url) => Url.parse(url, true).query;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.ENV !== 'production';
//const mock = process.env.ENV === 'local-mock';
const app = next({ dev });

const server = express();

app.prepare().then(() => {
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  if (dev) {
    // Load mock-server dev-only
    const mockApiRouter = require('./server-mock');

    // Setup Mock API URL
    server.use('/bff/', mockApiRouter);
  }

  // Setup next handler
  server.get('*', (req, res) => app.render(req, res, '/', getQuery(req.url)));

  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
