import * as t from './actionTypes';

const initialState = {
  words: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.GET_WORDS: {
      return getWords(state, action.words);
    }
    default: {
      return state;
    }
  }
}

const getWords = (state, words) => Object.assign({}, state, { words });
