import * as menuActions from './actions';
import menuActionTypes from './actionTypes';
import menuReducer from './reducer';

describe('Menu Reducer', () => {
  it('should handle set error', () => {
    const state = {};
    const action = menuActions.setError({
      response: { error: 'test error message' }
    });
    const result = menuReducer(state, action);

    expect(result.error).toEqual({
      response: { error: 'test error message' }
    });
  });

  it('should handle set game', () => {
    const state = {};
    const action = menuActions.setGame({
      id: 5
    });
    const result = menuReducer(state, action);

    expect(result.game).toEqual({
      id: 5
    });
  });

  it('should handle set player', () => {
    const state = {};
    const action = menuActions.setPlayer({
      id: 6
    });
    const result = menuReducer(state, action);

    expect(result.player).toEqual({
      id: 6
    });
  });
});
