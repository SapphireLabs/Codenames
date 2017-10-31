import axios from 'axios';

import actionTypes from './actionTypes';

// GET board of words from db
export const getWords = gameId =>
  axios.get(`/api/words/game/${gameId}`).then(res => ({
    type: actionTypes.GET_WORDS,
    words: res.data
  }));
