import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../webpack.config.js';
import routes from './routes/index.js';
import socketIo from 'socket.io';

// set up
const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);
const assetFolder = path.join(__dirname, '../client/public');

// configuration
app.use(express.static(assetFolder));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(webpackMiddleware(compiler));

// routes
app.use('/api', routes);

// launch
const server = app.listen(port, () => {
  console.log('App started on: ', port);
});

const io = new socketIo(server);
const socketEvents = require('./socket')(io); // decorate server with socket events
