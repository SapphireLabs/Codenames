import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../webpack.config.js';
import routes from './routes/index.js';

// set up
const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);
const assetFolder = path.join(__dirname, '../client/public');

// configuration
app.use(express.static(assetFolder));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(webpackMiddleware(compiler));

// routes
app.use('/api', routes);

// launch
app.listen(port, () => {
  console.log('App started on: ', port);
});
