import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';
import Board from './Board';


const socket = io();

class Game extends React.Component {
  componentDidMount() {
    this.props.getWords(this.props.game.id);
    socket.emit('join socket room', this.accessCode);
  }

  render() {
    const { params, words } = this.props;

    return (
      <section>
        <div>Game view for {params.accessCode}</div>
        <Board
          words={words}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.menu.game,
  player: state.menu.player,
  words: state.game.words
});

const GameContainer = connect(mapStateToProps, actions)(Game);

export { GameContainer as Game, Board };
