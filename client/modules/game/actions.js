import axios from 'axios';

import * as t from './actionTypes';


// GET board of words from db
export const getWords = (gameId) => {
  return axios.get(`/api/words/game/${gameId}`)
    .then(res => ({
      type: t.GET_WORDS,
      words: res.data
    }));
}
