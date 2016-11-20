import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import * as actions from '../actions';
import Board from './Board';


const socket = io();
const styles = {
  gameContainer: {
    'min-width': 500
  },
  chatContainer: {
    'border': '1px solid black'
  }
};

class Game extends React.Component {
  componentDidMount() {
    this.props.getWords(this.props.game.id);
    socket.emit('join socket room', this.accessCode);
  }

  render() {
    const { params, words } = this.props;

    return (
      <section className="row center-xs">
        <div className="col-xs-9" style={styles.gameContainer}>
          <div className="row">
            <div className="col-xs-12">
              HEADER
            </div>
          </div>
          <div className="row">
            <div className="col-xs-9">
              <Board
                words={words}
              />
            </div>
            <div className="col-xs-3" style={styles.chatContainer}>
              CHAT
            </div>
          </div>
        </div>
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
